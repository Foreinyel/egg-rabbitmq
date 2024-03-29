# egg-rabbitmq

<!-- [![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-rabbitmq.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@hemyn/egg-rabbitmq
[travis-image]: https://img.shields.io/travis/eggjs/egg-rabbitmq.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-rabbitmq
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-rabbitmq.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-rabbitmq?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-rabbitmq.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-rabbitmq
[snyk-image]: https://snyk.io/test/npm/egg-rabbitmq/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-rabbitmq
[download-image]: https://img.shields.io/npm/dm/@hemyn/egg-rabbitmq.svg?style=flat-square
[download-url]: https://npmjs.org/package/@hemyn/egg-rabbitmq -->

<!--
Description here.
-->

## Install

```bash
$ npm i @hemyn/egg-rabbitmq --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.rabbitmq = {
  enable: true,
  package: '@hemyn/egg-rabbitmq',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.rabbitmq = {
  address: "amqp://localhost:5672",
  queues: [
    {
      queue: "log1",
      queueOption: {
        durable: true,
      },
      exchange: "logs",
      exchangeOption: {
        type: "fanout",
        durable: true,
      },
      consumer: "",
      consumerOption: {},
    },
    {
      queue: "log2",
      queueOption: {
        durable: true,
      },
      exchange: "logs",
      exchangeOption: {
        type: "fanout",
        durable: true,
      },
      consumer: "",
      consumerOption: {},
    },
  ],
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/Foreinyel/egg-rabbitmq/issues).

## License

[MIT](LICENSE)
