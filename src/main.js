const http = require('http');

const api = require('./api.js');
const net = require('./net.js');
const data = require('./data.js');
//const s = require("Swan").Server
module.exports.Server = class {
  constructor (secret) {
    this.net = net
    this.data = data
    this.api = api

    this.server = http.createServer((req, res) => this.handle(req, res));
    this.server.listen(secret.port)
  }

  async serve(res, url) {
    let c;
    try {
      c = await this.data.find_asset(url);
    } catch { // not found
      c = await this.data.find_asset("404/index.html");
    } finally {
      res.writeHead(200, {'Content-Type': c["type"]})
      res.end(c["file"])
    }
  }

  handle(req, res) {
    let data = req.url.split("/");
    if (data[1] == "api") { // proxying api requests through webserver
      this.net.collect(req).then((content) => {
        res.end(JSON.stringify(api[content.method].run(content)))
      })
    } else {
      this.net.set(req).then((url) => {
        this.serve(res, url)
      })
    }
  }
}