//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// 調査ページに遷移（指定したURLと一覧ページのURLとが一致したらクリック）
const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");


exports.select_page = function(page,study_page) {
  async function select_page() {
    target_count = 1
    var target_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${target_count}) > td.qa-table-body-col-murl.qa-table-body-col-1.pt-table-body-col-murl.text-left.left > div > a.longtext-second.text-none.qa-page-item-url.js-table-td-a-linkage`
    var target_url = await page.evaluate((selector) => {
      return document.querySelector(selector).innerText;
    },target_selector);
    if (target_url != study_page) {

      do {
        target_count += 1
  
        var page_count_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-pager.show > div > ul"
        var page_count = await page.evaluate((selector) => {
          var ulElement = document.querySelector(selector);
          return ulElement.childElementCount;
        },page_count_selector)
  
        if (target_count == 11){
          target_count = 1
          var next_page_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-pager.show > div > ul > li:nth-child(${page_count}) > a > svg`
          
          await page.click(next_page_selector)
          await page.waitForTimeout(5000)
        }
  
        target_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${target_count}) > td.qa-table-body-col-murl.qa-table-body-col-1.pt-table-body-col-murl.text-left.left > div > a.longtext-second.text-none.qa-page-item-url.js-table-td-a-linkage`
        target_url = await page.evaluate((selector) => {
          return document.querySelector(selector).innerText;
        },target_selector);
      } while (target_url != study_page);
      target_click_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${target_count}) > td.qa-table-body-col-murl.qa-table-body-col-1.pt-table-body-col-murl.text-left.left > div`
      await page.click(target_click_selector)
    }

    target_click_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${target_count}) > td.qa-table-body-col-murl.qa-table-body-col-1.pt-table-body-col-murl.text-left.left > div`
    await page.click(target_click_selector)
  }
  return select_page();
}

