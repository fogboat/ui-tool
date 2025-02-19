import type { Meta, StoryObj } from '@storybook/react';

import { DialogProps, DialogsProvider, useDialogs } from '$/useDialogs';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode, useState } from 'react';
 function useDialogLoadingButton(onClick: () => Promise<void>) {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      setLoading(true);
      await onClick();
    } finally {
      setLoading(false);
    }
  };
  return {
    onClick: handleClick,
    loading,
  };
}

 interface ConfirmDialogPayload<R = void> {
  /**
  * 头部标题
  */
  title?: ReactNode;
  /**
   * 内容.
   */
  content: ReactNode;
  /**
   * 确定按钮文字 -确定.
   */
  okText?: ReactNode;
  /**
  * 取消按钮文字 -取消.
  */
  cancelText?: ReactNode;
  onOk?: (resolve: (result?: R) => void, reject: (result?: any) => void) => Promise<void>
}

interface ConfirmDialogProps<R>
  extends DialogProps<ConfirmDialogPayload<R>, R> { }

function ConfirmDialog<R>({ open, payload, resolve, reject }: ConfirmDialogProps<R>) {
  const onClose = () => reject();
  const okButtonProps = useDialogLoadingButton(async () => {
    if (payload.onOk) {
      return payload.onOk(resolve, reject)
    }
    resolve()
  });
  return (
    <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
      <DialogTitle>{payload.title ?? "确认？"}</DialogTitle>
      <DialogContent>{payload.content}</DialogContent>
      <DialogActions>
        <Button
          size="small"
          variant="outlined"
          onClick={onClose}
        >
          {payload.cancelText ?? "取消"}
        </Button>
        <Button
          size="small"
          variant="outlined"
          {...okButtonProps}
        >
          {payload.okText ?? "确定"}
        </Button>

      </DialogActions>
    </Dialog>
  );
}

const Component = () => {
  const dialog = useDialogs(ConfirmDialog)
  const onClick = async () => {
    try {
      const res = await dialog.open({})
      console.log(res);
    } catch (error) {
      
    }
   

  }
  return <Button onClick={onClick}>对话框</Button>
}
const App = () => {
  return <DialogsProvider><Component /></DialogsProvider>

}
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'useDialogs',
  component: App,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

} satisfies Meta<typeof useDialogs>;

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
  },


};

