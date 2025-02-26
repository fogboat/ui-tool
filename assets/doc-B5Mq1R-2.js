import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{useMDXComponents as s}from"./index-DwOlTBOG.js";import{M as r,C as c}from"./index-B-5gzmRM.js";import d from"./stories-BkW9r09S.js";import{A as t}from"./index-DvaquUY_.js";import"./index-2yJIXLcc.js";import"./iframe-Cp87AP1v.js";import"./index-BIKhx-Qu.js";import"./index-Bn05qqr6.js";import"./index-CXQShRbs.js";import"./index-DrFu-skq.js";import"./Paper-B5SP4AOm.js";function i(n){const o={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(o.h1,{id:"介绍",children:"介绍"}),`
`,e.jsx(o.p,{children:"实现NoticeProps的组件集成任意UI组件库并且消息通知可以在非hook中直接调用"}),`
`,e.jsx(o.h1,{id:"notifier",children:"Notifier"}),`
`,e.jsx(o.p,{children:e.jsx(o.code,{children:"new Notifier(component, options?:NotifierOptions)"})}),`
`,e.jsx(o.p,{children:"component组件props需要继承NoticeProps"}),`
`,e.jsx(o.h2,{id:"noticeprops",children:"NoticeProps"}),`
`,e.jsx(t,{doc:{name:"NoticeProps",args:[{name:"payload",type:"P",desc:"组件自定义使用参数"},{name:"index",type:"number",desc:"组件索引",required:1},{name:"open",type:"boolean",desc:"控制组件是否显示",required:1},{name:"message",type:"React.ReactNode",desc:"消息"},{name:"onClose",type:"() => void",desc:"关闭对话框",required:1}],desc:"自定义组件需要实现的Props",temp:[["P=undefined","组件payload类型"]]}}),`
`,e.jsx(o.h2,{id:"notifieroptions",children:"NotifierOptions"}),`
`,e.jsx(t,{doc:{name:"NotifierOptions",args:[{name:"unmountAfter",type:"number",desc:"关闭后组件卸载时间ms 给关闭动画使用",default:"200"},{name:"component",type:"NoticeComponent<P>",desc:"消息通知组件 实现NoticeProps",required:1},{name:"time",type:"number",desc:"自动关闭时间ms 小于0不会关闭",default:"3000"},{name:"maxSize",type:"number",desc:"同时展示信息最大值 小于0不限制",default:"5"}],desc:"Notifier options配置"}}),`
`,e.jsx(o.h2,{id:"notifiernotice方法",children:"Notifier.notice方法"}),`
`,e.jsx(o.p,{children:e.jsx(o.code,{children:"new Notifier().notice(message?: React.ReactNode, payload?: P, options?: NotifyItemOptions):string"})}),`
`,e.jsx(t,{doc:{name:"NotifyItemOptions",args:[{name:"time",type:"number",desc:"自动关闭时间ms 小于0不会关闭",default:"3000"}],desc:"单个消息组件配置"}}),`
`,e.jsx(o.h3,{id:"notificationsprops",children:"NotificationsProps"}),`
`,e.jsx(t,{doc:{name:"NotificationsProps",args:[{name:"notifier",type:"Notifier<P>",desc:"传入Notifier实例",required:1}],desc:"消息通知组件展示位置",temp:[["","自定义组件参数类型"]]}}),`
`,e.jsx(o.h1,{id:"使用示例",children:"使用示例"}),`
`,e.jsx(c,{})]})}function g(n={}){const{wrapper:o}={...s(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(i,{...n})}):i(n)}export{g as default};
