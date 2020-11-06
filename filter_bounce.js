const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")

exports.bounce = function(page) {
  async function bounce(){
    await page.waitForTimeout(2000)
    var type_exit_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(3)"
    await page.click(type_exit_selector)
    await page.waitForTimeout(2000)
    var bounce_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(2)"
    await page.click(bounce_button_selector)
    await page.waitForTimeout(2000)
  }
  return bounce();
}