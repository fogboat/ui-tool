import { DialogProps, DialogsProvider, useDialogs } from '@fogboat/ui-tool';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";


interface ConfirmDialogPayload<R = boolean> {
    /**
    * 头部标题
    */
    title?: string;
    /**
     * 内容.
     */
    content: string;
    /**
     * 确定点击事件
     */
    onOk?: (resolve: (result?: R) => void,) => Promise<void>

}
interface ConfirmDialogProps extends DialogProps<ConfirmDialogPayload, boolean> { }

function ConfirmDialog({ open, payload, resolve, reject }: ConfirmDialogProps) {
    // 对话框需要继承DialogProps
    const onClose = () => reject();

    return (
        <Dialog maxWidth="xs" fullWidth open={open} onClose={onClose}>
            <DialogTitle>{payload.title || "确认此次操作？"}</DialogTitle>
            <DialogContent>{payload.content}</DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={onClose}
                >
                    取消
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                        // 关闭回调传入dialog.open 的onOK回调中
                        payload.onOk(resolve)
                    }}
                >
                    确定
                </Button>

            </DialogActions>
        </Dialog>
    );
}
const Component = () => {
    // 使用useDialogs 传入对应Dialog,传入预设值
    const dialog = useDialogs(ConfirmDialog,{content:"删除xxx"})
    const onClick = async () => {
        try {
            // 同步方式打开对话框等待对话框确认或取消操作 并可接收来自对话框的结果
            const res = await dialog.open({
                onOk: async (resolve) => {
                    // 处理异步操作等逻辑
                    const success = await true
                    if (success) {
                        resolve(true)
                    }
                }
            })
            // 获得resolve传入的结果
            console.log(res);
        } catch (error) {

        }
    }
    return <Button onClick={onClick}>对话框</Button>
}
export default function Demo() {
    return (
        // 引入DialogsProvider,
        <DialogsProvider>
            <Component />
        </DialogsProvider>
    )

}

