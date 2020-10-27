const http = require('http');

const net = require('./net.js');
const data = require('./data.js');

module.exports.Duck = require('./duck.js')
module.exports.Server = class {
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
  async externalAPI(content, endpoint="", method="POST", ) {
    return await new Promise((resolve, reject) => {
      //console.log(content)
      http.request({
        hostname: this.api.host,
        port: this.api.port,
        path: "/"+endpoint,
        method: method,
        headers: {'Content-Type': 'application/json'}
        },
        async (res) => resolve(await (net.collect(res)))
        ).end(content);
    })
  }
  async handle(req, res) {
    let data = req.url.split("/");
    if (data[1] == "api") { // proxying api requests through webserver
      net.collect(req).then(async (content) => {
        let output;
        try {
          output = JSON.stringify(
            await this.api.endpoints[req.endpoint](content)
          )
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