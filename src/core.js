const http = require('http');

const net = require('./net.js');
const data = require('./data.js');

module.exports.APIServer = require('./duck.js')
module.exports.WebServer = require("./swan.js")