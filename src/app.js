const http = require('http');
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const route = require('./heper/route')

const server = http.createServer( (req, res) => {

    const filePath = path.join(conf.root, req.url);
    route(req, res, filePath);


    
})

server.listen(conf.port, conf.hostname)
