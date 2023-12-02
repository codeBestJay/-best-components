import { LeftOutlined } from "@ant-design/icons";
import { Button, Space, Spin } from "antd";
import type { CSSProperties, FC, PropsWithChildren, ReactNode } from "react";
import { useNavigate } from 'react-router-dom';
import './style.scoped.css'

export interface GeneralFormWrapperProps extends PropsWithChildren {
  title?: string;
  to?: string;
  footer?: boolean;
  footerArr?: ReactNode[];
  expAction?: ReactNode[];
  refreshLoading?: boolean; // 针对有刷新的详情页
  titleStyle?: CSSProperties;
  footerExtra?: ReactNode[];
  wrapperStyle?: CSSProperties;
  handleClick?: () => void;
  footerBtnLocation?: string;
  hideBack?: boolean;
  showTitle?: boolean;
  handleNavigate?: (value: string | number) => void; // 默认返回上级页面事件
}


const GeneralFormWrapper: FC<GeneralFormWrapperProps> = ({
  children,
  title,
  to,
  hideBack = true,
  showTitle = false,
  footer = false,
  wrapperStyle = {},
  expAction = [],
  refreshLoading = false,
  titleStyle = {},
  footerExtra,
  handleClick,
  footerBtnLocation = 'left',
}) => {
  const navigate = useNavigate()
  const expActionFilter = expAction.filter(item => item)
  return (
    <div className="general-form-wrapper">
      {
        (expActionFilter.length>0 || showTitle) &&
        <div className='header' style={titleStyle}>
        <div className="left-action">
          {
            !hideBack && <Button
            icon={<LeftOutlined />}
            style={{ padding: "4px 12px 4px 8px" }}
            onClick={() => {
              to ? navigate(to) : navigate(-1);
              handleClick && handleClick();
            }}
          >
            返回
          </Button>
          }
          {title && showTitle && <span className="detail-title" style={{marginLeft: hideBack ? 0 : 20}}>{title}</span>}
        </div>
        {expActionFilter.length>0 && (
          <div className="exp-action">
            <div className='btn'>{expAction}</div>
          </div>
        )}
        </div>
      }
      <div
        style={{padding: (expActionFilter.length>0 || showTitle) ? '0 24px' : '40px 24px 0 24px',...wrapperStyle}}
        className='content'
      >
        <Spin spinning={refreshLoading}>{children}</Spin>
      </div>
      {footerExtra && (
        <div
          style={{ textAlign: `${footerBtnLocation}` as 'left' | 'right' | 'center' }}
          className='footer'
        >
          {footerExtra?.map((item, i) => (
            <Space style={{ marginRight: 16 }} key={i}>
              {item}
            </Space>
          ))}
        </div>
      )}
    </div>
  );
};

export default GeneralFormWrapper;
