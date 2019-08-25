import yargs from 'yargs'
import serve, { Options, Argv } from './serve'

yargs
  .strict(true)
  .scriptName('estatic')
  .usage('$0 [dir]')
  .alias('help', 'h')
  .alias('version', 'v')
  .wrap(null)
  .fail((msg: string, err: Error): void => {
    yargs.showHelp()
    console.log()
    if (err) console.error(msg)
    process.exit(1)
  })
  .command<Options>(
    '$0 [dir]',
    '启动静态文件服务器',
    (yargs: yargs.Argv): yargs.Argv<Options> => {
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
    (argv: yargs.Arguments<Argv>): Promise<void> => serve(argv)
  )
  .parse(process.argv.slice(2))
