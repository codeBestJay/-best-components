import type { ModalProps } from "antd";
import type { CheckboxChangeEvent } from "antd/lib/checkbox";
import type { CheckboxValueType } from "antd/lib/checkbox/Group";
import type { FC, ReactNode } from "react";

import { Alert, Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";

import "./index.scoped.css";

/**
 * @description 自定义table column列选择
 * @param title {string|ReactNode} modal title
 * @param alert {string|ReactNode} alert message
 * @param options {Array<CheckboxOptionType|string>} 可选字段
 * @param value {Array<string>} 已选中的值
 * @param onOk {(checked) => void} 确认回调
 * @param className {string} class
 * @param open {boolean} 是否显示modal
 * @param props {ModalType} modal 属性值
 * @param defaultCheckAll {boolean} 是否含有全选
 * @return {ReactNode} Modal
 */

export interface CustomColumnsProps extends ModalProps {
  /** 
   *  弹框名称
   * */ 
  title?: string
  /** 
   * 提示信息
   * */ 
  alert?: boolean | string | ReactNode;
  /** 
   * 选项
   * */ 
  options?: any[];
  /** 
   * 选中值
   * */ 
  value?: CheckboxValueType[];
  /**
   * 是否显示
   * */ 
  open?: boolean
  /**
   * 是否显示全选按钮
   */
  defaultCheckAll?: boolean;
  /**
   * 确认回调
   */
  handleOk?: (value: CheckboxValueType[]) => void;
}

const CustomColumns: FC<CustomColumnsProps> = ({
  title = "自定义列表字段",
  alert,
  options = [],
  value = [],
  className,
  open=false,
  defaultCheckAll=false,
  handleOk,
  ...props
}) => {
  const [checked, setChecked] = useState<CheckboxValueType[]>(value);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    const result = e.target?.checked;
    const selectValue = options?.map((item) => item.value);
    setIndeterminate(false);
    setCheckAll(result);
    setChecked(
      result
        ? (selectValue as string[])
        : (options?.filter((item) => item?.disabled)?.map((item) => item.value) as string[]),
    );
  };

  const onChange = (e: CheckboxValueType[]) => {
    setChecked(e as string[]);
    if (defaultCheckAll) {
      setIndeterminate(!!e?.length && e?.length < options?.length);
    }
  };

  useEffect(() => {
    if (open) {
      setChecked(value);
    }
  }, [open]);

  return (
    <Modal
      width={600}
      title={title}
      className="modal"
      maskClosable={false}
      open={open}
      okText="确定"
      cancelText="取消"
      {...props}
      onOk={() => {
        handleOk && handleOk(checked);
      }}
    >
      <Alert
        type="warning"
        message={
          alert || `请选择您想显示的列表表头信息，最多可勾选${options.length}个字段，已勾选${checked.length}个字段`
        }
      />
      {defaultCheckAll && (
        <Checkbox
          indeterminate={indeterminate}
          onChange={onCheckAllChange}
          checked={checkAll}
          style={{ margin: "16px 0 8px 0" }}
        >
          选择所有的字段
        </Checkbox>
      )}
      <Checkbox.Group options={options} value={checked} onChange={onChange} />
    </Modal>
  );
};

export default CustomColumns;
