//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
//”再訪問”を選択

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.filter_select_revisit = function(page) {
  async function filter_select_revisit() {
    await page.waitForTimeout(2000)
    var visit_type_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(1)"
    await page.click(visit_type_selector)
    await page.waitForTimeout(2000)
    var revisit_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(3)"
    await page.click(revisit_selector)
    await page.waitForTimeout(2000)
  }
  return filter_select_revisit();
}