//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
//”自身のURL”を選択

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");
var narrow = require("./filter_include_or_not")

exports.narrow_filter = function(page,narrow_url,include_select) {
  async function narrow_filter() {
    await page.waitForTimeout(2000)
    var visit_type_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(2)"
    await page.click(visit_type_selector) 
    await page.waitForTimeout(30000)
    await page.type('#js-mod-filter-choice-search-input', narrow_url)
    var all_check_box = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > div > ul > li:nth-child(1) > label"
    await page.waitForTimeout(2000)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(30000)
    
    await narrow.filter_includeOrNot_button(page,include_select)
    await page.waitForTimeout(2000)
  }
  return narrow_filter();
}