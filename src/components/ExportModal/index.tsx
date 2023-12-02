import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Checkbox, Col, Modal, Row } from "antd";
import type { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import "./style.scoped.css"

/**
 *
 * @param plainOptions {array} 数据源
 * @param object { lable: string, value: string, checked: boolean, title: string, disabled: boolean} title选填，为导出字段分类标题名
 * @param visible {boolean}是否展示Modal
 * @param onOk {function} 已选取的导出字段做提交处理
 * @return 输出字符串数组
 */

export type plainOptions = {
  label: string;
  value: any;
  title?: string;
  checked?: boolean;
  disabled?: boolean;
};

interface IExportModalType {
  plainOptions: plainOptions[];
  visible: boolean;
  loading: boolean;
  handleCancel: () => void;
  onOk: (value: any[]) => void;
  [propName: string]: any;
  exportExternal?: ReactNode;
}

const ExportModal: React.FC<IExportModalType> = ({
  plainOptions,
  exportExternal,
  visible,
  loading,
  handleCancel,
  onOk,
  ...props
}) => {
  const [checkedList, setCheckedList] = useState<any[]>([]);
  const [indeterminate, setIndeterminate] = useState<boolean>(true);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [checkData, setCheckData] = useState<plainOptions[]>([]);

  const onChange = (list: any[]) => {
    const arr: any = [];
    for (let i = 0; i < list?.length; i++) {
      plainOptions?.map((item) => {
        if (item.value === list[i]) arr.push(item);
      });
    }
    setCheckData(arr);
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const allLabel = plainOptions?.map((item) => item.value);
    const disabledChecked = plainOptions.filter((item) => item.disabled);
    setCheckData(e.target.checked ? plainOptions : disabledChecked);
    setCheckedList(e.target.checked ? allLabel : disabledChecked.map((item) => item.value));
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleOk = () => {
    onOk(checkedList);
  };

  const onClick = (i: number) => {
    checkData.splice(i, 1);
    setCheckData([...checkData]);
    setCheckedList(checkData?.map((item: any) => item.value));
  };

  useEffect(() => {
    const result = plainOptions?.filter((item) => item.checked === true);
    setCheckData(result);
    setCheckedList(result?.map((el) => el.value));
    setIndeterminate(result.length > 0 && result.length < plainOptions.length);
    setCheckAll(result.length === plainOptions.length);
  }, []);

  return (
    <Modal
      title="导出自定义字段"
      open={visible}
      width={900}
      onCancel={handleCancel}
      maskClosable={false}
      {...props}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" loading={loading} type="primary" onClick={handleOk} disabled={!checkedList?.length}>
          确定
        </Button>,
      ]}
    >
      <section className="export-container">
        <section className="left">
          <div>{exportExternal && exportExternal}</div>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
            style={{ marginBottom: 16 }}
          >
            选择所有的字段
          </Checkbox>
          <Checkbox.Group onChange={onChange} value={checkedList}>
            <Row>
              {plainOptions?.map((item) => {
                return (
                  <Fragment key={item.value}>
                    {item.title && (
                      <Col span={24} className="export-title">
                        {item.title}
                      </Col>
                    )}
                    <Col span={6} style={{ padding: "8px 0" }}>
                      <Checkbox value={item.value} disabled={item.disabled}>
                        {item.label}
                      </Checkbox>
                    </Col>
                  </Fragment>
                );
              })}
            </Row>
          </Checkbox.Group>
        </section>
        <section className="right">
          <p>当前选定的字段</p>
          <div className="title">
            {checkData?.map((item: any, i: number) => {
              return (
                <div key={item.value} className="item">
                  <span className="item-span">{item.label}</span>
                  {!item.disabled && (
                    <Button
                      type="link"
                      shape="circle"
                      icon={<CloseCircleFilled style={{ color: "#ccc" }} />}
                      onClick={() => onClick(i)}
                      disabled={item.disabled}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </Modal>
  );
};

export default ExportModal;
