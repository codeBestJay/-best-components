import type { Meta, StoryObj } from "@storybook/react";
import { action } from '@storybook/addon-actions';
import CustomColumns from "../../components/CustomColumns";
import { Button } from "antd"
import { useState } from "react";
import React from "react";

const meta = {
  title: "自定义列表选择",
  component: CustomColumns,
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: false
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    // open: false,
    // defaultCheckAll: true,
    // value: [],
    // options:[{
    //   value: '1',
    //   label: '选项1',
    //   disabled: false
    // },
    // {
    //   value: '2',
    //   label: '选项2',
    //   disabled: true
    // }]
  },
} satisfies Meta<typeof CustomColumns>;

export default meta;
type Story = StoryObj<typeof meta>;

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */

const ButtonWithHooks = (args) => {
  const [visible, setVisible] = useState(false);

  return <div>
      <Button onClick={() => {
        setVisible(true)
      }}>点击打开</Button>
      <CustomColumns {...args} open={visible} onCancel={() => setVisible(false)}/>
    </div>;
};

export const Default: Story = {
  render: (args) => <ButtonWithHooks {...args}/>,
};

export const TowDefault: Story = {
  args: {
    title: '测试',
    value:['2'],
    handleOk: action('checked')
  },
  render: (args) => <ButtonWithHooks {...args}/>,
};
