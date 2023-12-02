import type { Meta, StoryObj } from "@storybook/react";
import ActionButton from "../../components/TableActions/ActionButton";

const meta = {
  title: "Example/ActionButton",
  component: ActionButton,
  tags: ["autodocs"],
  argTypes: {
    path: {
      description:'导出文件',
      table: {
        type: {summary: 'string'}
      }
    },
  }
} satisfies Meta<typeof ActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
