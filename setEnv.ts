import {execSync} from 'child_process';
import {copyFile} from 'fs';
import {resolve} from 'path';
const argv = process.argv;
const ev = argv.filter(item=>item.startsWith('--'));
let webpackEv = '';
let tscEv = '';
const evm = new Map();
for (const tag of ev) {
  const tagIndex = argv.findIndex(item=>item===tag);
  evm.set(tag,tagIndex);
}
for (const tagKey of evm.keys()) {
  Reflect.set(process.env,(tagKey as string).slice(2),Reflect.get(argv,evm.get(tagKey)+1))
}
for (const index in argv) {
  if(argv[index].startsWith('-webpack')){
    webpackEv += `--${argv[index].split('_')[1]} ${Reflect.get(argv,Number(index)+1)} `
  }
  if(argv[index].startsWith('-tsc')){
    tscEv += `${Reflect.get(argv,Number(index)+1)} `
  }
}
if(webpackEv){
  execSync(`npx webpack ${webpackEv}`);
  copyFile(resolve(__dirname,`./dist/${process.env.filename}`),resolve(__dirname,`./${process.env.filename}`),(err)=>{
    if(err)throw err;
    process.platform==="win32"&&execSync('rm -rf ./dist',{shell:'D:\\Git\\bin\\bash.exe'})
    process.platform==="linux"&&execSync('rm -rf dist')
    execSync(`ts-node ./gen.ts --name ${process.env.filename!.split('.')[0]}`)
  })
}
if(tscEv){
  execSync(`npx tsc ${tscEv}`);
  execSync(`ts-node ./gen.ts --name ${process.env.filename!.split('.')[0]}`);
}
