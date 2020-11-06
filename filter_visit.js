//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// フィルターの”訪問関連”をクリック

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.filter_visit = function(page) {
  async function filter_visit() {
    await page.waitForTimeout(8000)
    var visit_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(1)"
    await page.click(visit_button_selector)
    await page.waitForTimeout(2000)
  }
  return filter_visit();
}