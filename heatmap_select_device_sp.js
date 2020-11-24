const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.select_device_sp = function(page,browser,deviceCheck,viewportHeight,viewportWidth,study_page) {
  async function select_device_sp() {
    await page.waitForTimeout(10000)
    var device_select_selector = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-select-wrap.pt-mr10.pt-heatmap-terminal.js-heatmap-terminal > h4'
    await page.click(device_select_selector)
    await page.waitForTimeout(2000)
    let dvType_sp = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-select-wrap.pt-mr10.pt-heatmap-terminal.js-heatmap-terminal > div > ul > li:nth-child(2)'
    await page.click(dvType_sp)
    await page.waitForTimeout(5000)
  }
  return select_device_sp();
}

//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// 調査指定ページがなく、順番にページをクリックしたいとき

// for(let num=1; num<3; num++){
//   deviceCheck = 0
//   let url = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${num}) > td.qa-table-body-col-murl.qa-table-body-col-1.pt-table-body-col-murl.text-left.left > div`
//   await page.waitForSelector(url);
//   await page.click(url)
//   await page.waitForTimeout(5000)
  
//   // デバイスタイプ（pc or sp）を選択するための選択ウィンドウのpath
//   let device_select_selector = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-select-wrap.pt-mr10.pt-heatmap-terminal.js-heatmap-terminal > h4'
//   await page.click(device_select_selector)
//   await page.waitForTimeout(2000)
  
//   // pcを選択
//   let dvType_pc = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-select-wrap.pt-mr10.pt-heatmap-terminal.js-heatmap-terminal > div > ul > li:nth-child(1)'
//   await page.click(dvType_pc)
//   await page.waitForTimeout(5000)
//   await screenshot.screenshot(page,browser,num,deviceCheck,viewportHeight,viewportWidth)
//   deviceCheck += 1
  
//   await page.waitForTimeout(2000)

//   // デバイスタイプ（pc or sp）を選択するための選択ウィンドウのpath
//   await page.click(device_select_selector)
//   await page.waitForTimeout(2000)
  
//   // spを選択
//   let dvType_sp = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-select-wrap.pt-mr10.pt-heatmap-terminal.js-heatmap-terminal > div > ul > li:nth-child(2)'
//   await page.click(dvType_sp)
//   await page.waitForTimeout(5000)
//   await screenshot.screenshot(page,browser,num,deviceCheck,viewportHeight,viewportWidth)
  
  

//   // ヒートマップ一覧画面に戻る
//   let pageBack = '#toolbar_left > div.pt-fl.pt-pl10.pt-pr20.pt-heatmap-toolbar-back.js-heatmap-toolbar-back'
//   await page.click(pageBack)
//   await page.waitForTimeout(5000)

// }