import { CSSProperties, FC, ReactNode, useEffect, useState } from "react";
import type { GeneralPageProps } from "../GeneralPage";

import { QuestionCircleOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button, Empty, Space, Table, Tooltip } from "antd";
import { ColumnGroupType, ColumnType } from "antd/lib/table";
import './style.coped.css'

interface ExpandColumnsType {
  disabled?: boolean;
  checked?: boolean;
}

type ColumnTypeWithDisabled<RecordType> = ColumnType<RecordType> & ExpandColumnsType;
type ColumnGroupTypeWithDisabled<RecordType> = Omit<ColumnGroupType<RecordType>, "children"> & ExpandColumnsType;
export type ColumnsTypeWithDisabled<RecordType> = (ColumnTypeWithDisabled<RecordType> &
  ColumnGroupTypeWithDisabled<RecordType>)[];

interface GeneralTableProps<T> extends TableProps<T> {
  tableWrapperStyle?: CSSProperties;
  extra?: any;
  hasForm: boolean;
  rightExtra?: GeneralPageProps<T>["rightExtra"];
  onChange?: TableProps<any>["onChange"];
  download?: GeneralPageProps<T>["download"];
  tableActionAlgin?: GeneralPageProps<T>["tableActionAlgin"]
  onExport?: (() => void) | ((exportKeys: any) => Promise<void>);
  tableProps?: TableProps<any>;
}

const GeneralTable: FC<GeneralTableProps<any>> = <T,>({
  tableWrapperStyle,
  rowKey,
  columns,
  dataSource,
  loading,
  expandable,
  pagination,
  childrenColumnName,
  download,
  onExport,
  onChange,
  extra,
  hasForm,
  tableActionAlgin,
  rightExtra,
  rowSelection,
  tableProps,
}: GeneralTableProps<T>) => {
  const { showTipsContent = true, isTableTop=false, enable = false, tipsContent = "单次导出最多支持5万条数据" } = download ?? {};
  const [state, setState] = useState<{ rightBtns: ReactNode[] }>({
    rightBtns: [],
  });
  const [columnsMap, setColumnsMap] = useState<LooseObject[]>([]);

  useEffect(() => {
    if (columns && columns.length) {
      const newColumnsMap =
        columns &&
        columns.map((item) => {
          const obj: LooseObject = { ...item };
          if (obj.dataIndex === "action") {
            obj.align = tableActionAlgin;
          }
          return obj;
        });
      setColumnsMap(newColumnsMap);
    }
  }, [download,columns]);

  useEffect(() => {
    state.rightBtns = [
      ...(rightExtra || []),
      (enable && (isTableTop || !hasForm)) && (
        <div key="export">
          {showTipsContent && (
            <span style={{ color: "#767681" }}>
              导出规则&nbsp;
              <Tooltip title={tipsContent}>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          )}
          <Button style={{ marginLeft: 18 }} onClick={onExport}>
            导出
          </Button>
        </div>
      ),
    ].filter(Boolean);
    setState({ ...state });
  }, [download, pagination]);
  return (
    <div style={{ ...tableWrapperStyle }} className="general-table">
      {(extra || state.rightBtns?.length > 0) && (
        <div className="top-actions" style={{ justifyContent: "space-between"}}>
          <div>{extra}</div>
          <Space>
            {state.rightBtns
              .map((el) => {
                return el;
              })
              .reverse()}
          </Space>
        </div>
      )}
      {/* PREF: 这里的类型不知道怎么写 */}
      <Table
        locale={{
          emptyText: <Empty image={`https://cdn.e-energee.com/static/hdc/empty.png`} />,
        }}
        loading={loading}
        rowSelection={rowSelection as any}
        rowKey={rowKey as string}
        columns={columnsMap as any}
        dataSource={dataSource as any}
        expandable={expandable as any}
        scroll={{ x: columns?.some((column) => column?.fixed) ? "max-content" : undefined, ...tableProps?.scroll }}
        pagination={pagination}
        childrenColumnName={childrenColumnName}
        onChange={onChange}
        {...tableProps}
      />
    </div>
  );
};

export default GeneralTable;
