import { Plugin } from 'vite';
import { getDesc } from './args';

const name = "auto-args"
// 解析注释内容

export default (): Plugin => ({
  name,
  configResolved(config) {
    const selfIdx = config.plugins.findIndex((item) => item.name === name)
    // @ts-ignore
    const [self] = config.plugins.splice(selfIdx, 1)
    const idx = config.plugins.findIndex(({ name }) => name === "alias")
    // @ts-ignore
    config.plugins.splice(idx + 1, 0, self)
  },
  enforce: 'pre',
  async transform(code, id) {
    if (!id.match(/\.(mdx)$/)) return;
    const argRegex = /<ArgTable\s+path=["']([^"']+)["']\s+type=["']([^"']+)["']\s*\/?>/g
    let transformedCode = code
    let match: RegExpExecArray | null

    while ((match = argRegex.exec(code)) !== null) {
      const [fullTag, modulePath, typeName] = match

      const resolvedPath = (await this.resolve(modulePath, id))!.id

      const jsonData = await getDesc(resolvedPath, typeName)

      transformedCode = transformedCode.replace(
        fullTag,
        `<ArgTable doc={${JSON.stringify(jsonData)}} />`
      )
    }
    return { code: transformedCode }

  }
});


