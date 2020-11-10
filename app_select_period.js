//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// 調査期間を指定するためカレンダーを操作

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.selectPeriod = function(page,start_month,start_day,end_month,end_day) {

  async function studyPeriod() {
    
    // カレンダーボタンをクリックしてウィンドウを表示
    let period_box_selector = "#toolbar_left > div.pt-datepicker.js-date.pt-show > div.pt-datepicker__date.js-pt-calendar"
    await page.waitForTimeout(5000)
    await page.click(period_box_selector)
    let past_one_month = "#toolbar_left > div.pt-datepicker.js-date.pt-show > div.daterangepicker.dropdown-menu.ltr.show-calendar.opensright > div.ranges > ul > li:nth-child(6)"
    await page.waitForTimeout(3000)
    await page.click(past_one_month)
    // //右側のカレンダーの年月を取得
    // let endPeriod = "#toolbar_left > div.pt-datepicker.js-date.pt-show > div.daterangepicker.dropdown-menu.ltr.show-calendar.opensright > div.calendar.right > div.calendar-table > table > thead > tr:nth-child(1) > th.month"
    // await page.waitForSelector(endPeriod)
    // var periodBox_endMonth = await page.evaluate((selector) => { // 右側のカレンダーの年月を変数periodBox_endMonthに代入
    //         return document.querySelector(selector).innerText;
    //       }, endPeriod);
    // await page.waitForTimeout(3000)
    
    // // ユーザーが指定した、調査終了年月と右側のカレンダーの年月が一致するまで、previousボタンをクリック
    // while(end_month != periodBox_endMonth){
    //   let prev_button = "#toolbar_left > div.pt-datepicker.js-date.pt-show > div.daterangepicker.dropdown-menu.ltr.show-calendar.opensright > div.calendar.left > div.calendar-table > table > thead > tr:nth-child(1) > th.prev.available > i"
    //   await page.click(prev_button)
    //   periodBox_endMonth = await page.evaluate((selector) => {
    //     return document.querySelector(selector).innerText;
    //   }, endPeriod);
    // }
  
    // const end_calendar_of_span = await page.$$('#toolbar_left > div.pt-datepicker.js-date.pt-show > div.daterangepicker.dropdown-menu.ltr.show-calendar.opensright > div.calendar.right span');
    
    // var tagText = [];
    // var fix_tagText = [];
    // var indicator = [];
    // for (let i = 0; i < end_calendar_of_span.length; i++) {
    //   tagText.push(await (await end_calendar_of_span[i].getProperty('textContent')).jsonValue())
    //   tagText[i] = tagText[i].replace(/[^0-9]/g,'')
    //   if(tagText[i]+100000==end_day+100000){
    //     indicator.push(i);
    //   }
    // }
    
    // end_calendar_of_span[indicator[0]].click();
    // await page.waitForTimeout(3000)

    // if (start_month == end_month) {
    //   var start_calendar_of_span = await page.$$('#toolbar_left > div.pt-datepicker.js-date.pt-show > div.daterangepicker.dropdown-menu.ltr.show-calendar.opensright > div.calendar.right span'); 
    // } else {
    //   var start_calendar_of_span = await page.$$('#toolbar_left > div.pt-datepicker.js-date.pt-show > div.daterangepicker.dropdown-menu.ltr.show-calendar.opensright > div.calendar.left span')
    // }
    
    
    // tagText = [];
    // indicator = [];
    // for (let i = 0; i < start_calendar_of_span.length; i++) {
    //     tagText.push(await (await start_calendar_of_span[i
    //     ].getProperty('textContent')).jsonValue())
    //     tagText[i] = tagText[i].replace(/[^0-9]/g,'')
    //     if(tagText[i]+100000==start_day+100000){ 
    //       indicator.push(i);
    //   }
    // }
    
    // start_calendar_of_span[indicator[0]].click();
    
  
    // await page.waitForTimeout(2000)
    // let spanButton = "#toolbar_left > div.pt-datepicker.js-date.pt-show > div.daterangepicker.dropdown-menu.ltr.show-calendar.opensright > div.ranges > div > button.applyBtn.pt-btn.btn-success"
    // await page.click(spanButton)
  
  }
  return studyPeriod();
}  

