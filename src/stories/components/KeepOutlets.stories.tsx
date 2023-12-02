import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import KeepOutlets from "../../components/KeepOutlets/KeepOutlets"
import KeepProvider from "../../components/KeepOutlets/KeepProvider";

const meta = {
  title: "其它/路由缓存",
  component: KeepOutlets,
  tags: ["autodocs"],
  argTypes: {
    includes: {
      description:'缓存白名单',
      table: {
        type: {summary: 'array'}
      }
    },
    max: {
      description:'最大缓存数据',
      table: {
        type: {summary: 'number'}
      }
    },
    drop: {
      description:'清空指定缓存',
      table: {
        category: 'useKeepControl',
        subcategory: 'useKeepControl',
        type: {summary: 'drop("/user")'}
      }
    },
    clear: {
      description:'清空所有缓存',
      table: {
        category: 'useKeepControl',
        subcategory: 'useKeepControl',
        type: {summary: 'clear()'}
      }
    }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    includes: ['/user','/account']
  },
  render: (args) => <KeepProvider>
      <KeepOutlets {...args}/>
  </KeepProvider>,
};
