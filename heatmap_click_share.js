//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// shareボタンのクリック
const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.shareLink_click = function(page) {
  async function shareLink_click() {
    var share_button_selector = '#toolbar_left > div.pt-toolbar__heatmap-btns > a'
    await page.click(share_button_selector)
    await page.waitForTimeout(5000)
  }
  return shareLink_click();
}