//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// ヒートマップ画面の”数値詳細”をクリック
// 数値詳細のデータを配列で取得

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");
var csv = require('./data_export_csv')

exports.num_details = function(page,data_details,filter_num,deviceType,google_drive_folder) {
  async function num_details(){
    if (deviceType == "pc") {
      var numDetail_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-main.js-heatmap-main.pt-heatmap-size-pc-a > div.pt-heatmap-toolbar.clearfix > div.pt-heatmap-toolbar-r > a"
    } else {
      var numDetail_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-main.js-heatmap-main.pt-heatmap-size-smartphone-v > div.pt-heatmap-toolbar.clearfix > div.pt-heatmap-toolbar-r > a"
    }
    await page.waitForTimeout(5000)
    await page.waitForSelector(numDetail_button_selector, {timeout : 120000})
    await page.click(numDetail_button_selector)
    var num_details_row_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.modal.fade.pt-heatmap-countDetail__modal.js-pt-heatmap-countDetail__modal.ng-scope.in > div > div > div > div.pt-heatmap-countDetail__data > div.pt-heamap-countDetail__data-list.js-pt-heamap-countDetail__data-list.jspScrollable > div > div.jspPane > ul"
    await page.waitForSelector(num_details_row_selector, {timeout : 120000})
    await page.waitForTimeout(5000)

    var num_details_row = await page.evaluate((selector) => {
      var ulElement = document.querySelector(selector);
      return ulElement.childElementCount;
    },num_details_row_selector) 

    for(let i = 1; i <= num_details_row; i++) {
      var data_row = []
      var data_row_title_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.modal.fade.pt-heatmap-countDetail__modal.js-pt-heatmap-countDetail__modal.ng-scope.in > div > div > div > div.pt-heatmap-countDetail__data > div.pt-heamap-countDetail__data-list.js-pt-heamap-countDetail__data-list.jspScrollable > div > div.jspPane > ul > li:nth-child(${i}) > strong`
      var data_row_value_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.modal.fade.pt-heatmap-countDetail__modal.js-pt-heatmap-countDetail__modal.ng-scope.in > div > div > div > div.pt-heatmap-countDetail__data > div.pt-heamap-countDetail__data-list.js-pt-heamap-countDetail__data-list.jspScrollable > div > div.jspPane > ul > li:nth-child(${i}) > span:nth-child(5)`
      
      var data_title = await page.evaluate((selector) => {
        return document.querySelector(selector).innerText;
      },data_row_title_selector);
      var data_value = await page.evaluate((selector) => {
        return document.querySelector(selector).innerText;
      },data_row_value_selector);
      data_row.push(data_title)
      data_row.push(data_value)
      data_details.push(data_row)
    }
    var close_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.modal.fade.pt-heatmap-countDetail__modal.js-pt-heatmap-countDetail__modal.ng-scope.in > div > div > footer > input"
    await csv.exportCSV(data_details,filter_num,deviceType,google_drive_folder)
    await page.click(close_selector)
  }
  return num_details();
  
}