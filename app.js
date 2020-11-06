const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");
var f1 = require('./app_login')
var f2 = require('./app_select_period')
var f3 = require('./app_select_page')
var f4 = require('./app_operation');
var f5 = require('./app_select_page_group')


//-------ptengineログインユーザ情報（変更不可）-------//
var email = 'pt-engine@giraffe-co.jp'
var password = 'giraffe2017'
//-----------------------------------------------//

//---------取得データの保存先(google drive)---------//
var google_drive_folder = "data1"

//-----------------------------------------------//

//-------------調査対象のプロファイル情報-------------//
var profile  = 'livable.co.jp' 
//-----------------------------------------------//

//-----------調査対象ページorグループの情報-----------//
//ページグループで調査：pageGroup_title
var pageGroup_title = "事業用　物件詳細"
//単一ページで調査：study_page
var study_page = 'https://officekukan.jp/moving/case/'
var narrow_url = 'https://livable.co.jp/jigyo/C'
//-----------------------------------------------//

//---------------------調査期間--------------------//
var start_month = "2020 10月"   //開始年月
var start_day = "3"             //開始日
var end_month = "2020 10月"     //終了年月
var end_day = "13"              //終了日
//-----------------------------------------------//


var page // Puppeteer操作用
var browser // Puppeteer操作用
var viewportHeight = 1200 // ブラウザサイズの設定
var viewportWidth = 1600 // ブラウザサイズの設定
var scrollHeight = 0

// Cookieの読み込み
async function cookieSetting() {
  let content = fs.readFileSync("/Users/shuanno/giraffe-co/giraffe-tool/scrape-resources/cookie.json");
  let cookie = JSON.parse(content);
  const LAUNCH_OPTION = {
    headless : true,
    args: [
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-sandbox',
      '--no-zygote',
      '--single-process'
    ]
    // ,executablePath : 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
  };
  browser = await puppeteer.launch(LAUNCH_OPTION);
  page = await browser.newPage();
  await page.setViewport({width: viewportWidth, height: viewportHeight})
  await page.setCookie(...cookie)
  await page.goto('https://reportv3.ptengine.jp/login.html');
}


// スクレイピング 実操作
(async () => {
  // var num = 1 // ループ処理用の変数（ヒートマップ一覧画面操作用）
  await cookieSetting()
  await f1.ptLogin(page, email, password, profile)
  await f2.selectPeriod(page, start_month, start_day, end_month, end_day)
  await page.waitForTimeout(5000)
  //await f3.select_page(page,study_page)
  await f5.select_pageGroup(page,pageGroup_title)
  await f4.operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder)
  await page.waitForTimeout(3000)
  await browser.close()
})();