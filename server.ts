import {createServer} from 'node:http';
import {Server} from 'ws';
import {resolve} from 'node:path';
import {readFile} from 'fs/promises';
import {argv} from 'node:process';
import chalk from 'chalk';
import {loadEnv} from './utils/loadEnv';
const server = createServer();
const ws = new Server({server})
const portIndex = argv.findIndex(arg => arg === '--port');
const port = portIndex === -1 ? 8000 : argv[portIndex+1];
let contents:string;
(async ()=>{
  contents = await readFile(resolve(__dirname, './static/index.html'),{
    encoding:'utf8'
  });
  await loadEnv()
  const {createChatCompletion,createCompletion} = await import('./utils/gpt')
  ws.on('connection',(ws)=>{
    ws.on('message', (msg)=>{
      createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:[{role:'user',content:msg.toString()}],
      },(response)=>{
        ws.send(response?.content ?? '');
      },(message)=>{
        ws.send(message)
      })
    })
    ws.on('close',()=>{
      console.log('close');
    })
    ws.on('error',(err)=>{
      console.log(chalk.red.bold('error'),chalk.red(err));
    })
  })
})()
server.on('request', async (request, res) => {
  console.log(request.url);
  if(Number.isInteger(Number(request.url?.slice(1,2)))){
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    try {
      const contents = await readFile(resolve(__dirname, `static/${request.url?.slice(1,2) || 1}.jpg`))
      res.end(contents);
    } catch (error) {
      res.end(contents);
    }
    return
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(contents);
});
server.on('clientError',(err,socket)=>{
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
  console.log(chalk.red.bold('clientError'),chalk.red(err));
})
server.listen(port);
console.log(chalk.green.bold('server is running at'),chalk.green(`http://localhost:${port}`));