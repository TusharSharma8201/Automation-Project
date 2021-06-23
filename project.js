const puppy=require("puppeteer");
const fs = require('fs');
let place="market near me";
let startingplace="pari chowk";
let id="af772381@gmail.com";
let pass="987654321Abc";
async function main(){

    let browser=await puppy.launch({
        headless: false ,   //to open browser false=open and true =open in backend/
        defaultViewport:null   
    });
    let tabs=await browser.pages();
    let tab=tabs[0];
   await tab.goto("https://www.google.com/maps/@28.4573787,77.5275458,15z");
   await tab.type("#searchboxinput",place);
   await tab.click("#searchbox-searchbutton");
   
  await tab.waitForSelector(".section-place-result-container-adcreative");
   await tab.waitForSelector(".place-result-container-place-link",{visible:true});
   let items=await tab.$$(".place-result-container-place-link");
  // console.log(items.length);
   let itemurls=[];
   for(let i=0;i<items.length;i++){
       let url= await tab.evaluate(function(ele){
           return ele.getAttribute("href");
       },items[i]);
       itemurls.push(url);
   }
 
   for(let i=0;i<itemurls.length;i++){
       //console.log(itemurls[i]);
       await tab.goto(itemurls[i]);
    
       await tab.waitForSelector('[data-value="Directions"]', {visible: true});
       await tab.click('[data-value="Directions"]');
       await tab.waitForSelector("#directions-searchbox-0");

       await tab.type("#directions-searchbox-0",startingplace);
       await tab.keyboard.press("Enter");
       await tab.waitForNavigation({
       waitUntil: 'networkidle0',
        });
       await tab.click(".section-directions-trip-details-link.noprint.mapsConsumerUiCommonButton__blue-button-text");
   
       await tab.waitForSelector(".directions-group-disclose");
    await tab.screenshot({path: 'buddy-screenshot'+i+'.png'});
    }
    mail();
}

async function mail(){
    let browser=await puppy.launch({
        headless: false ,   //to open browser false=open and true =open in backend/
        defaultViewport:null   
    });
    let tabs=await browser.pages();
    let tab1=tabs[0];
    await tab1.goto("https://accounts.google.com/signin/v2/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin");
    await tab1.type(".whsOnd.zHQkBf",id);
    await tab1.waitForSelector(".VfPpkd-RLmnJb");
    await tab1.click(".VfPpkd-RLmnJb");
    await tab1.waitForTimeout(10000);
    await tab1.type('input[type="password"]',pass);
    await tab1.click(".VfPpkd-RLmnJb");
    await tab1.waitForTimeout(4000);
    
  
    for (let i=1; i<=23; i++)
   {
      await tab1.keyboard.press('Tab');
      await tab1.waitForTimeout(1000);
   }
     
    await tab1.keyboard.press('Enter');   
}




main();
