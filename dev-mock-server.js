const http = require('http');

const path = require('path');
const fs = require('fs');
const url = require('url')


const server = http.createServer((req, res) => {
    // console.log(req.url);
    // if (req.url.indexOf('/holdon.ajax') >= 0) {
    //     res.writeHead(200, { 
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Credentials': true,
    //         'Set-Cookie': '__token=asdfasdf;domain=localhost:8080;'
    //     });
    //     setTimeout(function () {
    //         res.end(JSON.stringify({code: 200, data:{aaa:1}}));
    //     },  1000)
    //     return;
    // }
    const mockPath = path.join(__dirname, 'mock', url.parse(req.url).pathname.replace(/.ajax$/i, '.json'));
    if (fs.existsSync(mockPath)) {
        res.writeHead(200, { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Set-Cookie': '__token=asdfasdf;domain=localhost:8080;'
        });
        // 模拟200ms的网络延迟
        setTimeout(function () {
            fs.createReadStream(mockPath, {
                autoClose: true
            }).pipe(res);
        }, 10);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write(`no mock at ${mockPath}`);
        res.end();
    }
});
server.listen(8081);