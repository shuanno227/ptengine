const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")

exports.advertise = function(page) {
  async function advertise() {
    await page.waitForTimeout(2000)
    var campaign_butoon_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(6)"
    await page.click(campaign_butoon_selector)
    await page.waitForTimeout(2000)
    var media_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(3)"
    await page.click(media_button_selector)
    await page.waitForTimeout(5000)
    var advertise_all_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(1) > label"
    await page.waitForSelector(advertise_all_selector)
    await page.click(advertise_all_selector)
    await page.waitForTimeout(2000)
  }
  return advertise();
}