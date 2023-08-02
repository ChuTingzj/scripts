import chalk from 'chalk';
import {transform} from 'lightningcss';
import {writeFile,readFile} from 'fs/promises';
import {argv} from 'process';
import {resolve} from 'path';
const getFileSize = (content:Buffer) => new Blob([content]).size
const inputFileNameIndex = argv.findIndex(item=>item==='--input') 
const input = argv[inputFileNameIndex+1]
const outputFileNameIndex = argv.findIndex(item=>item==='--output')
const output = argv[outputFileNameIndex+1];
const hasMap = argv.findIndex(item=>item==='--map')>0;
(async ()=>{
   const contents = await readFile(resolve(__dirname,input),{encoding:'utf8'})
   const { code, map } = transform({
    filename: input,
    code: Buffer.from(contents),
    minify: true,
    sourceMap: true
  });
  await writeFile(resolve(__dirname,output),code)
  if(hasMap){
    const outputMapFileName = output+'.map'
    await writeFile(resolve(__dirname,outputMapFileName),map ?? '')
  }
  const originalSize = getFileSize(Buffer.from(contents))
  const compressedSize = getFileSize(code)
  console.log(chalk.green.bold('🎉Compress Successfully!'))
  console.log(chalk.greenBright(`✅ After compressed: ${compressedSize} bytes`))
  console.log(chalk.greenBright(`✅ Original: ${originalSize} bytes`))
  console.log(chalk.greenBright(`🥇 Save about ${100-parseInt(String(100*(compressedSize/originalSize)))}%`))
})();