import {execSync} from 'child_process';
const argv = process.argv;
const ev = argv.filter(item=>item.startsWith('--'));
let webpackEv = '';
const evm = new Map();
for (const tag of ev) {
  const tagIndex = argv.findIndex(item=>item===tag);
  evm.set(tag,tagIndex);
}
for (const tagKey of evm.keys()) {
  Reflect.set(process.env,(tagKey as string).slice(2),Reflect.get(argv,evm.get(tagKey)+1))
}
for (const wevIndex in argv) {
  if(argv[wevIndex].startsWith('-webpack')){
    webpackEv += `--${argv[wevIndex].split('_')[1]} ${Reflect.get(argv,Number(wevIndex)+1)} `
  }
}
execSync(`npx webpack ${webpackEv} --progress --color`)
