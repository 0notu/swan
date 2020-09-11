const https = require('https')

function outside_req(host, method, endpoint, content) {
    content ? content = JSON.stringify(content) : content = null;
    const config = {
        hostname: host,
        port: 443,
        path: "/"+endpoint,
        method: method,
        headers: {'Content-Type': 'application/json'}
    }

    try {
        https.request(config, (res) => {        
            let buffer = "";
            res.on('data', (d) => {
                buffer+=d
            });
            res.on('end', () => {return buffer})
        }).end(content);
    } catch(e) {
        console.log(e);
        return;
    }
}

module.exports.say_hi = {
    run: (data) => {
        let ret = {}; // intialize return object
        ret.content = "Hello World!";
        return ret; // return final object
    },
    info: {
        name: "get_twitter",
        about: "get the twitter profile of a user"
    }
}
