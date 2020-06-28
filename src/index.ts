import yargs from 'yargs'
import serve, { Options, Argv } from './serve'

yargs
  .strict(true)
  .scriptName('estatic')
  .usage('$0 [dir]')
  .alias('help', 'h')
  .alias('version', 'v')
  .locale('en')
  .wrap(null)
  .fail((msg: string, err: Error): void => {
    yargs.showHelp()
    console.log()
    if (err) console.error(msg)
    process.exit(1)
  })
  .command<Options>(
    '$0 [dir]',
    'Start a static server',
    (yargs: yargs.Argv): yargs.Argv<Options> => {
      return yargs
        .positional('dir', {
          type: 'string',
          default: '.',
          describe: 'Static folder directory'
        })
        .option('port', {
          alias: 'p',
          type: 'number',
          default: 8080,
          requiresArg: true,
          describe: 'Server port number'
        })
        .option('base', {
          alias: 'b',
          type: 'string',
          default: '/',
          requiresArg: true,
          describe: 'Basic routing address'
        })
        .option('open', {
          alias: 'o',
          type: 'boolean',
          default: false,
          describe: 'Open browser automatically'
        })
    },
    (argv: yargs.Arguments<Argv>): Promise<void> => serve(argv)
  )
  .parse(process.argv.slice(2))
