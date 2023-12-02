import type { Meta, StoryObj } from "@storybook/react";
import TableActions from "../../components/TableActions";
import * as ActionButton from '../components/ActionButton.stories'

const meta = {
  title: "通用/TableActions",
  component: TableActions,
  tags: ["autodocs"],
  args: {
    options :[
      {
        label: "详情",
        key: "detail",
        href: "/aaa"
      },
      {
        label: "详情2",
        key: "detail2",
      },
      {
        label: "详情3",
        key: "detail3",
      },
      {
        label: "详情4",
        key: "detail4",
      },
      {
        label: "详情5",
        key: "detail5",
      }
    ]
  },
  argTypes: {
    options: {
      table: {
        type: {summary: 'options类型参考[ActionButton]'}
      }
    }
  }
} satisfies Meta<typeof TableActions>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  
};
