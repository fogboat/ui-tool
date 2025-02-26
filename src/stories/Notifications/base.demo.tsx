import { NoticeProps, Notifications, Notifier } from "@fogboat/ui-tool";
import Button from "@mui/material/Button";

import Snackbar from '@mui/material/Snackbar';
import { createPortal } from "react-dom";

interface NoticePayload {
    /**
    * 自定义内容
    */
    icon?: string;

}
// 自定义组件实现NoticeProps
interface NoticeCompProps extends NoticeProps<NoticePayload> { }
function NoticeComponent({ open, message, payload, onClose }: NoticeCompProps) {
    return <Snackbar sx={{ position: "static", mb: "8px" }} open={open} message={`${message}${payload?.icon}`} action={<Button color="secondary" size="small" onClick={onClose}>UNDO</Button>} />
}

// 实例化通知器
const notifier = new Notifier(NoticeComponent)
// 封装里一个通知函数 可在任意位置调用
function notice(msg: string) {
    notifier.notice(msg, { icon: "👌" })
}

let id = 0
export default function Demo() {
    return (
        <div >
            {createPortal(<div style={{ position: "fixed", right: 16, top: 16 }}>
                {/* 消息组件出现的位置 */}
                <Notifications notifier={notifier} />
            </div>, document.body)}

            <Button onClick={() => { notice("新消息" + id++); }}>通知</Button>
        </div>
    )

}



