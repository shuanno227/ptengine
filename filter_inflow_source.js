const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")

exports.inflow_source = function(page){
  async function inflow_source(){
    await page.waitForTimeout(2000)
    var inflow_source_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(2)"
    await page.click(inflow_source_button_selector)
    await page.waitForTimeout(10000)  
  }
  return inflow_source();
}