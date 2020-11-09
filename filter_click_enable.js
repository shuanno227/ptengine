const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")

exports.enable = function(page) {
  async function enable(){
    var enable_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable"
    await page.waitForSelector(enable_selector, {timeout : 120000})
    await page.click(enable_selector)
    await page.waitForTimeout(2000)
  }
  return enable();
}
