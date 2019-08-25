import os from 'os'
import open from 'open'
import chalk from 'chalk'
import express from 'express'
import detect from 'detect-port'
import serveIndex from 'serve-index'

/**
 * 获取局域网ip
 */
function getIPv4URL (port: number, base: string): string[] {
  const ifaces = os.networkInterfaces()
  return Object.keys(ifaces).reduce((ips: string[], key): string[] => {
    ifaces[key].forEach((iface: os.NetworkInterfaceInfo): void => {
      if (iface.family === 'IPv4') {
        ips.push(`    http://${iface.address}:${port}/${base}`)
      }
    })
    return ips
  }, [])
}

export interface Options {
  dir: string
  port: number
  base: string
  open: boolean
}

export interface Argv extends Options {
  _: string[]
}

export default async (argv: Argv): Promise<void> => {
  const app = express()
  const port = await detect(argv.port || 8080)
  const base = argv.base.replace(/^\/+|\/+$/g, '')

  app.use(`/${base}`, express.static(argv.dir), serveIndex(argv.dir, { icons: true, hidden: true }))

  app.listen(port, (): void => {
    const url = `http://localhost:${port}/${base}`
    const ipv4 = getIPv4URL(port, base).join('\n')

    console.log(`\n${chalk.bgBlue.black('', 'I', '')} 服务器运行在: ${url}\n`)
    console.log(`${chalk.bgWhite.black('', 'N', '')} 你也可以通过下面的地址访问:`)
    console.log(`\n${ipv4}\n`)
    if (argv.open) open(url)
  })
}
