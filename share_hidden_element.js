const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.arise_hidden_element = function(page){
  async function arise_hidden_element(){
    await page.waitForTimeout(2000)
    var display_button_selector = "body > div.pt-heatmap-share > main > div.pt-heatmap.pt-panel.js-heatmap > div > div.pt-heatmap-toolbar.clearfix > div.pt-fl.pt-dropdown.pt-heatmap-display.js-heatmap-display > a"
    
    await page.click(display_button_selector)
    await page.waitForTimeout(2000)
    var hidden_checkBox_selector = "body > div.pt-heatmap-share > main > div.pt-heatmap.pt-panel.js-heatmap > div > div.pt-heatmap-toolbar.clearfix > div.pt-fl.pt-dropdown.pt-heatmap-display.js-heatmap-display > div > ul > li:nth-child(2) > span > label"
    await page.click(hidden_checkBox_selector)
    await page.waitForTimeout(2000)
  }
  return arise_hidden_element();
}
