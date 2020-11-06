const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")

exports.filter_includeOrNot_button = function(page,include_select) {
  async function filter_includeOrNot_button(){
    if (include_select == 1){
      await page.waitForTimeout(2000)
      var include_select_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div:nth-child(2) > label.pt-mr20"
      await page.click(include_select_selector)
      await page.waitForTimeout(2000)
      var check_box_selector = "ul > li:nth-child(1) > label"
                           
                           
      await page.click(check_box_selector)
      await page.waitForTimeout(2000)
    } else {
      var include_select_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div:nth-child(2) > label:nth-child(4)"
      await page.click(include_select_selector)
      await page.waitForTimeout(2000)
      var check_box_selector = "ul > li:nth-child(1) > label"
      await page.click(check_box_selector)
      await page.waitForTimeout(2000)
    }
  }
  return filter_includeOrNot_button();
}