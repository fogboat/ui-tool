import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-DwOlTBOG.js";import{M as a,C as t}from"./index-C-3tq6tw.js";import l from"./stories-D70S1MJz.js";import{A as r}from"./index-DvaquUY_.js";import"./index-2yJIXLcc.js";import"./iframe-Dy0kVe0V.js";import"./index-BIKhx-Qu.js";import"./index-Bn05qqr6.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./Paper-Bare1qBP.js";function i(n){const o={code:"code",h1:"h1",h2:"h2",pre:"pre",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l}),`
`,e.jsx(o.h1,{id:"usedialogs",children:"useDialogs"}),`
`,e.jsx(r,{doc:{name:"useDialogs",args:[{name:"Component",type:"DialogComponent<P, R>",desc:"dialog组件 props参数需要实现DialogProps",required:1},{name:"mergePayload",type:"M",desc:"传入dialog组件props.payload中 浅合并"}],desc:"同步写法方式调用对话框hook",temp:[["P={}",null],["R=undefined",null],["M=Partial<P>",null]]}}),`
`,e.jsx(o.h1,{id:"dialogprops",children:"DialogProps"}),`
`,e.jsx(r,{doc:{name:"DialogProps",args:[{name:"payload",type:"P",desc:"组件自定义使用参数",required:1},{name:"open",type:"boolean",desc:"控制组件是否显示",required:1},{name:"resolve",type:"(result?: R) => void",desc:`promise.resolve方式关闭对话框
result:传入关闭对话框 promise.resolve结果`,required:1},{name:"reject",type:"(result?: any) => void",desc:`promise.reject方式关闭对话框
result:传入关闭对话框  promise.reject结果`,required:1}],desc:"自定义组件内部Props",temp:[["P=undefined","组件payload类型"],["R=void","组件关闭时获取的值类型"]]}}),`
`,e.jsx(o.h1,{id:"provider",children:"Provider"}),`
`,e.jsx(r,{doc:{name:"DialogProviderProps",args:[{name:"children",type:"ReactNode",desc:""},{name:"domRoot",type:"HTMLElement",desc:""},{name:"unmountAfter",type:"number",desc:"关闭后组件卸载时间ms 给关闭动画使用",default:"1000"}],desc:""}}),`
`,e.jsx(o.h1,{id:"使用",children:"使用"}),`
`,e.jsx(o.h2,{id:"1提供provider",children:"1.提供Provider"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`// 顶层使用DialogsProvider包裹
function App() {
    return <DialogsProvider><SomePage/></DialogsProvider>
}
`})}),`
`,e.jsx(o.h2,{id:"2自定义对话框",children:"2.自定义对话框"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`interface ConfirmDialogPayload{
    title: string;
}
interface ConfirmDialogProps extends DialogProps<ConfirmDialogPayload, boolean> { }
function ConfirmDialog({ open, payload, resolve, reject }: ConfirmDialogProps) {
    // 调用resolve或reject才能关闭
    return open ? <div>标题:{payload.title}
        <button onClick={() => { resolve() }}>关闭</button>
    </div> : null
}
`})}),`
`,e.jsx(o.h2,{id:"3使用hook",children:"3.使用hook"}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-tsx",children:`const SomePage = () => {
    //  传入Dialog组件
    const dialog = useDialogs(ConfirmDialog)
    const onClick = async () => {
        try {
            // 同步方式打开对话框等待ConfirmDialog的resolve执行结果
            const res = await dialog.open()
            // 获得resolve传入的结果
            console.log(res);
        } catch (error) {

        }
    }
    return <Button onClick={onClick}>对话框</Button>
}
`})}),`
`,e.jsx(o.h1,{id:"使用示例",children:"使用示例"}),`
`,e.jsx(t,{})]})}function v(n={}){const{wrapper:o}={...s(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(i,{...n})}):i(n)}export{v as default};
