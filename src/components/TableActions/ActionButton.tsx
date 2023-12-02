import type { FC, MouseEventHandler } from "react";
import type { ButtonItem } from ".";

import { Typography } from "antd";
import { Link } from "react-router-dom";

type ActionButtonProps = Omit<ButtonItem, "key">;

const ActionButton: FC<ActionButtonProps> = ({ label, href, path, onClick, danger }) => {
  return (
    <>
      {href ? (
        <a href={href} target="_blank" rel="noreferrer">
          {label}
        </a>
      ) : path ? (
        <Link to={path}>{label}</Link>
      ) : (
        <Typography.Link
          onClick={onClick as unknown as MouseEventHandler<HTMLElement>}
          style={{ color: danger ? "var(--ant-error-color)" : "" }}
        >
          {label}
        </Typography.Link>
      )}
    </>
  );
};

export default ActionButton;
