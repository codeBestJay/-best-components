import type { Meta, StoryObj } from "@storybook/react";
import StationSelect from "../../components/StationSelect/StationSelect";

const meta = {
  title: "Example/StationSelect",
  component: StationSelect,
  tags: ["autodocs"],
} satisfies Meta<typeof StationSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    stationSource: [
      {
        cityCode: "340300",
        cityName: "蚌埠市",
        stationList: [
          {
            id: "563045548270026752",
            stationName: "测试数据54",
            surplusBatteryCount: 0,
            platformKey: "7wH6g8wrE2ucfBUSaf",
            networkType: "1",
          },
        ],
      },
    ],
  },
};
