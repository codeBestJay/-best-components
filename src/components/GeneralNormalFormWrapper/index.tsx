import { Button, Space } from "antd";
import type { FC } from "react";
import { useNavigate, To } from 'react-router-dom';
import type { GeneralFormWrapperProps } from "../GeneralFormWrapper";
import '../GeneralFormWrapper/style.scoped.css'

import GeneralFormWrapper from "../GeneralFormWrapper";

export interface GeneralNormalFormWrapperProps extends GeneralFormWrapperProps {
  confirmLoading?: boolean;
  onSubmit?: (type: string) => void;
  navigateUrl?: any;
  centerFooter?: boolean;
}

const GeneralNormalFormWrapper: FC<GeneralNormalFormWrapperProps> = ({
  children,
  title,
  hideBack=true,
  showTitle=false,
  navigateUrl,
  confirmLoading,
  centerFooter = true,
  onSubmit,
}) => {
  const navigate = useNavigate()
  const onHandleClick = async (type: string) => {
    switch (type) {
      case "cancel": {
        navigate(navigateUrl);
        break;
      }

      case "submit": {
        onSubmit("submit");
        break;
      }

      default:
        break;
    }
  };

  const actionFooter = (): React.ReactNode[] => {
    return [
      <Button key="confirm" type="primary" loading={confirmLoading} onClick={() => onHandleClick("submit")}>
        确认
      </Button>,
      <Button key="cancel" onClick={() => onHandleClick("cancel")}>
        取消
      </Button>
    ];
  };

  return (
    <GeneralFormWrapper hideBack={hideBack} showTitle={showTitle} title={title} footerExtra={centerFooter ? actionFooter() : []}>
      {children}
    </GeneralFormWrapper>
  );
};

export default GeneralNormalFormWrapper;
