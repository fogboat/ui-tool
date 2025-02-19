import { ComponentType } from 'react';
import { Context } from 'react';
import { JSX } from 'react/jsx-runtime';
import { ReactNode } from 'react';

export declare interface CloseDialog {
    /**
     * Close a dialog and return a result.
     * @param dialog The dialog to close. The promise returned by `open`.
     * @param result The result to return from the dialog.
     * @returns A promise that resolves when the dialog is fully closed.
     */
    <R>(dialog: Promise<R>, isResolve: boolean, result: R): Promise<R>;
}

/**
 * 自定义组件需要继承DialogComponent
 */
export declare type DialogComponent<P, R = void> = ComponentType<DialogProps<P, R>>;

export declare interface DialogHook<P, R, M> {
    open: UseDialogsOpen<P, R, M>;
    close: CloseDialog;
}

/**
 * 自定义组件内部Props
 */
export declare interface DialogProps<P = undefined, R = void> {
    /**
     * 组件使用参数
     */
    payload: P;
    /**
     * 是否显示
     */
    open: boolean;
    /**
     * resolve方式关闭对话框
     * @param result 对话框关闭后dialog promise resolve结果
     */
    resolve: (result?: R) => void;
    /**
     * reject方式关闭对话框
     * @param result 对话框关闭后dialog  promise reject结果
     */
    reject: (result?: any) => void;
}

export declare interface DialogProviderProps {
    children?: ReactNode;
    unmountAfter?: number;
}

export declare const DialogsContext: Context<    {
    open: OpenDialog;
    close: CloseDialog;
} | null>;

export declare function DialogsProvider(props: DialogProviderProps): JSX.Element;

export declare interface OpenDialog {
    /**
     * @param Component 对话框组建.
     */
    <P, R>(Component: DialogComponent<P, R>, payload: P): Promise<R>;
}

declare type PartialKey<T, P, E extends keyof T = Extract<keyof T, keyof P>> = {
    [K in E]?: T[K];
} & Omit<T, E>;

/**
 *
 * @param Component dialog组件
 * @param mergePayload 浅合并参数
 * @returns
 */
export declare function useDialogs<P = {}, R = undefined, M = Partial<P>>(Component: DialogComponent<P, R>, mergePayload?: M): DialogHook<P, R, M>;

declare type UseDialogsOpen<P, R, M> = <U extends P>(payload: PartialKey<U, M>) => Promise<R>;

export { }
