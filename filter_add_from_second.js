const puppeteer = require('puppeteer')
const fs = require('fs')
const Jimp = require('jimp')

exports.filter_add_after = function(page) {
  async function filter_add_after() {
    await page.waitForTimeout(2000)
    var filter_add_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > div > a"
    await page.click(filter_add_selector)
    await page.waitForTimeout(2000)
  }
  return filter_add_after();
}