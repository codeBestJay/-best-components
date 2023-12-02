import type { Meta, StoryObj } from "@storybook/react";
import ExportModal from "../../components/ExportModal";

const meta = {
  title: "通用/导出弹框",
  component: ExportModal,
  tags: ["autodocs"],
} satisfies Meta<typeof ExportModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    visible: false,
    loading: false,
    plainOptions: []
  }
};
