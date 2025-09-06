import { createContext, useCallback, useId, useRef, useState, useMemo, ReactNode, ComponentType, useContext } from "react";
import { createPortal } from "react-dom";

/**
 * 自定义组件内部Props
 *
 * @template [P=undefined] 组件payload类型
 * @template [R=void] 组件关闭时获取的值类型
 */
export interface DialogProps<P = undefined, R = void> {
    /**
     * 组件自定义使用参数
     */
    payload: P;
    /**
     * 控制组件是否显示
     */
    open: boolean;
    /**
     * promise.resolve方式关闭对话框
     * @param result 传入关闭对话框 promise.resolve结果
     */
    resolve: (result?: R) => void;
    /**
    * promise.reject方式关闭对话框
    * @param result 传入关闭对话框  promise.reject结果
    */
    reject: (result?: any) => void;
}

/**
 * 自定义组件需要继承DialogComponent
 */
export type DialogComponent<P, R = void> = ComponentType<DialogProps<P, R>>;


export interface OpenDialog {
    /**
     * @param Component 对话框组建.
     */
    <P, R>(
        Component: DialogComponent<P, R>,
        payload: P,
    ): Promise<R>;
}

export interface CloseDialog {
    /**
     * Close a dialog and return a result.
     * @param dialog The dialog to close. The promise returned by `open`.
     * @param result The result to return from the dialog.
     * @returns A promise that resolves when the dialog is fully closed.
     */
    <R>(dialog: Promise<R>, isResolve: boolean, result: R): Promise<R>;
}


interface DialogStackEntry<P, R> {
    key: string;
    open: boolean;
    promise: Promise<R>;
    Component: DialogComponent<P, R>;
    payload: P;
    resolve: (result: R) => void;
    reject: (result: R) => void;
}

export interface DialogProviderProps {
    children?: ReactNode;
    domRoot?: HTMLElement;
    /**
     * 关闭后组件卸载时间ms 给关闭动画使用
     * @default 1000
     */
    unmountAfter?: number;
}

export const DialogsContext = createContext<{
    open: OpenDialog;
    close: CloseDialog;
} | null>(null);

export function DialogsProvider(props: DialogProviderProps) {
    const { children, unmountAfter = 1000, domRoot } = props;
    const [stack, setStack] = useState<DialogStackEntry<any, any>[]>([]);
    const keyPrefix = useId();
    const nextId = useRef(0);

    const requestDialog = useCallback<OpenDialog>(
        function open<P, R>(
            Component: DialogComponent<P, R>,
            payload: P,
        ) {
            let resolve: (result: R) => void = () => { };
            let reject: (result: R) => void = () => { };
            const promise = new Promise<R>((resolveImpl, rejectImpl) => {
                resolve = resolveImpl;
                reject = rejectImpl
            });
            const key = `${keyPrefix}-${nextId.current++}`;

            const newEntry: DialogStackEntry<P, R> = {
                key,
                open: true,
                promise,
                Component,
                payload,
                resolve,
                reject
            };

            setStack((prevStack) => [...prevStack, newEntry]);
            return promise;
        },
        [keyPrefix]
    );

    const closeDialogUi = useCallback(
        function closeDialogUi<R>(dialog: Promise<R>) {
            setStack((prevStack) =>
                prevStack.map((entry) =>
                    entry.promise === dialog ? { ...entry, open: false } : entry
                )
            );
            setTimeout(() => {
                // 等待关闭动画
                setStack((prevStack) =>
                    prevStack.filter((entry) => entry.promise !== dialog)
                );
            }, unmountAfter);
        },
        [unmountAfter]
    );

    const closeDialog = useCallback(
        function closeDialog<R>(dialog: Promise<R>, isResolve = false, result: R) {
            const entryToClose = stack.find((entry) => entry.promise === dialog);
            if (entryToClose) {
                isResolve ? entryToClose.resolve(result) : entryToClose.reject(result);
                closeDialogUi(dialog);

            }
            return dialog;
        },
        [stack, closeDialogUi]
    );

    const contextValue = useMemo(
        () => ({ open: requestDialog, close: closeDialog }),
        [requestDialog, closeDialog]
    );
    const stackItem = stack.map(({ key, open, Component, payload, promise }) => (
        <Component
            key={key}
            payload={payload}
            open={open}
            resolve={(result) => {
                closeDialog(promise, true, result);
            }}
            reject={(result) => {
                closeDialog(promise, false, result);
            }}


        />
    ))
    return (
        <DialogsContext.Provider value={contextValue}>
            {children}
            {domRoot ? createPortal(
                stackItem,
                domRoot
            ) : stackItem}
        </DialogsContext.Provider>
    );
}

type PartialKey<T, P, E extends keyof T = Extract<keyof T, keyof P>> = { [K in E]?: T[K] } & Omit<T, E>;
type UseDialogsOpen<P, R, M> = <U extends P> (payload: M extends void ? P : PartialKey<U, M>) => Promise<R>
export interface DialogHook<P, R, M> {
    open: UseDialogsOpen<P, R, M>;
    close: CloseDialog;
}




/**
 * 同步写法方式调用对话框hook
 * @template [P={}] 
 * @template [R=undefined] 
 * @template [M=Partial<P>] 
 * @param {DialogComponent<P, R>} Component dialog组件 props参数需要实现DialogProps
 * @param {?M} [mergePayload] 传入dialog组件props.payload中 浅合并
 */
export function useDialogs<P = {}, R = undefined, M = Partial<P>>(Component: DialogComponent<P, R>, mergePayload?: M): DialogHook<P, R, M> {
    const { open: openDialog, close } = useContext(DialogsContext)!;

    const open = useCallback<UseDialogsOpen<P, R, M>>(
        async (payload) => {
            return openDialog<P, R>(Component, (mergePayload ? { ...mergePayload, ...payload } : payload) as P)
        },
        [openDialog, Component]
    );


    return { close, open }
}

