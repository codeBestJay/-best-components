import type { Meta, StoryObj } from "@storybook/react";
import UploadImage from '../../components/UploadImage/UploadImage';

const meta = {
    title: "文件上传/UploadImage",
    component: UploadImage,
    tags: ["autodocs"],
  } satisfies Meta<typeof UploadImage>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Example: Story = {
    args: {
      uploadAsyncHandler:async (file:Blob) => {return {url:'',status:true};}
    },
  };