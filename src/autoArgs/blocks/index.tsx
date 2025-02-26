import s from "./index.module.css";
type TypeParam = [string, string]
export interface Doc {
    name?: string
    desc: string
    args: ArgItem[],
    param?: TypeParam[]
    temp?: TypeParam[]
}
export interface ArgItem {
    name: string
    type?: string
    desc?: string
    required?: 1
    default?: string
    param?: TypeParam[]
    temp?: TypeParam[]
}
function ArgParam({ list }: { list?: TypeParam[] }) {
    if (!list) {
        return null
    }
    return (<ul>
        {list.map(i => (<li><span className={s["tempType"]}>{i[0]}</span>{i[1]}</li>))}
    </ul>)
}
function ArgsTable({ doc }: { doc: Doc }) {
    console.log(doc, 23);

    return <div>
        {doc.desc}
        <ArgParam list={doc.temp} />
        <table className={s["table"]}>
            <tbody>
                <tr>
                    <td>参数</td>
                    <td>类型</td>
                    <td>默认值</td>
                    <td>说明</td>
                </tr>
                {doc.args.map((arg) => (
                    <tr key={arg.name}>
                        <td>{arg.name}{arg.required ? <span className={s["required"]}>*</span> : null}</td>
                        <td>{arg.type}</td>
                        <td>{arg.default||"-"}</td>
                        <td className={s["pre"]}>{arg.desc || '-'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}
export default ArgsTable
