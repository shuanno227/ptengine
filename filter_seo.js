const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")
var fl = require('./filter_include_or_not')
var op = require('./filter')

exports.seo = function(page, include_select) {
  async function seo(){
    try {
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
      

    } catch(err) {
      console.log('--------------seo-----------------')
      // await page.evaluate(() => {
      //   location.reload(true)
      // })

      // var filter_open_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-btn.pt-transition.js-pt-filter-pull.pt-svg-layer.js-pt-filter-red-circle"
      // await page.waitForSelector(filter_open_selector, {timeout : 300000})
      // await page.click(filter_open_selector)
      // // var clear_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a"
      // // var judge = await page.evaluate((selector) => {
      // //   return document.querySelector(selector) != null
      // // }, clear_button_selector)
      // // if (judge == true) {
      // //   await page.click(clear_button_selector)
      // // }
      // await page.waitForTimeout(3000)
      // var filter_close = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-packup.pt-transition.js-pt-filter-packup.pt-svg-layer"
      // await page.click(filter_close)
      // await page.waitForTimeout(3000)
      // await op.filter(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy, 2)
    }
  }
  return seo();
}