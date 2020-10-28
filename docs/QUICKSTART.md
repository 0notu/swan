## Quick Start

First, require Swan in your project;
```js
const swan = require('swan.js');
```

Then, run the server with or without an [api](API.md);
```js
new Swan.Server(api/*default is null*/, port/*default is set to 80*/)
```

#### Pages
sorting your files is ez pz!

Pages are sorted by their page name;
```
pages
|__ index
    |__ index.html
```

For example, `mydomain.com/Gecko` would be nested;
```
pages
|__ Gecko
    |__ index.html
    |__ main.css
    |__ mycoolimage.jpg
```

Everthing is of course self-set, so filename depends on how you call it in your client-side files.