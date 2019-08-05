import yargs from 'yargs'
import express from 'express'
import detect from 'detect-port'
import serveIndex from 'serve-index'

interface Argv {
  _: string[]
  dir: string
  port?: number
  open?: boolean
}

async function serve(argv: Argv): Promise<any> {
  function listen(port: number) {
    return new Promise((resolve, reject) => {
      try {
        app.listen(port, () => {
          resolve()
        })
      } catch (e) {
        reject(e)
        console.log(e)
      }
    })
  }
  const app = express()
  const root = argv.dir

  app.use(express.static(root), serveIndex(root, { icons: true, hidden: true }))

  const port = await detect(argv.port || 8080)
  await listen(port)
  console.log(port)
}

yargs
  .strict(true)
  .scriptName('estatic')
  .usage('$0 [dir]')
  .alias('help', 'h')
  .alias('version', 'v')
  .wrap(null)
  .fail((msg: string, err: Error) => {
    yargs.showHelp()
    console.log()
    if (err) console.error(msg)
    process.exit(1)
  })
  .command(
    '$0 [dir]',
    '启动静态文件服务器',
    (yargs: yargs.Argv): void => {
      yargs
        .positional('dir', {
          type: 'string',
          default: '.',
          describe: '静态文件夹目录'
        })
        .option('port', {
          alias: 'p',
          type: 'number',
          default: 8080,
          requiresArg: true,
          describe: '设置服务器端口号'
        })
        .option('open', {
          alias: 'o',
          type: 'boolean',
          default: false,
          describe: '是否自动打开浏览器'
        })
    },
    (argv: yargs.Arguments<Argv>) => {
      console.log('dsds', argv)
    }
  )
  .parse(process.argv.slice(2))
