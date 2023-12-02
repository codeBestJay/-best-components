/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useRef, useState, useImperativeHandle } from 'react';
import { Button, Modal, Spin } from 'antd';

interface IRef {
  onOk?: (payload: any) => void;
  onCancel?: () => void;
}

export interface IPdf {
  show: (payload?: any) => void;
}

const PDFViewer = React.forwardRef<IPdf>((_, ref) => {
  const [visible, setVisible] = useState(false);
  const payloadRef = useRef<IRef>({});
  const [modalTitle, setModalTitle] = useState();
  const [fileUrl, setFileUrl] = useState<any>();
  const [fileLoading, setFileLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    show: (payload: any) => {
      setFileLoading(false);
      setModalTitle(payload?.info?.title || '预览');
      setVisible(true);
      initPdfJS();
      if (payload?.info) {
        getFileUrl(payload.info.url);
      }
      payloadRef.current = payload;
    },
  }));

  const wrapWithClose = (method: any) => () => {
    setVisible(false);
    method && method();
  };

  const initPdfJS = () => {
    try {
      localStorage.removeItem('pdfjs.history');
    } catch {
      //
    }
  };

  const getFileUrl = async (url: any) => {
    try {
      setFileLoading(true);
      const fileBlob = await (await fetch(url)).blob();
      const fileUrl = URL.createObjectURL(fileBlob);
      setFileUrl(fileUrl);
    } catch {
      //
    } finally {
      setFileLoading(false);
    }
  };
  return (
    <Modal
      title={modalTitle}
      width={800}
      open={visible}
      bodyStyle={{ padding: 0 }}
      maskClosable={false}
      onCancel={wrapWithClose(payloadRef.current.onCancel)}
      footer={[
        <Button key="confirm" type="primary" onClick={wrapWithClose(payloadRef.current.onOk)}>
          确定
        </Button>,
      ]}
    >
      {fileLoading ? (
        <div style={{ textAlign: 'center', padding: '10% 0' }}>
          <Spin spinning={fileLoading} />
        </div>
      ) : (
        <embed
          // sandbox=""
          type="application/pdf"
          style={{
            width: '100%',
            height: '65vh',
          }}
          src={`/pdfjs/web/viewer.html?file=${fileUrl}`}
        />
      )}
    </Modal>
  );
});

export default PDFViewer;
