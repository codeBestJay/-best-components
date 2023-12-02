import { BASE_GAP, INIT_PAGINATION, INIT_PAGINATION_NEW, PAGINATION_SIZE_OPTIONS } from "../globalConstants";
import type { FormProps, TablePaginationConfig, TableProps } from "antd";
import { Modal, message } from "antd";
import type { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import type { CSSProperties, ElementRef, ForwardRefRenderFunction, PropsWithChildren, ReactNode, Ref } from "react";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import ExportModal from "../ExportModal";
import type { GeneralFormProps } from "../GeneralForm/Form";
import GeneralForm from "../GeneralForm/Form";
import GeneralTable from "../GeneralTable/Table";
import "./style.scoped.css";

export interface DownloadProps {
  request?: (params?: TypeObject) => Promise<any>;
  showTipsContent?: boolean;
  enable?: boolean;
  tipsContent?: string;
  url?: string;
  filename?: string;
  channel?: "direct" | "center";
  customFields?: any[];
  exportHandler?: (params?: TypeObject) => void;
  exportKeys?: string[];
  extraParams?: TypeObject;
  checkMax?: boolean;
  max?: number;
  exportListAlias?: string;
  exportExternal?: ReactNode;
  isTableTop?: boolean
}

export interface PageTableData<T> {
  data?: T[];
  dataList?: T[];
  totalSize?: number;
  totalCount?: number
}

export interface GeneralPageProps<T> extends PropsWithChildren, Omit<FormProps, "onChange" | "children">, Omit<TableProps<T>, "title"> {
  /**
   * 列表接口地址
   * */
  dataKey?: "data" | "dataList";
  pageParam?: boolean;
  completeParams?(formValue: TypeObject): TypeObject;
  formatResponse?(response: TypeObject): { data?: T[]; dataList?: T[]; totalSize?: number; totalCount?: number };
  getSorter?: (sorter: SorterResult<T> | SorterResult<T>[]) => void;
  onSearch?(): void;
  onReset?(): void;
  onTableChange?: TableProps<T>["onChange"];
  extra?: ReactNode | ReactNode[];
  rightExtra?: ReactNode[];
  inner?: boolean;
  tableWrapperStyle?: CSSProperties;
  formWrapperStyle?: CSSProperties;
  download?: DownloadProps;
  initSearch?: boolean; //初始化是否执行查询
  tableProps?: TableProps<T>;
  rowSelection?: TableProps<T>["rowSelection"];
  color?: string;
  beforeFetchData?: (paramsData: LooseObject) => boolean;
  btnShowLeft?: boolean; // 查询按钮展示位置 true左侧 false右侧
  tableActionAlgin?: 'left' | 'right' | 'center',
  initFieldsValue?: LooseObject;
  request?: (params: TypeObject) => Promise<PageTableData<T>>;
  topBtn?: ReactNode
}

export type GeneralPageRefType = {
  update(): void;
  forceUpdate(): void;
  resetForm(): void;
  getForm: () => any;
};

const GeneralPage: ForwardRefRenderFunction<GeneralPageRefType, GeneralPageProps<any>> = <T,>(
  {
    children,
    form,
    rowKey,
    columns,
    dataSource,
    loading,
    expandable,
    dataKey = "data",
    pageParam = false,
    getSorter,
    rowSelection,
    // 自有属性
    completeParams,
    formatResponse,
    onSearch,
    onReset,
    onTableChange,
    extra,
    rightExtra,
    pagination,
    inner = false,
    tableWrapperStyle,
    formWrapperStyle,
    download,
    initSearch,
    tableProps,
    tableActionAlgin = 'right',
    color = "#fff",
    // color = "#fff",
    beforeFetchData,
    initFieldsValue,
    request,
    btnShowLeft,
    topBtn
  }: GeneralPageProps<T>,
  ref: Ref<unknown> | undefined,
) => {
  const formRef = useRef<ElementRef<typeof GeneralForm>>(null);

  const [page, setPage] = useState({
    ...(pageParam ? INIT_PAGINATION_NEW : INIT_PAGINATION),
    pageSize: (pagination && pagination.pageSize) ? pagination.pageSize : INIT_PAGINATION.pageSize,
  });
  const [fetchLoading, setFetchLoading] = useState(false);
  const [tableDataSource, setTableDataSource] = useState<T[]>([]);
  const [exportVisible, setExportVisible] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const pageNoKey = pageParam ? "pageNum" : "pageNo";

  const fetchData = async () => {
    if (request) {
      try {
        setFetchLoading(true);
        const formValues = (await formRef.current?.form.validateFields()) ?? {};
        const params = completeParams ? completeParams(formValues) : formValues;
        let paramsData = Object.fromEntries(Object.entries(params).filter(([key, value]) => value !== ""));
        const pageParams = { ...page };
        delete pageParams.total;
        if (pageParam) {
          paramsData.pageParam = { ...pageParams };
        } else {
          paramsData = {
            ...paramsData,
            ...pageParams,
          };
        }
        if (typeof beforeFetchData === "function") {
          const beforeFlag = beforeFetchData(paramsData);
          if (!beforeFlag) return;
        }
        try {
          const response = await request(paramsData)
          let dataSource = [];
          if (dataKey === "dataList") {
            dataSource = response?.dataList ?? [];
            page.total = (response?.totalCount ?? 0) * 1;
          } else {
            dataSource = response?.data ?? [];
            page.total = (response?.totalSize ?? 0) * 1;
          }
          setPage({ ...page });
          setTableDataSource(dataSource);
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.error("GeneralTable:", error);
      } finally {
        setFetchLoading(false);
      }
    } else {
      console.log("GeneralTable:", "请传入request让GeneralPage正确处理请求.");
    }
  };

  const searchHandler: GeneralFormProps["onSearch"] = (_, config = {}) => {
    if (onSearch) {
      onSearch();
    } else {
      const { force } = config;
      if (force) {
        page[pageNoKey] = 1;
        setPage({ ...page });
      }
      fetchData();
    }
  };

  const onTableChangeHandler = (
    pagination: TablePaginationConfig,
    filter: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>,
  ) => {
    if (onTableChange) {
      onTableChange(pagination, filter, sorter, extra);
    } else {
      if (getSorter && sorter && Object.keys(sorter)) {
        getSorter(sorter);
      }
      const { current, pageSize } = pagination;
      if (page.pageSize === pageSize) {
        page[pageNoKey] = current as number;
      } else {
        page[pageNoKey] = 1;
      }
      page.pageSize = pageSize as number;
      setPage({ ...page });
      fetchData();
    }
  };

  const downloadToCenterHandler = async (params: TypeObject | undefined) => {
    try {
      if (download?.request) {
        setExportLoading(true);
        await download?.request(params)
        message.success("已成功添加到下载队列");
        // window.click();
        setExportLoading(false);
        setExportVisible(false);
        return Promise.resolve();
      }
    } catch {
      return Promise.reject();
    }
  };

  const exportHandler = async (exportKeys: string[]) => {
    if (download?.request) {
      const formValues = (await formRef.current?.form.validateFields()) ?? {};
      const params = completeParams ? completeParams(formValues) : formValues;
      try {
        let exportKeyList = "";
        if (download.customFields) {
          exportKeyList = exportKeys.join();
        } else if (download.exportKeys) {
          exportKeyList = download.exportKeys.join();
        }
        const downloadParams = {
          ...params,
          ...(download?.extraParams ?? {}),
          [download?.exportListAlias || "exportKeyList"]: exportKeyList,
        };
        // 缺省为直接下载，而不是到下载中心
        if (download?.channel === "center") {
          await downloadToCenterHandler(downloadParams);
        } else {
        }
        setExportVisible(false);
      } catch (error) {
        console.log(error);
      } finally {
        setExportLoading(false);
      }
    } else {
      message.warn("缺少导出地址");
    }
  };
  const showCustomExport = () => setExportVisible(true);

  const handleExport = async () => {
    const formValues = (await formRef.current?.form.validateFields()) ?? {};
    if (page.total && download?.max) {
      if (page.total > download?.max) {
        Modal.warning({
          title: `当前需要导出的额数据超出${download?.max / 10000}万条,一次导出最大支持${download?.max / 10000
            }万条数据`,
          content: "建议调整查询条件后重新进行导出操作。",
        });
        return false;
      }
    }

    if (download?.customFields) {
      showCustomExport();
    } else if (download?.exportHandler) {
      download?.exportHandler(formValues);
    } else {
      exportHandler([]);
    }
  };

  useImperativeHandle(ref, () => ({
    update() {
      fetchData();
    },
    forceUpdate() {
      page[pageNoKey] = 1;
      setPage({ ...page });
      fetchData();
    },
    getForm() {
      return formRef.current?.form;
    },
    resetForm() {
      formRef.current?.form.resetFields();
    },
  }));

  useEffect(() => {
    page.pageSize = (pagination && pagination.pageSize) ? pagination.pageSize : INIT_PAGINATION.pageSize
    setPage({
      ...page
    });
  }, [pagination]);

  useEffect(() => {
    setPage({ ...INIT_PAGINATION });
  },[])



  useEffect(() => {
    initFieldsValue && formRef.current?.form.setFieldsValue(initFieldsValue);
  }, []);

  return (
    <div className="general-page" style={{ backgroundColor: `${color}` }}>
      {topBtn && <div style={{ margin: '0 0 16px 16px' }}>{topBtn}</div>}
      {children && (
        <GeneralForm
          ref={formRef}
          form={form}
          onSearch={searchHandler}
          initSearch={initSearch}
          onReset={onReset}
          download={download}
          onExport={handleExport}
          btnShowLeft={btnShowLeft}
          loading={loading ?? fetchLoading}
          formWrapperStyle={{ margin: inner ? "-16px 0 14px 0" : "0 16px", ...formWrapperStyle }}
        >
          {children}
        </GeneralForm>
      )}
      <GeneralTable
        tableWrapperStyle={{
          marginTop: children && !inner ? BASE_GAP : 0,
          padding: inner ? 0 : "0 16px 16px 16px",
          backgroundColor: "#fff",
          ...tableWrapperStyle,
        }}
        rowKey={rowKey}
        columns={columns}
        hasForm={!!children}
        dataSource={dataSource ?? tableDataSource}
        tableActionAlgin={tableActionAlgin}
        loading={loading ?? fetchLoading}
        onChange={onTableChangeHandler}
        expandable={expandable}
        extra={extra}
        rightExtra={rightExtra}
        download={download}
        rowSelection={rowSelection}
        pagination={
          typeof pagination === "boolean"
            ? pagination
            : {
                total: page.total,
                current: page[pageNoKey],
                pageSizeOptions: PAGINATION_SIZE_OPTIONS,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total) => `共${total}条`,
                ...(pagination ?? {}),
                pageSize: page.pageSize,
              }
        }
        onExport={handleExport}
        tableProps={tableProps}
      />
      {download?.customFields && (
        <ExportModal
          loading={exportLoading}
          visible={exportVisible}
          exportExternal={download.exportExternal}
          plainOptions={download.customFields}
          onOk={(values) => exportHandler(values)}
          handleCancel={() => {
            setExportVisible(false);
            setExportLoading(false);
          }}
        />
      )}
    </div>
  );
};

export default forwardRef(GeneralPage);
