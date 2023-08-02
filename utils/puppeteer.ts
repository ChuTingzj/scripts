import puppeteer from "puppeteer";
(async ()=>{
  const browser = await puppeteer.launch({headless:'new'});
  const page = await browser.newPage();
  await page.goto("https://www.baidu.com");
  await page.screenshot({path: 'baidu.png'});
  await browser.close();
})
()