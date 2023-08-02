import {resolve} from 'node:path';
import {readFile} from 'node:fs/promises'
export const loadEnv = async () => {
  try {
    const contents = await readFile(resolve(__dirname, '../.env'));
    const contentsArray = contents.toString().split('\r\n').filter(Boolean)
    for(const item of contentsArray){
      const [key,value] = item.split('=');
      Reflect.set(process.env,key.trim(),value.trim());
    }
  } catch (error) {
  }
}