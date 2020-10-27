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