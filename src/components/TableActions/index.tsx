import type { MenuProps } from "antd";
import type { MenuItemType } from "antd/lib/menu/hooks/useItems";
import type { FC, PropsWithChildren } from "react";

import { Dropdown, Space, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";

import ActionButton from "./ActionButton";

export interface ButtonItem extends MenuItemType {
  /**
   * 当为完整的链接，可跳转
   * */ 
  href?: string;
  /** 
   *  路由跳转地址
   * */ 
  path?: string; 
}

interface TableActionsProps extends PropsWithChildren {
  /** 
   * 当按钮数量达到maxCount后开始出现更多
  * */ 
  maxCount?: number;
  /** 
   * 按钮列表
  * */ 
  options?: Array<ButtonItem>;
}

const TableActions: FC<TableActionsProps> = ({ children, options, maxCount = 3 }) => {
  const [state, setState] = useState<{
    alwaysDisplay: MenuProps["items"];
    dropdownDisplay: MenuProps["items"];
  }>({
    alwaysDisplay: [],
    dropdownDisplay: [],
  });

  const renderActions = useCallback(() => {
    return (
      <>
        {state.alwaysDisplay?.map((option) => (
          <ActionButton key={option?.key} {...option} />
        ))}
        {(state.dropdownDisplay as [])?.length > 0 ? (
          <Dropdown
            overlayClassName="table-action-menu"
            // destroyPopupOnHide
            menu={{ items: state.dropdownDisplay }}
            overlayStyle={{ minWidth: 80, textAlign: "center" }}
            placement="bottom"
          >
            <Typography.Link>更多</Typography.Link>
          </Dropdown>
        ) : null}
      </>
    );
  }, [state]);

  useEffect(() => {
    const propsOptions = options as ButtonItem[];
    if (propsOptions?.length > maxCount) {
      state.alwaysDisplay = propsOptions.slice(0, maxCount);
      state.dropdownDisplay = propsOptions.slice(maxCount);
    } else {
      state.alwaysDisplay = propsOptions;
      state.dropdownDisplay = [];
    }
    setState({ ...state });
  }, [options]);

  return <Space>{children ? children : options ? renderActions() : null}</Space>;
};

export default TableActions;
