const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.heatmap_color = function(page) {
  async function heatmap_color() {
    await page.waitForTimeout(5000)
    var selector =  "body > div.pt-heatmap-share > main > div.pt-heatmap.pt-panel.js-heatmap > div > div.pt-heatmap-toolbar.clearfix > div.pt-color-bar.js-color-bar.pt-fl > div"
    
    const info = await page.evaluate((selector) => {
      var el = document.querySelector(selector);
      var zoom = 1.0;
      for (var e = el; e != null; e = e.parentElement) {
          if (e.style.zoom) {
              zoom *= parseFloat(e.style.zoom);
          }
      }
      var rect = el.getBoundingClientRect();
      return {
          height: rect.height,
          width: rect.width,
          x: rect.left,
          y: rect.top,
          zoom: zoom
      };
  }, selector);
    
    const target_height = info.height / 2
    const target_width = info.width / 4

    const click_x = (info.x + target_width) * info.zoom
    const click_y = (info.y + target_height) * info.zoom

    //console.log("move: %s(%s) => (%s,%s)", selector, JSON.stringify(info), click_x, click_y)

    await page.mouse.move(click_x, click_y, {steps: 1})
    await page.waitForTimeout(2000)
    await page.mouse.click(click_x,click_y,{
      clickCount: 1,
      delay: 0,
    })
  }
  return heatmap_color();
}