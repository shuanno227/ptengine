const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")

exports.advertise = function(page) {
  async function advertise() {
    try {
      var campaign_butoon_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(6)"
      await page.waitForSelector(campaign_butoon_selector, {timeout : 120000})
      await page.click(campaign_butoon_selector)
      var media_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(3)"
      await page.waitForSelector(media_button_selector, {timeout : 120000})
      await page.click(media_button_selector)
      var advertise_all_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(1) > label"
      await page.waitForSelector(advertise_all_selector, {timeout : 120000})
      await page.click(advertise_all_selector)

    } catch(err) {
      await page.evaluate(() => {
        location.reload(true)
      })
      await page.waitForSelector(filter_open_selector, {timeout : 100000})
      await page.click(filter_open_selector)
      var clear_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a"
      var judge = await page.evaluate((selector) => {
        return document.querySelector(selector) != null
      }, clear_button_selector)
      if (judge) {
        await page.click(clear_button_selector)
      }
      await page.waitForTimeout(3000)
      var filter_close = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-packup.pt-transition.js-pt-filter-packup.pt-svg-layer"
      await page.click(filter_close)
      await page.waitForTimeout(3000)
      await op.filter(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy, 2)
    }
  }
  return advertise();
}