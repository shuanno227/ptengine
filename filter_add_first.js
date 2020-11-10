//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// フィルターの追加ボタンをクリック

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");


exports.filter_add = function(page) {
  async function filter_add(){
    await page.waitForTimeout(5000)
    var filter_button_selector = "a.pt-mod-filter-packup.pt-transition.js-pt-filter-packup.pt-svg-layer"
    await page.waitForTimeout(3000)
    await page.waitForSelector(filter_button_selector, {timeout : 120000})
    await page.click(filter_button_selector)
    var filter_add_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mb30.pt-mod-filter-add.js-mod-filter-add"
    await page.waitForTimeout(3000)
    await page.waitForSelector(filter_add_selector, {timeout : 120000})
    await page.click(filter_add_selector)
  }
  return filter_add();
}