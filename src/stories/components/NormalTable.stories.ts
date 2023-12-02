import type { Meta, StoryObj } from "@storybook/react";
import NormalTable from "../../components/NormalTable";
import { ColumnsType } from "antd/lib/table";

const meta = {
  title: "Example/NormalTable",
  component: NormalTable,
  tags: ["autodocs"],
} satisfies Meta<typeof NormalTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const tableColumns: ColumnsType<Record<string, any>> = [
    { title: '编号', dataIndex: 'orderNo' },
    {
      title: '测试租金',
      dataIndex: 'testAmount',
    },
    {
      title: '测试价格',
      dataIndex: 'testPrice',
    },
  ];

const dataSource = [
    {
    orderNo:1,
    testAmount:100,
    testPrice: 500,
    },{
    orderNo:2,
    testAmount:200,
    testPrice: 500,
}]

export const Example: Story = {
  args: {
    tableColumns:tableColumns,
    dataSource:dataSource,
    pagination:false,
  },
};