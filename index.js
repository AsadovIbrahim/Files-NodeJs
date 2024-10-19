const fs=require("fs");
const url = require('url');
const http=require('http');
const writeStream=fs.createWriteStream("file2.txt");
 
const PORT=3000;
 
 
const items=[1,2,3];
 
const server=http.createServer((req,res)=>{
    if(req.method==="GET") {
        const urlParts = req.url.split('/');
   
        if (urlParts[1] === 'products' && urlParts[2]) {
            const productId = parseInt(urlParts[2],10);
            const item=items[productId-1];
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ item }));
        }
        else
        {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not found');
            writeStream.write(`Not found,${new Date().toISOString()}\n`)
        }
    }
})
 
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});