import {  Project, JSDocStructure, OptionalKind, StatementStructures, StructureKind } from "ts-morph";
import { ArgItem, Doc } from "./blocks";

// TODO 优化编译 类型定义
function matchParam(obj: { [key: string]: string }, str: string) {
    const match = str.match(/^\s*(?:\{([^}]*)\}\s*)?(.*)$/)
    if (match) {
        const res = match[2].trim().match(/^(\S+)\s+(.*)$/)
        if (res) {
            if (res[1]) {
                const key = res[1].match(/\[(.*?)\]/)?.[1] || res[1]
                obj[key] = res[2]
            }
        }
    }
}
// 解析jsdoc
function parseJsdoc(jsdoc?: (string | OptionalKind<JSDocStructure>)[]) {
    const first = jsdoc?.[0]
    const base: Partial<ArgItem> = {}
    const param: Record<string, string> = {}
    const obj = { base, param }
    if (first && typeof first != "string") {
        if (typeof first.description === "string") {
            base.desc = first.description.trim()
        }

        const tags = first.tags || []
        tags.forEach(i => {
            switch (i.tagName) {
                // 处理默认值
                case "default":
                    base.default = i.text as string
                    break;
                // 处理函数参数
                case "param":
                    if (i.text) {
                        matchParam(param, i.text as string)
                    }
                    break;
                case "template":
                    if (typeof i.text == "string") {

                        const [_, tagType, desc] = i.text.match(/^\s*(\S+)(?:\s+(.*?))?\s*$/) || []
                        if (tagType) {
                            if (!base.temp) {
                                base.temp = [];
                            }
                            base.temp.push([tagType?.match(/\[(.*?)\]/)?.[1] || "", desc])
                        }
                    }
                    break;

                default:
                    break;
            }
        })

    }
    return obj
}
// 解析每个参数或属性
function parseItem(item: any) {
    // 只获取第一个注释
    const obj: ArgItem = {
        name: item.name,
        type: item.type as string,
        desc: ""
    }    
    if (!item.hasQuestionToken) {
        obj.required = 1
    }
    const { base, param } = parseJsdoc(item.docs)
    Object.assign(obj, base)

    return { base: obj, param }
}



export function getDesc(filePath: string, name: string) {
    const project = new Project();
    project.addSourceFilesAtPaths(filePath);
    const sourceFile = project.getSourceFile(filePath);
    const doc: Doc = {
        name: "",
        args: [],
        desc: ''
    }
    if (sourceFile) {
        const items = sourceFile.getStructure().statements;
        debugger;
        if (items && Array.isArray(items)) {
            //@ts-ignore
            const item = items.find((i) => (i?.name === name)) as StatementStructures

            if (item) {
                // ts推导类型需要用switch 不在范围内跳出
                switch (item.kind) {
                    case StructureKind.Interface:
                    case StructureKind.Function:
                        break;
                    default:
                        return doc;
                }
                doc.name = item.name;
                const jsdoc = parseJsdoc(item.docs)
                Object.assign(doc, jsdoc.base)

                if (item.kind === StructureKind.Function) {
                    item.parameters?.forEach(e => {
                        const { base } = parseItem(e)
                        if (jsdoc.param[base.name]) {
                            base.desc = jsdoc.param[base.name]
                        }

                        doc.args.push(base)
                    })
                } else if (item.kind === StructureKind.Interface) {
                    item.properties?.forEach(e => {
                        const { base, param } = parseItem(e)
                        // 处理interface里的函数注释
                        const keys = Object.keys(param)
                        keys.forEach(i => {
                            base.desc += `\n${i}:${param[i]}`
                        })
                        doc.args.push(base)
                    });
                }



            }
        }

    }

    return doc
}