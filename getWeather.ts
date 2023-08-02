#! /usr/bin/env ts-node
import dayjs from "dayjs";
import {yellow,green,red,blue,magenta,cyan} from './utils/colors';
interface OpenWeather{
  base:string
  clouds:{
    all:number
  }
  cod:number
  dt:number
  id:number
  main:Record<['feels_like','humidity','pressure','temp','temp_max','temp_min'][number],number>
  name:string
  sys:{
    country:string
  }&Record<['id','sunrise','sunset','type'][number],number>
  timezone:number
  visibility:number
  weather:Array<{id:number}&Record<['description','icon','main'][number],string>>
  wind:Record<['deg','gust','speed'][number],number>
}
interface OpenCity{
  country:string
  lat:number
  lon:number
  name:string
  local_names:Record<string,string>&Record<['en','zh'][number],string>
}
(async ()=>{
  const cityIndex = process.argv.findIndex(item=>item==='--city');
  const city = process.argv[cityIndex+1];
  console.log(cyan(`今天${dayjs(new Date().getTime()).format('YYYY年-MM月-DD日-dddd')}`,'bgMagenta'));
  const response_city = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=e5c0d6f7175a8bbea898f97168780150`);
  const OpenCity = await response_city.json() as Awaited<Array<OpenCity>>;
  const response_weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${OpenCity[0].lat}&lon=${OpenCity[0].lon}&units=metric&lang=zh_cn&appid=e5c0d6f7175a8bbea898f97168780150`);
  const OpenWeather = await response_weather.json() as Awaited<OpenWeather>;
  console.log('🌄',magenta(`${OpenCity[0].local_names.zh}当前温度:`,'bold'),magenta(OpenWeather.main.temp+'°C'));
  console.log('🧊',cyan(`${OpenCity[0].local_names.zh}当前最低温度:`,'bold'),cyan(OpenWeather.main.temp_min+'°C'));
  console.log('🌋',red(`${OpenCity[0].local_names.zh}当前最高温度:`,'bold'),red(OpenWeather.main.temp_max+'°C'));
  console.log('💪',yellow(`${OpenCity[0].local_names.zh}当前体感温度:`,'bold'),yellow(OpenWeather.main.feels_like+'°C'));
  console.log('💧',green(`${OpenCity[0].local_names.zh}当前湿度:`,'bold'),OpenWeather.main.humidity+'%');
  console.log('🛬',green(`${OpenCity[0].local_names.zh}当前风速:`,'bold'),OpenWeather.wind.speed+'m/s');
  console.log('🌞',green(`${OpenCity[0].local_names.zh}今日日出时间:`,'bold'),dayjs(OpenWeather.sys.sunrise).format('hh:mm:ss'));
  console.log('🌜',green(`${OpenCity[0].local_names.zh}今日日落时间:`,'bold'),dayjs(OpenWeather.sys.sunset).format('HH:mm:ss'));
  console.log('⛅',blue(`${OpenCity[0].local_names.zh}当前天气状况:`,'bold'),OpenWeather.weather[0].description);
})()
