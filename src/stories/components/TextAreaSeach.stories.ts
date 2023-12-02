import type { Meta, StoryObj } from "@storybook/react";
import TextAreaSeach from '../../components/TextAreaSeach';


const meta = {
    title: "Example/TextAreaSeach",
    component: TextAreaSeach,
    tags: ["autodocs"],
  } satisfies Meta<typeof TextAreaSeach>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  export const Example: Story = {
    args: {
      placeholder:"精确查询", 
      minRows:1, 
      maxRows:3, 
      maxLength:24,
      row:10
    },
  };
  