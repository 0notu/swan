const http = require('http');
const path = require('path');

const net = require(path.resolve('./src/net.js'));
const data = require(path.resolve('./src/data.js'));

module.exports.Duck = require(path.resolve('./src/duck.js'))
module.exports.Server = class {
  constructor (api, port = 80, pages_file) {
    this.pages_file = pages_file;
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
        let output = this.api[req.endpoint] ? JSON.stringify(await this.api.handle(content)) : res.end(404)
        res.end(output)
      })
    } else {
      net.set(req).then((url) => {
        this.serve(res, url)
      })
    }
  }
}