import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Image, message, Button, Upload, Typography } from 'antd';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
// import { subscribe } from 'diagnostics_channel';
import PDFViewer, { IPdf } from '../PDFViewer/PDFViewer';

import "./index.scoped.less";

/**
 * @description 图片上传组件封装
 * @param sampleImgUrl {string} 示例图片URL
 * @param onChange
 * @param uploadHandler 上传处理器，由接入方自行实现上传文件到服务端
 * @param uploadErrorHandler 上传失败处理器
 * @param props 支持所有的Upload属性
 * @return {JSX.Element}
 * @constructor
 */

export interface Ifile {
  uid?: string;
  status: string;
  url: string;
  type?: string;
  name?: string;
}

export type UploadedUrlStatus = {
  url: string,
  status: boolean
  fileKey?: string;
}

export interface IUpload {

  defaultFileList?: any[];
  /**
   * 实例图片地址
   */
  sampleImgUrl?: string;
  /**
   * 变更回调函数
   * @param value 文件
   * @returns 
   */
  onChange?: (value: { file: any; fileList: any[] } | undefined) => void;
  /**
   * 任意属性
   */
  [props: string]: any;
  /**
   * 描述
   */
  describe?: string;
  /**
   * 上传处理器，需返回预览地址
   * @param file 上传的文件
   * @returns 
   */
  uploadAsyncHandler?: (file:Blob) => Promise<UploadedUrlStatus>;
  /**
   * 上传错误处理器
   * @returns 
   */
  
  uploadErrorHandler?: () => void;

  limitSize?: number;

  maxCount?: number;

  btnText?: string;

  accept?: string;

  showBtn?: boolean;

  vaildText?: string;

  acceptText?: string;
}

function UploadButton(props: { uploadLoading: any,btnText:string }) {
  const { uploadLoading,btnText } = props;
  return (
    <div>
      {uploadLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div>{btnText}</div>
    </div>
  );
}

const UploadImage: React.FC<IUpload> = forwardRef(
  (props: IUpload, ref) => {
    const {
      limitSize = 2,
      maxCount = 1,
      btnText = '',
      accept = '*',
      showBtn = false,
      describe = '',
      vaildText = '图片',
      acceptText = '上传文件格式不符合要求',

      defaultFileList = [],
      sampleImgUrl = '',
      onChange = () => {return},
      uploadAsyncHandler = () => {
        message.error('文件上传未实现');
        return undefined;
      },
      uploadErrorHandler = () => {
        message.error('上传失败');
      },
    } = props;
    const [uploadLoading, setUploadLoading] = useState(false);
    const pdfViewRef = useRef<IPdf>(null);
    const [fileList, setFileList] = useState<any>(defaultFileList);
    const [url, setUrl] = useState<string>();
    const [sampleVisible, setSampleVisible] = useState(false);

    const customProps = {
      name: 'file',
      accept,
      beforeUpload: async (file: Blob) => {
        const isLtM = file.size / 1024 / 1024 < limitSize;
        if (accept !== '*') {
          const subType = file.type.split('/')[1];
          if (!accept.includes(subType)) {
            message.error(`${acceptText}`);
            return false;
          }
        }
        if (!isLtM) {
          message.error(`${vaildText}大小不超过${limitSize}M`);
          return false;
        }

        try{
          setUploadLoading(true);
          
          //上传处理
          const urlStatus = await uploadAsyncHandler(file);
          if(urlStatus && urlStatus.status){
            if(urlStatus.url){
              if(urlStatus.fileKey){
                Object.assign(file, { uid: urlStatus.fileKey });
              }
              Object.assign(file, { url: urlStatus.url+'&type='+file.type+'&name='+file.name });
              let curFileList;
              if (maxCount > 1) {
                curFileList = fileList?.concat(file);
              } else {
                curFileList = [file];
              }
              // console.log('看看curFileList', curFileList);
              setFileList(curFileList);
              onChange?.(curFileList);
              message.success('上传成功');
            }
          }else{
            uploadErrorHandler();
          }
        }catch(e){
          //上传失败处理
          uploadErrorHandler();
        }finally{
          setUploadLoading(false);
        }
        return false;
      },
      onRemove: (file: any, type?: string) => {
        if (type === 'clear') {
          setFileList(undefined);
          onChange?.(undefined);
        } else {
          const curFileList = fileList.filter((fi: { uid: any }) => fi.uid !== file.uid);
          setFileList(curFileList);
          onChange?.(curFileList);
        }
        return false;
      },
      fileList: fileList,
    };

    const previewOptions = {
      visible: sampleVisible,
      onVisibleChange: (value: any) => {
        setSampleVisible(value);
      },
      src: url,
    };

    // 对外暴露的ref方法
    useImperativeHandle(ref, () => ({
      onRemoveFileList: () => {
        customProps.onRemove(null, 'clear');
      },
    }));

    const handlePreview = (file: any) => {
      const inlineUrl:string = file.url.lastIndexOf('dt=inline') != -1 ? file.url : file.url+"&dt=inline";
      
      if (file.type.includes('application/pdf')) {
        window.open(inlineUrl);
        // pdfViewRef.current &&
        //   pdfViewRef.current.show({
        //     info: {
        //       url: inlineUrl,
        //       title: file.name,
        //     },
        //   });
      } else {
        setUrl(inlineUrl);
        setSampleVisible(true);
      }
      return false;
    };

    return showBtn ? (
      <div>
        <Upload {...customProps} {...props}>
          <Button icon={<UploadOutlined />}>{btnText}</Button>
        </Upload>
        {describe && <div>{describe}</div>}
      </div>
    ) : (
      <div className='expo-upload-container'>
        <Upload
          listType="picture-card"
          // className='expo-upload-area'
          {...customProps}
          {...props}
          onPreview={handlePreview}
        >
          {fileList.length >= maxCount ? null : <UploadButton uploadLoading={uploadLoading} btnText={btnText} />}
        </Upload>
        {(describe || sampleImgUrl) && (
        <div className='expo-upload-tips'>
          <p>
            {describe}
            {sampleImgUrl && (
              <div>
                <Typography.Link
                  onClick={() => {
                    setUrl(sampleImgUrl);
                    setSampleVisible(true);
                  }}
                >
                  查看示例图片
                </Typography.Link>
              </div>
            )}
          </p>
        </div>
        )}
        <Image preview={previewOptions} />
        {/* <Image width={200} style={{ display: 'none' }} src={url} /> */}
        <PDFViewer ref={pdfViewRef} />
      </div>
    );
  },
);

export default UploadImage;
