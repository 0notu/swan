const http = require('http');

const net = require('./net.js');

module.exports = class {
    constructor(
        tokenAPI, 
        anonAPI, 
        port, 
        context = {}, 
        watchdog = req => Object({accepted: true}),
        errorProcessor = error => error
    ) {
        this.context = context;
        this.tokenAPI = tokenAPI;
        this.anonAPI = anonAPI;
        this.watchdog = watchdog;
        this.duck = true;
        if (port==-1) return;
        // initialize server on port
        this.server = http.createServer((req,res) => {
            try {
                this.handle(req,res);
            }
            catch(error) {
                res.end(errorProcessor(error));
            }});
        this.server.listen(parseInt(port));
    }

    async handle(req, res) {
        let report = this.watchdog(req);
        if (!report.accepted) return res.send(report.error);
        let jsonReq = await net.collect(req)
        let result = await this.apiHandle(jsonReq)
        res.end((typeof result === 'object' && result !== null) ? JSON.stringify(result) : result.toString())
    }

    async apiHandle(data) {
        let activeAPI = data.token ? await this.tokenAPI(this.context, data.token) : await this.anonAPI(this.context);
        return await activeAPI[data.method](data.content);
    }
}