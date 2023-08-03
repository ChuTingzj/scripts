#! /usr/bin/env ts-node
import {execSync} from 'child_process';
const argv = process.argv;
const pwd = process.env.pwd!;
const help = `
      Usage: realesrgan-ncnn-vulkan.exe -i infile -o outfile [options]...

      -h                   show this help
      -i input-path        input image path (jpg/png/webp) or directory
      -o output-path       output image path (jpg/png/webp) or directory
      -s scale             upscale ratio (can be 2, 3, 4. default=4)
      -t tile-size         tile size (>=32/0=auto, default=0) can be 0,0,0 for multi-gpu
      -m model-path        folder path to the pre-trained models. default=models
      -n model-name        model name (default=realesr-animevideov3, can be realesr-animevideov3 | realesrgan-x4plus | realesrgan-x4plus-anime | realesrnet-x4plus)
      -g gpu-id            gpu device to use (default=auto) can be 0,1,2 for multi-gpu
      -j load:proc:save    thread count for load/proc/save (default=1:2:2) can be 1:2,2,2:2 for multi-gpu
      -x                   enable tta mode"
      -f format            output image format (jpg/png/webp, default=ext/png)
      -v                   verbose output
`
enum Model{
  'realesrgan-x4plus',
  'reaesrnet-x4plus',
  'realesrgan-x4plus-anime',
  'realesr-animevideov3'
}
interface Res{
  value:[string,string,string|undefined]
  toString:()=>string
}
const needHelp = process.argv.findIndex(item=>item==='-h')>0;
if(needHelp){
  console.log(help);
  process.exit()
}
const args = (function():Res{
  const [inputIndex,outputIndex,modelIndex] = (function ():[number,number,number]{
    const io = new Array(3);
    for (const index in argv) {
      if(argv[index as any as number]==='-i')Reflect.set(io,0,Number(index));
      if(argv[index as any as number]==='-o')Reflect.set(io,1,Number(index));
      if(argv[index as any as number]==='-n')Reflect.set(io,2,Number(index));
    }
    return io as [number,number,number];
  })();
  let inputPath = Reflect.get(argv,inputIndex+1).replace(/\./,'');
  let outputPath = Reflect.get(argv,outputIndex+1).replace(/\./,'');
  let model:string|undefined = Reflect.get(argv,modelIndex+1);
  const isInputAbsolute = inputPath.startsWith('C:') || inputPath.startsWith('D:');
  const isOutputAbsolute = outputPath.startsWith('C:') || outputPath.startsWith('D:');
  inputPath = `-i ${isInputAbsolute?inputPath:pwd+inputPath}`;
  outputPath = `-o ${isOutputAbsolute?outputPath:pwd+outputPath}`;
  model = !model?model:`-n ${model}`;
  return {
    value:[inputPath,outputPath,model],
    toString:()=>[inputPath,outputPath].concat(model?model:'').join(' ')
  }
})();
execSync(`realesrgan-ncnn-vulkan ${args.toString()}`)