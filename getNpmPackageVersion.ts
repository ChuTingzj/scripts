#! /usr/bin/env ts-node
import dayjs from 'dayjs';
import {argv} from 'process';
import {red,green} from './utils/colors';
enum Origin{
  'npm'='https://registry.npmjs.org/',
  'taobao' = 'https://registry.npmmirror.com/',
}
interface Response {
  'dist-tags':{
    latest:string
  }
  name:string
}

const PACKAGE_NAME = 'typescript';
const ORIGIN:Origin = Origin.taobao;
const packageIndex = argv.findIndex(item=>item==='--package');
const packageName = packageIndex>0?argv[packageIndex+1]:PACKAGE_NAME;
const originIndex = argv.findIndex(item=>item==='--origin');
const originName = originIndex>0?argv[originIndex+1]:ORIGIN;
(function getNpmPackageVersion(){
  setTimeout(async ()=>{
    let time:string|undefined
    const res = await fetch(`${originName}${packageName}`)
    time = dayjs(+new Date()).format('YYYY-MM-DD HH:mm:ss')
    const data:Awaited<Response> = await res.json()
    console.log(green(time,'bold'),red(data.name,'bold'),red(data['dist-tags'].latest))
    getNpmPackageVersion()
  },2000)
})()
