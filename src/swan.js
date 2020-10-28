const http = require('http');
const net = require('./net.js');
const data = require('./data.js');

module.exports = class {
    constructor (api = null, port = 80) {
      this.api = api;
      this.server = http.createServer((req, res) => this.handle(req, res));
      this.server.listen(port);
    }
  
    async serve(res, url) {
      let c;
      try {
        c = await data.find_asset(url);
      } catch { // not found
        c = await data.find_asset("404/index.html");
      } finally {
        res.writeHead(200, {'Content-Type': c.type})
        res.end(c.file)
      }
    }
  
    async externalAPI(reqString, endpoint="", method="POST", ) {
      return await new Promise((resolve, reject) => {
          http.request({
              hostname: this.api.hostname,
              port: this.api.port,
              path: "/"+endpoint,
              method: method,
              headers: {'Content-Type': 'application/json'}
          },
              async (res) => resolve(await (net.collect(res)))
          ).end(reqString);
      })
  }
  
    async handle(req, res) {
      let data = req.url.split("/");
      if (data[1] == "api") { // proxying api requests through various sorts of webservers
        net.collect(req).then(async (reqObj) => {
          let output;
          try {
            if (this.api.duck) output = JSON.stringify(await this.api.apiHandle(reqObj)) //local duck server
            else if (this.api.web) output = await this.externalAPI(JSON.stringify(reqObj)) //external server
            else output = JSON.stringify(await this.api[reqObj.method](reqObj.content)) //local custom server
          } catch (e) {
            console.log("[!] ",e)
            output = 401
          }
          res.end(output)
        })
      } else {
        net.set(req).then((url) => {
          this.serve(res, url)
        })
      }
    }
  }