const puppeteer = require('puppeteer')
const fs = require('fs')
const Jimp = require('jimp')


exports.filter_ok = function(page) {
  async function filter_ok() {
    await page.waitForTimeout(2000)
    var button_ok_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok"
    await page.click(button_ok_selector)
    await page.waitForTimeout(2000)
  }
  return filter_ok();
}
