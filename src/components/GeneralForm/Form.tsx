import type { FormInstance, FormProps, SpinProps } from "antd";
import type { CSSProperties, ForwardRefRenderFunction, ReactNode } from "react";

import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import './style.scoped.css'
import { GeneralPageProps } from "../GeneralPage";

type SearchConfig = {
  force?: boolean;
};

export interface GeneralFormProps extends FormProps {
  onSearch?(value?: TypeObject, config?: SearchConfig): void;
  children?: ReactNode | ReactNode[];
  loading?: boolean | SpinProps;
  formWrapperStyle?: CSSProperties;
  download?: GeneralPageProps<any>["download"];
  onExport?: (() => void) | ((exportKeys: any) => Promise<void>);
  initSearch?: boolean;
  btnShowLeft?: boolean;
}

type GeneralFormRefType = {
  form: FormInstance;
};

const GeneralForm: ForwardRefRenderFunction<GeneralFormRefType, GeneralFormProps> = (
  {
    children,
    loading = false,
    formWrapperStyle,
    form,
    download,
    onExport,
    onReset,
    onSearch,
    initSearch = true,
    btnShowLeft = true,
    ...props
  }: GeneralFormProps,
  ref,
) => {
  const { showTipsContent = true, enable = false, isTableTop = false, tipsContent = "单次导出最多支持5万条数据" } = download ?? {};
  const [searchForm] = Form.useForm();
  const [forceFlag, setForceFlag] = useState(false);
  
  const [expanded, setExpanded] = useState(false);

  const expandedHandler = () => {
    setExpanded(!expanded);
  };

  const valuesChangeHandler = () => {
    setForceFlag(true);
  };

  const resetHandler: GeneralFormProps["onReset"] = (e) => {
    if (onReset) {
      onReset?.(e);
    } else {
      searchForm.resetFields();
      searchHandler({ force: true });
    }
  };

  const searchHandler = (config?: SearchConfig) => {
    const formValues = searchForm.getFieldsValue();
    onSearch?.(formValues, { force: forceFlag, ...(config ?? {}) });
    setForceFlag(false);
  };

  useImperativeHandle(ref, () => ({
    form: form || searchForm,
  }));

  useEffect(() => {
    initSearch && searchHandler({ force: true });
  }, []);

  return (
    <div className="general-form" style={{ ...formWrapperStyle }}>
      <Form
        form={form ?? searchForm}
        {...props}
        onValuesChange={valuesChangeHandler}
        onReset={resetHandler}
        layout="vertical"
        onFinish={searchHandler}
      >
        {expanded ? children : children instanceof Array ? (children as ReactNode[])?.slice(0, 8) : children}
        {btnShowLeft ? (
          <Form.Item className="more-action-left" colon={false}>
          <Space size={0}>
            <Button htmlType="submit" type="primary" loading={loading}>
              筛选
            </Button>
            {
              (enable && !isTableTop) &&  (
                <div key="export">
                  <Button style={{ marginLeft: 18 }} onClick={onExport}>
                    导出
                  </Button>
                </div>
              )
            }
            <Button htmlType="reset" type="link" loading={loading}>
              重置筛选条件
            </Button>
            {(children as ReactNode[])?.length > 8 && (
              <Button type="link" style={{padding: '4px 0'}} onClick={expandedHandler}>
                高级搜索{expanded ? <UpOutlined /> : <DownOutlined />}
              </Button>
            )}
          </Space>
        </Form.Item>
        ) : (
        <Form.Item
          label=" "
          className={children && (children as ReactNode[]).length > 2 ? "more-action-right" : ""}
          colon={false}
        >
          <Space size={10}>
            <Button htmlType="submit" type="primary" loading={loading}>
              查询
            </Button>
            <Button htmlType="reset" loading={loading}>
              重置
            </Button>
            {(children as ReactNode[])?.length > 8 && (
              <Button type="text" onClick={expandedHandler}>
                高级搜索{expanded ? <UpOutlined /> : <DownOutlined />}
              </Button>
            )}
          </Space>
        </Form.Item>
        )}
      </Form>
    </div>
  );
};

export default forwardRef(GeneralForm);
