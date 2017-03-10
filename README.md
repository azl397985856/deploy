## Introduction
deploy your project easily.
## Install

```bash
npm i deploy-fast -g
```

## Usage example

``` bash
deploy  deploy_env [-C || --config] config_file

```
config_file example:

```javascript
  {
    test: {
      host: 'http://127.0.0.1',
      ...
    },
    pro: {

    },
    ...
  }
```
deploy_env should be put into config_file first. for example, you can type deploy test or deploy pro now.

deploy_env example:
- __host:__        FTP host,     default is localhost
- __username:__        FTP user,     default is anonymous
- __password:__  FTP password, default is anonymous@
- __port:__        FTP port,     default is 21
- __remoteDir:__        destination
- __path:__        local path(regex supported)
- __base:__        local base location
- __log:__         Log function, default is null
- __timeOffset:__  Offset server time by this number of minutes, default is 0
- __parallel:__    Number of parallel transfers, default is 3
- __maxConnections:__ Maximum number of connections, should be greater or

## API

``` bash

deploy --help

```

## Contributing

We welcome all contributions, please submit any ideas as [pull requests](https://github.com/azl397985856/deploy/pulls) or as a [GitHub issue](https://github.com/azl397985856/deploy/issues).
## Licence
MIT
