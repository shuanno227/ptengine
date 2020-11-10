//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
//”自身のURL”を選択

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");
var narrow = require("./filter_include_or_not")
var op = require('./filter')

exports.narrow_filter = function(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy,include_select) {

  async function narrow_filter() {
    try {
      var visit_type_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(2)"
      await page.waitForTimeout(8000)
      await page.waitForSelector(visit_type_selector, {timeout : 1200000})
      await page.click(visit_type_selector)
      await page.waitForSelector('#js-mod-filter-choice-search-input', {timeout :0})
      await page.waitForTimeout(8000)
      await page.type('#js-mod-filter-choice-search-input', narrow_url)
      await page.waitForTimeout(8000)
      await page.keyboard.press('Enter')
      await narrow.filter_includeOrNot_button(page,include_select)
    } catch(err) {
      await page.evaluate(() => {
        location.reload(true)
      })
      await page.waitForSelector(filter_open_selector, {timeout : 100000})
      await page.click(filter_open_selector)
      var clear_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a"
      var judge = await page.evaluate((selector) => {
        return document.querySelector(selector) != null
      }, clear_button_selector)
      if (judge) {
        await page.click(clear_button_selector)
      }
      await page.waitForTimeout(3000)
      var filter_close = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-packup.pt-transition.js-pt-filter-packup.pt-svg-layer"
      await page.click(filter_close)
      await page.waitForTimeout(3000)
      await op.filter(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy, 1)
    }
  }
  return narrow_filter();
}