//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// ヒートマップ画面の”クリック”をクリック
const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.click_heatmap = function(page) {
  async function click_heatmap(){
    await page.waitForTimeout(2000)
    var heatmap_button_selector = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-heatmap-maptype.js-heatmap-maptype > ul > li:nth-child(1) > a"
    await page.click(heatmap_button_selector)
    await page.waitForTimeout(2000)
  }
  return click_heatmap();
}