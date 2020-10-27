## API

Swan supports using Duck, a pre-written rate-limiter and organizational tool, but if you live on the edge, Swan allows you to write your own api.

##### Basics
API endpoints are structured as such; the API object that is passed contains **Function** endpoints.
```js
{
    "square": (content) => {
        return content.number*content.number
    }
}
```
Each endpoint's key is the name of the endpoint, and the value is the function called. Content is passed, which is the body of the API request.

Because you control the client's request, content will be specific to your needs.


##### Connecting to external APIs
Connecting to external APIs may seem duanting, so we've attached a sample function to do just that. This isn't native to Swan, but is possible to add to your API file.

```js
async externalAPI(content, endpoint="", method="POST", ) {
    return await new Promise((resolve, reject) => {
        http.request({
            hostname: api.host,
            port: api.port,
            path: "/"+endpoint,
            method: method,
            headers: {'Content-Type': 'application/json'}
        },
            async (res) => resolve(await (net.collect(res)))
        ).end(content);
    })
}
```