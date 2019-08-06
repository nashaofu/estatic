import os from 'os'
import yargs from 'yargs'
import chalk from 'chalk'
import express from 'express'
import detect from 'detect-port'
import serveIndex from 'serve-index'

/**
 * 获取局域网ip
 */
function getIPv4URL(port: number, base: string): string[] {
  const ifaces = os.networkInterfaces()
  return Object.keys(ifaces).reduce((ips: string[], key) => {
    ifaces[key].forEach(iface => {
      if (iface.family === 'IPv4') {
        ips.push(`http://${iface.address}:${port}/${base}`)
      }
    })
    return ips
  }, [])
}

export interface IOptions {
  dir: string
  port: number
  base: string
  open: boolean
}

export interface IArgv extends IOptions {
  _: string[]
}

export default async (argv: IArgv): Promise<any> => {
  const app = express()
  const port = await detect(argv.port || 8080)
  const base = argv.base.replace(/^\/+|\/+$/g, '')

  app.use(`/${base}`, express.static(argv.dir), serveIndex(argv.dir, { icons: true, hidden: true }))

  app.listen(port, () => {
    const url = `http://localhost:${port}/${base}`
    const ipv4 = getIPv4URL(port, base)
      .map(url => `    ${url}`)
      .join('\n')

    console.log(`\n${chalk.bgBlue.black('', 'I', '')} Your app running on: ${url}\n`)
    console.log(`${chalk.bgWhite.black('', 'N', '')} You can also access it using the following address:`)
    console.log(`\n${ipv4}\n`)
  })
}
