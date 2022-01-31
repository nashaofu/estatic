import yargs from 'yargs';
import serve, { Options } from './serve';

yargs
  .strict(true)
  .scriptName('estatic')
  .usage('$0 [dir]')
  .alias('help', 'h')
  .alias('version', 'v')
  .locale('en')
  .wrap(null)
  .fail((msg: string, err: Error): void => {
    yargs.showHelp();
    /* eslint-disable no-console */
    console.log();
    if (err) {
      console.error(msg);
    }
    /* eslint-enable no-console */
    process.exit(1);
  })
  /* eslint-disable @typescript-eslint/indent */
  .command<Options>(
    '$0 [dir]',
    'Start a static server',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (yargs: yargs.Argv): yargs.Argv<Options> => yargs
        .positional('dir', {
          type: 'string',
          default: '.',
          describe: 'Static folder directory',
        })
        .option('port', {
          alias: 'p',
          type: 'number',
          default: 8080,
          requiresArg: true,
          describe: 'Server port number',
        })
        .option('base', {
          alias: 'b',
          type: 'string',
          default: '/',
          requiresArg: true,
          describe: 'Basic routing address',
        })
        .option('open', {
          alias: 'o',
          type: 'boolean',
          default: false,
          describe: 'Open browser automatically',
        })
        .option('cors', {
          alias: 'c',
          type: 'string',
          requiresArg: true,
          describe: 'CORS access control allow origin',
        }),
    (argv: yargs.Arguments<Options>): Promise<void> => serve(argv),
  )
  /* eslint-enable @typescript-eslint/indent */
  .parse(process.argv.slice(2));
