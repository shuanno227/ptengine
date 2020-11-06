const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.select_device_pc = function(page,browser,deviceCheck,viewportHeight,viewportWidth,study_page) {
  async function select_device_pc() {
    await page.waitForTimeout(2000)
    var select_device_selector = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-select-wrap.pt-mr10.pt-heatmap-terminal.js-heatmap-terminal > h4'
    await page.click(select_device_selector)
    await page.waitForTimeout(2000)
    let dvType_pc = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > div.pt-tab-content.pt-tab-content-margin-left-fat.js-pt-tab-content > div.ng-scope > div > div > div.pt-heatmap.pt-heatmap-left.pt-panel.js-heatmap.js-heatmap-left.js-pt-mod-heatmapcode-symbol.ng-scope > div.pt-heatmap-select-wrap.clearfix > div.pt-select-wrap.pt-mr10.pt-heatmap-terminal.js-heatmap-terminal > div > ul > li:nth-child(1)'
    await page.click(dvType_pc)
    await page.waitForTimeout(5000)
  }
  return select_device_pc();
}
