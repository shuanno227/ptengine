const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")
var fl = require('./filter_include_or_not')

exports.seo = function(page, include_select) {
  async function seo(){
    await page.waitForTimeout(2000)
    var seo_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(7)"
    await page.click(seo_button_selector)
    await page.waitForTimeout(3000)
    if (include_select == 1) {
      await fl.filter_includeOrNot_button(page, include_select)
    } else {
      await fl.filter_includeOrNot_button(page, include_select)
    } 
    await page.waitForTimeout(2000)
    
  }
  return seo();
}