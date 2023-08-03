#! /usr/bin/env ts-node
import {execSync} from 'child_process';
import {copyFile} from 'fs';
import {resolve} from 'path';
const isWindows = process.platform === 'win32';
const isLinux = process.platform === 'linux';
const PowerShell = 'C:\\WINDOWS\\syswow64\\WindowsPowerShell\\v1.0\\powershell.exe';
const exeName = process.argv[Number(process.argv.findIndex(item=>item==='--name'))+1];
execSync(`node --experimental-sea-config sea-${exeName}.json`);
isWindows&&execSync(`cp (Get-Command node).Source ${exeName}.exe`,{shell:PowerShell});
isLinux&&execSync(`cp $(command -v node) ${exeName}`);
isWindows&&execSync(`signtool remove /s ${exeName}.exe`,{shell:PowerShell});
isWindows&&execSync(`npx postject ${exeName}.exe NODE_SEA_BLOB ${exeName}.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`,{shell:PowerShell});
isLinux&&execSync(`npx postject ${exeName} NODE_SEA_BLOB ${exeName}.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2`);
copyFile(resolve(__dirname,`${exeName}${isWindows?'.exe':''}`),resolve(__dirname,`./bin/${exeName}${isWindows?'.exe':''}`),(err)=>{
  if (err) throw err;
  isWindows&&execSync(`rm -rf ./${exeName}.exe`,{shell:'D:\\Git\\bin\\bash.exe'})
  isLinux&&execSync(`rm -rf ${exeName}`)
  switch (process.platform) {
    case "win32":
      execSync(`rm -rf ${process.env.filename} ${process.env.filename!.split('.')[0]}.blob`,{shell:'D:\\Git\\bin\\bash.exe'});
      break;
    case "linux":
      execSync(`rm -rf ${process.env.filename} ${process.env.filename!.split('.')[0]}.blob`);
      break;
    default:
      break;
  }
})