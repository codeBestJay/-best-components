import { message, Typography } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";


const { Link } = Typography

interface IProps {
  /**
   * What the text?
   */
  text: string | number;
  /**
   * What the copied value？
   */
  value?: string | undefined;
  /**
   * Where does the url jump to?
   */
  url?: string | undefined;
}

const CopyText = (props: IProps) => {
  const { text, value, url } = props;
  if (value) {
    if (url) {
      return (
        <span>
          <Link href={url}>{value}</Link>&nbsp;
          <CopyToClipboard text={value} onCopy={() => message.success(`${text}复制成功`)}>
            <Typography.Link>复制</Typography.Link>
          </CopyToClipboard>
        </span>
      );
    } else {
      return (
        <span>
          {value}&nbsp;
          <CopyToClipboard text={value} onCopy={() => message.success(`${text}复制成功`)}>
            <Typography.Link>复制</Typography.Link>
          </CopyToClipboard>
        </span>
      );
    }
  } else {
    return <span>-</span>;
  }
};

export default CopyText;