import colors from 'colors';
import cors from 'cors';
import detect from 'detect-port';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import open from 'open';
import os from 'os';
import serveIndex from 'serve-index';
import yargs from 'yargs';

/**
 * 获取局域网ip
 */
function getIPv4urls(port: number, base: string): string[] {
  const ifaces = Object.values(os.networkInterfaces());
  return ifaces.reduce((ipv4Urls: string[], value = []): string[] => {
    value.forEach((iface: os.NetworkInterfaceInfo): void => {
      if (iface.family === 'IPv4' && iface.address !== '127.0.0.1') {
        ipv4Urls.push(`http://${iface.address}:${port}${base}`);
      }
    });
    return ipv4Urls;
  }, []);
}

function noop(req: Request, res: Response, next: NextFunction): void {
  return next();
}

export interface Options {
  dir: string
  port: number
  base: string
  open: boolean
  cors?: string
}

export default async (argv: yargs.Arguments<Options>): Promise<void> => {
  const app = express();
  const port = await detect(argv.port || 8080);
  const base = `/${argv.base.replace(/^\/+|\/+$/g, '')}`;

  app.use(morgan('combined'));

  app.use(
    base,
    argv.cors ? cors({ origin: argv.cors }) : noop,
    express.static(argv.dir, { dotfiles: 'allow' }),
    serveIndex(argv.dir, { icons: true, hidden: true }),
  );

  app.listen(port, (): void => {
    const url = `http://127.0.0.1:${port}${base}`;
    const ipv4Urls = getIPv4urls(port, base);

    /* eslint-disable no-console */
    console.log(`\n${colors.bgBlue.black(' I ')} Server running on: ${url}\n`);

    if (ipv4Urls.length) {
      console.log(`${colors.bgWhite.black(' N ')} You can also visit it by:`);
      console.log(`\n${ipv4Urls.map((ipv4Url) => `    ${ipv4Url}`).join('\n')}\n`);
    }
    /* eslint-enable no-console */

    if (argv.open) {
      open(url);
    }
  });
};
