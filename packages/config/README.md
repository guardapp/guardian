# `@guardapp/config`

Centralize of configuration sources

## Usage

```javascript
// VALUE=myvalue node index.js
const {init} = require('config');

const config = await init();

console.log(config.VALUE); // 'myvalue'
console.log(config.NOT_FOUND); // undefined
```

## Sources

this package get config values from different sources,
it will merge the values and not override them as the following order:
- process.env
- .env
