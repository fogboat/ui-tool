import { useState, ComponentType, useLayoutEffect } from "react";
import { JSX } from "react/jsx-runtime";

/**
 * 自定义组件需要实现的Props
 *
 * @template [P=undefined] 组件payload类型
 */
export interface NoticeProps<P = undefined> {
    /**
     * 组件自定义使用参数
     */
    payload?: P;
    /**
     * 组件索引
     */
    index: number;
    /**
     * 控制组件是否显示
     */
    open: boolean;

    /**
     * 消息
     */
    message?: React.ReactNode
    /**
     * 关闭对话框
     */
    onClose: () => void;
}
/**
 * 自定义组件需要继承NoticeComponent
 */
export type NoticeComponent<P> = ComponentType<NoticeProps<P>>;



/**
 * 消息通知组件展示位置
 * @template P 自定义组件参数类型
 */
export interface NotificationsProps<P> {
    /**
     * 传入Notifier实例
     */
    notifier: Notifier<P>
}

interface NotifyItem<P> {
    open: boolean;
    /**
     * 单个通知设置
     */
    options?: NotifyItemOptions;
    /**
     * 消息
     */
    message?: React.ReactNode;
    /**
     * 计时器
     */
    timer?: NodeJS.Timeout
    payload?: P,
    /**
     * 关闭回调
     */
    onClose: () => void
}

/**
 * 单个消息组件配置
 */
interface NotifyItemOptions {
    /**
    * 自动关闭时间ms 小于0不会关闭
    * @default 3000
    */
    time?: number
}

/**
 * Notifier options配置
 */
interface NotifierOptions<P> {
    /**
     * 关闭后组件卸载时间ms 给关闭动画使用
     * @default 200
     */
    unmountAfter?: number
    /**
     * 消息通知组件 实现NoticeProps
     */
    component: NoticeComponent<P>
    /**
     * 自动关闭时间ms 小于0不会关闭
     * @default 3000
     */
    time?: number
    /**
     * 同时展示信息最大值 小于0不限制
     * @default 5
     */
    maxSize?: number
}

/**
 * 发送通知
 *
 * @interface Notice
 * @typedef {Notice}
 * @template P 
 */
type Notice<P> =(message?: React.ReactNode, payload?: P, options?: NotifyItemOptions)=>string
/**
 * 通知器
 *
 * @template [P=undefined] 
 */
export class Notifier<P = undefined> {
    /**
     * 待处理队列
     */
    #taskQueue: [string, NotifyItem<P>][] = []
    /**
     * 存储消息组件map
     */
    #map: Map<string, NotifyItem<P>> = new Map()
    #key = 0
    #update = () => { }
    #options


    constructor(component: NoticeComponent<P>, options?: Omit<NotifierOptions<P>, "component">) {
        this.#options = {
            time: 3000,
            maxSize: 5,
            unmountAfter: 200,
            ...options,
            component
        }
    }
    subscribe=(setState: ({ }) => void)=> {
        this.#update = () => setState({})
        return () => { this.#update = () => { } }
    }
    /**
     * 加入显示
     */
    #add() {
        const { maxSize, time } = this.#options
        // 消息满了
        if (this.#map.size >= maxSize && maxSize > 0) {
            const iterator = this.#map.entries()
            // 需要清理显示给未显示的 最多清理maxSize条
            const size = this.#taskQueue.length
            let i = 0
            while (i < size) {
                const { value, done } = iterator.next();
                if (done) break;
                // 打开状态
                if (value[1].open) {
                    // 清理自动关闭计时器
                    if (value[1].timer) clearTimeout(value[1].timer)
                    this.close(value[0])
                }
                i++
            }
        } else {
            if (this.#taskQueue.length) {
                const [key, item] = this.#taskQueue.shift()!
                this.#map.set(key, item)
                this.#update()
                // 自动关闭
                const closeTime = item.options?.time ?? time
                if (closeTime > 0) {
                    item.timer = setTimeout(() => {
                        this.close(key)
                    }, closeTime);
                }
            }


        }


    }
   
    notice:Notice<P> = (message?, payload?, options?) => {
        const key = "#" + this.#key++
        this.#taskQueue.push([key, {
            message,
            open: true,
            options,
            payload,
            onClose: () => { this.close(key) }
        }])

        this.#add()

        return key
    }

    /**
     * 关闭消息
     *
     * @param {string} key 消息key
     */
    close=(key: string)=> {
        if (this.#map.has(key)) {
            const value = this.#map.get(key)!
            value.open = false
            this.#update()
            setTimeout(() => {
                this.#map.delete(key)
                if (this.#taskQueue.length) {
                    this.#add()
                } else {
                    this.#update()
                }
            }, this.#options.unmountAfter);
        }
    }

    get() {
        return this.#map.entries()
    }

    getOptions() {
        return this.#options
    }
}

const useNotifier = <P,>(notifier: Notifier<P>) => {
    const update = useState({})[1]
    useLayoutEffect(() => {
        return notifier.subscribe(update)
    }, [update])
    return [notifier.get(), notifier.getOptions()] as const
}


/**
 * 通知组件容器
 * @template [P=undefined] 
 * @param {NoticeProviderProps<P>} props 
 * @returns {JSX.Element[]} 
 */
export function Notifications<P = undefined>(props: NotificationsProps<P>): JSX.Element[] {
    const { notifier } = props;
    const [stack, options] = useNotifier<P>(notifier);

    const renderList = () => {
        const list: JSX.Element[] = []
        const { component: C } = options
        let i = 0
        for (const [key, v] of stack) {
            list.push(<C
                index={i}
                message={v.message}
                key={key}
                payload={v.payload}
                open={v.open}
                onClose={v.onClose}
            />)
            i++
        }

        return list
    }
    return renderList();
}



