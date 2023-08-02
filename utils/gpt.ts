import process from "node:process";
import { Configuration, OpenAIApi,type CreateCompletionRequest,type CreateChatCompletionRequest,type ChatCompletionResponseMessage } from "openai";
import chalk from 'chalk';
declare global{
  namespace NodeJS{
    interface ProcessEnv{
      OPENAI_API_KEY:string
    }
  }
}
console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
export const createCompletion = async (completionRequest:CreateCompletionRequest,onSuccess:(response:string)=>void,onFail?:(message:string)=>void)=>{
  console.log(chalk.yellow.bold(completionRequest.prompt))
  try {
    const completion = await openai.createCompletion(completionRequest);
    console.log(chalk.green.bold(completion.data.choices[0].text??''));
    onSuccess(completion.data.choices[0].text??'')
  } catch(error) {
    console.log(chalk.red.bold(error));
    onFail?.('error');
  }
}
export const createChatCompletion = async (completionRequest:CreateChatCompletionRequest,onSuccess:(response?:ChatCompletionResponseMessage)=>void,onFail?:(message:string)=>void) => {
  console.log(chalk.yellow.bold(completionRequest.messages[0].content))
  try {
    const completion = await openai.createChatCompletion(completionRequest);
    console.log(chalk.green.bold(completion.data.choices[0].message??''));
    onSuccess(completion.data.choices[0].message)
  } catch(error) {
    console.log(chalk.red.bold(error));
    onFail?.('error');
  }
}