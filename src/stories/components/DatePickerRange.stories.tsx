import type { Meta, StoryObj } from "@storybook/react";
import DatePickerRange from "../../components/DatePickerRange/DatePickerRange";

const meta = {
  title: "时间控件",
  component: DatePickerRange,
  tags: ["autodocs"],
  argTypes: {
    value: {
      description: '日期',
      table: {
        type: { sumary: 'moment' }
      },
    },
    onChange: {
      description: '时间发生变化的回调。（兼容antd时间控件其余Api）',
      table: {
        type: { sumary: '	function(date: moment, dateString: string)' }
      },
    },
  },
} satisfies Meta<typeof DatePickerRange>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    // value: [],
    // onChange: () => { },
  },
};
