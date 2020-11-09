//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
//”自身のURL”を選択

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");
var narrow = require("./filter_include_or_not")

exports.narrow_filter = function(page,narrow_url,include_select) {
  async function narrow_filter() {
    var visit_type_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(2)"
    await page.waitForSelector(visit_type_selector, {timeout : 120000})
    await page.click(visit_type_selector)         
    await page.waitForSelector('#js-mod-filter-choice-search-input', {timeout : 120000})
    await page.type('#js-mod-filter-choice-search-input', narrow_url)
    await page.waitForTimeout(2000)
    await page.keyboard.press('Enter')
    await narrow.filter_includeOrNot_button(page,include_select)
    await page.waitForTimeout(2000)
  }
  return narrow_filter();
}