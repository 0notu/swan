## API

Swan includes a heavily customizable API server sub-framework, but if you live on the edge Swan also allows you to set up an API without automatic token features or its own port. You can also set up Swan API servers without a web server.

##### API Framework

Here's an example of a Swan API server:
```js
let tokenAPI = async (context, token) => {
    //context is an object that all of your endpoints can access
    //token is an auth object/string/emaciated mongoose that you can use to give a user-specific API set
    let user;
    if (token=="notU" || token=="LaughableStack") {
        user = {level: 100}
    } else {
        user = {level: 1}
    }
    return {
        //Make sure your endpoints are async
        "levelDifference": async (content) => {
            return Math.abs(user.level - content.targetLevel)
        }
    }
}
let anonAPI = async(context) => {
    //The anonAPI doesn't require a token, so requests lacking one will be sent to it.
    // You can still do initialization that's necessary for all endpoints.
    return {
        "exponentiation": async (content) => {
            return Math.pow(content.value1, content.value2)
        }
    }
}
let APIServer = new swan.API(
tokenAPI, 
anonAPI, 
port = -1, //Set port to -1 to disable hosting.
)
//There are other parameters we can set, but they're more niche.
//To use it with a Swan web server:
webServer = new swan.Server(duckAPI)
```

##### Raw-Object API
API endpoints are structured like so: the API object that is passed contains **Function** endpoints. These functions *must* be async.
```js
{
    "square": async (content) => {
        return content.number*content.number
    }
}
```
Each endpoint's key is the name of the endpoint, and the value is the function called. Content is passed, which is the body of the API request.

Because you control the client's request, content will be specific to your needs.


##### Connecting to external APIs
Connecting to external APIs can seem daunting, so we've included integrated support. You can pass a set of parameters as the API object to connect with remote Duck servers across the internet. Here's the format:
```js
{
    web: true,
    hostname: "<HOST>",
    port: <PORT>
}
```
The Swan Webserver will simply relay any JSON requests sent to it.
