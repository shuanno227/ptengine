const puppeteer = require('puppeteer')
const fs = require('fs')
const Jimp = require('jimp')
var op = require('./filter')

exports.filter_add_after = function(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy) {
  async function filter_add_after() {
      var filter_add_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > div > a"
      
      await page.waitForTimeout(10000)
      //await page.waitForSelector(filter_add_selector, {timeout : 1200000})
      await page.click(filter_add_selector)
    
  }
  return filter_add_after();
}