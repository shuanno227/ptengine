const puppeteer = require('puppeteer')
const fs = require('fs')
const Jimp = require('jimp')

exports.filterClose = function(page) {
  async function filterClose() {
    await page.waitForTimeout(2000)
    var filter_close_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-packup.pt-transition.js-pt-filter-packup.pt-svg-layer"
    await page.click(filter_close_selector)
    await page.waitForTimeout(2000)
  }
  return filterClose();
}