import Icon from "@ant-design/icons";
import { FC, useCallback } from "react";

type TypeObject = Record<string, unknown>;

interface ImagIconType extends TypeObject {
  url?: string;
  alt?: string;
}

const ImgIcon: FC<ImagIconType> = ({ url, alt = "", ...props }) => {
  // console.log(url);
  const ImgComponent = useCallback(() => (url ? <img src={url} width="100%" alt={alt} /> : null), [url]);

  return <Icon component={ImgComponent} {...props} />;
};

export default ImgIcon;
