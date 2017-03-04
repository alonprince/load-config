Just like the "config" function in Laravel

## Jump Start

```javascript
const LoadConfig = require('load-config-json');
const path = require('path');
const loadConfig = new LoadConfig(path.resolve(__dirname, '../config'));
let value = loadConfig.config('JsonName.key.secondKey.ThirdKey');
console.log(value);
```