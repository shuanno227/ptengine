//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// ヒートマップ画面の”ページ分析”をクリック

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.page_analytics = function(page,deviceType) {
  async function page_analytics(){
    await page.waitForTimeout(2000)
    var page_analytics_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-heatmap-maptype.js-heatmap-maptype > ul > li:nth-child(3) > a"
    await page.click(page_analytics_button_selector)
    await page.waitForTimeout(4000)
    if (deviceType == "pc"){
      var page_reflesh_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-main.js-heatmap-main.pt-heatmap-size-pc-a > div.pt-heatmap-toolbar.clearfix > a.pt-fl.pt-heatmap-tool.js-heatmap-refresh"
    } else {
      var page_reflesh_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-main.js-heatmap-main.pt-heatmap-size-smartphone-v > div.pt-heatmap-toolbar.clearfix > a.pt-fl.pt-heatmap-tool.js-heatmap-refresh"
    }
    
    
    await page.click(page_reflesh_button_selector)
  }
  return page_analytics();
}