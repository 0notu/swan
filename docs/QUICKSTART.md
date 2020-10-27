## Quick Start

Install swan via npm;
```
npm i swan.js
```

First, require Swan in your project;
```js
const swan = require('swan.js');
```

Then, run the server with or without an [api](API.md);
```js
new Swan.Server(api/*default is null*/, port/*default is set to 80*/)
```
