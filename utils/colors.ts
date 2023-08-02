enum EModifier{
  bold,
  dim,
  italic,
  underline,
  inverse,
  hidden,
  strikethrough,
  bgMagenta
}
const Modifier:Map<keyof typeof EModifier,[string,string]> = new Map([
  ['bold',['\u001b[1m','\u001b[22m']],
  ['dim',['\u001b[2m','\u001b[22m']],
  ['italic',['\u001b[3m','\u001b[23m']],
  ['underline',['\u001b[4m','\u001b[24m']],
  ['inverse',['\u001b[7m','\u001b[27m']],
  ['hidden',['\u001b[8m','\u001b[28m']],
  ['strikethrough',['\u001b[9m','\u001b[29m']],
  ['bgMagenta',['\u001b[45m','\u001b[49m']]
])
export const red = (content:string,modifier?:keyof typeof EModifier) => `${modifier?Modifier.get(modifier)![0]:''}\u001b[31m${content}${modifier?Modifier.get(modifier)![1]:''}`
export const green = (content:string,modifier?:keyof typeof EModifier) => `${modifier?Modifier.get(modifier)![0]:''}\u001b[32m${content}${modifier?Modifier.get(modifier)![1]:''}`
export const magenta = (content:string,modifier?:keyof typeof EModifier) => `${modifier?Modifier.get(modifier)![0]:''}\u001b[35m${content}${modifier?Modifier.get(modifier)![1]:''}`
export const cyan = (content:string,modifier?:keyof typeof EModifier) => `${modifier?Modifier.get(modifier)![0]:''}\u001b[36m${content}${modifier?Modifier.get(modifier)![1]:''}`
export const yellow = (content:string,modifier?:keyof typeof EModifier) => `${modifier?Modifier.get(modifier)![0]:''}\u001b[33m${content}${modifier?Modifier.get(modifier)![1]:''}`
export const blue = (content:string,modifier?:keyof typeof EModifier) => `${modifier?Modifier.get(modifier)![0]:''}\u001b[34m${content}${modifier?Modifier.get(modifier)![1]:''}`
