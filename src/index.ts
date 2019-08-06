import yargs from 'yargs'
import serve, { IOptions } from './serve'

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
  .command<IOptions>(
    '$0 [dir]',
    '启动静态文件服务器',
    yargs => {
      return yargs
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
        .option('base', {
          alias: 'b',
          type: 'string',
          default: '/',
          requiresArg: true,
          describe: '基础路由地址'
        })
        .option('open', {
          alias: 'o',
          type: 'boolean',
          default: false,
          describe: '是否自动打开浏览器'
        })
    },
    argv => serve(argv)
  )
  .parse(process.argv.slice(2))
