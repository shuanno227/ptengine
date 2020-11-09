const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.select_pageGroup = function(page,pageGroup_title){
  async function select_pageGroup() {
    target_count = 1
    await page.waitForTimeout(5000)
    var pageGroup_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > ul > li.js-pt-table-td-tips.js-pt-nav-item.qa-tab-item-groupname.qa-tab-item-2 > a"
    await page.click(pageGroup_selector)
    
    var pageGroup_target_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${target_count}) > td.qa-table-body-col-gname.qa-table-body-col-1.pt-table-body-col-gname.text-left.left > span`
    await page.waitForSelector(pageGroup_target_selector, {timeout : 120000})
    var pageGroup_target = await page.evaluate((selector) => {
      return document.querySelector(selector).innerText;
    },pageGroup_target_selector)
    if (pageGroup_target != pageGroup_title) {
      do {
        target_count += 1

        var page_count_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-pager.show > div > ul"
        var page_count = await page.evaluate((selector) => {
          var ulElement = document.querySelector(selector);
          return ulElement.childElementCount;
        },page_count_selector)
  
        if (target_count == 11){
          target_count = 1
          var next_page = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-pager.show > div > ul > li:nth-child(${page_count}) > a > svg`
          
          await page.click(next_page)
          await page.waitForTimeout(5000)
        }
  
        var pageGroup_target_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${target_count}) > td.qa-table-body-col-gname.qa-table-body-col-1.pt-table-body-col-gname.text-left.left > span`
        await page.waitForSelector(pageGroup_target_selector, {timeout : 120000})
        var pageGroup_target = await page.evaluate((selector) => {
          return document.querySelector(selector).innerText;
        },pageGroup_target_selector)

      } while(pageGroup_target != pageGroup_title)
      
      target_click_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${target_count}) > td.qa-table-body-col-gname.qa-table-body-col-1.pt-table-body-col-gname.text-left.left > span`
      await page.click(target_click_selector)
    } else {
      target_click_selector = `body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-pagescene-list > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div > div.clearfix.pt-pagescenelist.js-pt-pagescenelist > div > div.js-pagescenelist-table-container > div > div.pt-mod-table-panel.show > div > div > table > tbody > tr:nth-child(${target_count}) > td.qa-table-body-col-gname.qa-table-body-col-1.pt-table-body-col-gname.text-left.left > span`
      await page.click(target_click_selector)
    }
  }
  return select_pageGroup();
}


