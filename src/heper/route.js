const conf = require('./config/defaultConfig')
const path = require('path')
const fs = require('fs')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

module.exports = async function(req, res, filePath){
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);// 流的方式读取
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join(','))
        }
    } catch (ex) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('404')
        return
    }
}