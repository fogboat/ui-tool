import type { Meta, StoryObj } from '@storybook/react';
import baseDemo from "./base.demo";
import baseCode from './base.demo?raw';
import {  Story } from '@storybook/blocks';

const meta = {
  title: '消息通知',
  component: baseDemo,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        code:baseCode
      }
    },
  },


} satisfies Meta<typeof baseDemo>;

export default meta;
type Story = StoryObj<typeof meta>;


/**
 * 基本用法
 */
export const Primary:Story = {
  name:"例子",
  args:{}
};


