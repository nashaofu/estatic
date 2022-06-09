# estatic

A express static file server for CLI

## usage

```bash
estatic [dir]

Positionals:
  dir  Static folder directory  [string] [default: "."]

Options:
  -h, --help      Show help  [boolean]
  -v, --version   Show version number  [boolean]
  -p, --port      Server port number  [number] [default: 8080]
  -b, --base      Basic routing address  [string] [default: "/"]
  -o, --open      Open browser automatically  [boolean] [default: false]
  -s, --silent    Suppress log messages from output  [boolean] [default: false]
  -c, --cors      Enable CORS via the "Access-Control-Allow-Origin" header  [string]
      --username  Username for basic authentication  [string]
      --password  Password for basic authentication  [string]
```
