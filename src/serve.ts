import os from 'os'
import open from 'open'
import yargs from 'yargs'
import chalk from 'chalk'
import express from 'express'
import detect from 'detect-port'
import serveIndex from 'serve-index'

/**
 * 获取局域网ip
 */
function getIPv4urls (port: number, base: string): string[] {
  const ifaces = Object.values(os.networkInterfaces())
  return ifaces.reduce((ipv4Urls: string[], value = []): string[] => {
    value.forEach((iface: os.NetworkInterfaceInfo): void => {
      if (iface.family === 'IPv4' && iface.address !== '127.0.0.1') {
        ipv4Urls.push(`http://${iface.address}:${port}/${base}`)
      }
    })
    return ipv4Urls
  }, [])
}

export interface Options {
  dir: string
  port: number
  base: string
  open: boolean
}

export default async (argv: yargs.Arguments<Options>): Promise<void> => {
  const app = express()
  const port = await detect(argv.port || 8080)
  const base = argv.base.replace(/^\/+|\/+$/g, '')

  app.use(
    `/${base}`,
    express.static(argv.dir, { dotfiles: 'allow' }),
    serveIndex(argv.dir, { icons: true, hidden: true })
  )

  app.listen(port, (): void => {
    const url = `http://127.0.0.1:${port}/${base}`
    const ipv4Urls = getIPv4urls(port, base)

    console.log(`\n${chalk.bgBlue.black('', 'I', '')} Server running on: ${url}\n`)
    console.log(`${chalk.bgWhite.black('', 'N', '')} You can also visit it by:`)
    console.log(`\n${ipv4Urls.map(url => `    ${url}`).join('\n')}\n`)

    if (argv.open) open(url)
  })
}
