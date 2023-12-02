import { Input } from 'antd';
const { TextArea } = Input;

/**
 * @description 搜索栏-批量检索
 * @param placeholder {string} 默认显示的文本信息
 * @param minRows {number} 限制输入框最小高度为几行
 * @param maxRows {number} 限制输入框最大高度为几行
 * @param maxLength {number} 搜索条件的长度 例如：vin码最长为17位 电池编码24位
 * @param row {number} 限制的最大行数
 * @return {ReactNode} TextArea
 */

interface IProps {
  /** 
   * 默认显示的文本信息
   * */ 
  placeholder?: string; 
  /** 
   * 限制输入框最小高度为几行
   * */ 
  minRows: number; 
  /** 
   * 限制输入框最大高度为几行
   * */ 
  maxRows: number;  
  /** 
   * 搜索条件的长度 如vin码最长为17位 电池编码24位
   * */ 
  maxLength: number; 
  /** 
   * 限制输入框的总行数
   * */ 
  rows: number; 
  [propName: string]: any;
}

const TextAreaSeach: React.FC<IProps> = ({
  placeholder,
  minRows,
  maxRows,
  maxLength,
  rows,
  ...props
}) => {
  const num = (maxLength + 1) * rows - 1;
  return (
    <TextArea
      placeholder={placeholder}
      autoSize={{ minRows, maxRows }}
      maxLength={num}
      {...props}
    />
  );
};

export default TextAreaSeach;
