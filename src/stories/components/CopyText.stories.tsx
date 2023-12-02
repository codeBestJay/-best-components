import type { Meta, StoryObj } from "@storybook/react";
import CopyText from "../../components/CopyText/CopyText";

const meta = {
  title: "Example/CopyText",
  component: CopyText,
  tags: ["autodocs"],
} satisfies Meta<typeof CopyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    text: '文案名称',
    value: "可复制的文案内容",
    url: '',
  },
};
