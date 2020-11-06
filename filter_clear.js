//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// フィルターのクリアをクリック

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");


exports.filter_clear = function(page) {
  async function filter_clear(){
    await page.waitForTimeout(2000)
    var filter_open_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-btn.pt-transition.js-pt-filter-pull.pt-svg-layer.js-pt-filter-red-circle"
    await page.click(filter_open_selector)
    await page.waitForTimeout(2000)
    var filter_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a"
    await page.click(filter_button_selector)
    await page.waitForTimeout(2000)
    var filter_close_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-packup.pt-transition.js-pt-filter-packup.pt-svg-layer"
    await page.click(filter_close_selector)
    await page.waitForTimeout(2000)
  }
  return filter_clear();
}