'use strict'

const http = require('http');
const pug = require('pug');
const server = http.createServer((req, res) => {

console.info('Requested by ' + req.connection.remoteAddress);
res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'        
    });
    
    switch (req.method) {
        case 'GET':
            if (req.url === '/enquetes/yaki-shabu') {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: '焼き肉',
                    secondItem: 'しゃぶしゃぶ'
                }));
            } else if (req.url === '/enquetes/rice-bread') {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: 'ごはん',
                    secondItem: 'パン'
                }));
            } else if (req.url == '/enquetes/shushi-pizza') {
                res.write(pug.renderFile('./form.pug', {
                    path: req.url,
                    firstItem: '🍣',
                    secondItem: '🍕'
                }));
            }
            res.end();
            break;
        case 'POST':            
            let body = [];
            req.on('data', (chunk) => {
                body.push(chunk);                
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                const decoded = decodeURIComponent(body);
                console.info('投稿: ' + decoded);
                res.write('<!DOCTYPE html><html lang="ja"><body><h1>' + 
                    decoded + 'が投稿されました</h1></body></html>');
                res.end();
            });            
            break;
        default:
            break;        
    } 
}).on('error', (e) => {
    console.error('Server Error', e);
}).on('clientError', (e) => {
    console.error('Client Error', e);
});
const port = process.env.PORT || 8000;
server.listen(port, () => {    
    console.info(`Listening on ${port}`);
});