const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// shareリンク先のスクリーンショット操作
exports.screenshot = function(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder) {
  
  async function shareLinkAction() {
    pageIndex = heatmapType + '-' + deviceType;
    
    // shareリンク先が別タブなため、puppeteerの操作焦点をリンク先別タブに移す
    const pages = await browser.pages();
    const page2 = pages[pages.length-1];
    await page2.bringToFront();
    await page2.waitForTimeout(3000)
    await page2.click('body > div.pt-heatmap-share > main > div.pt-heatmap.pt-panel.js-heatmap > div > div.pt-heatmap-toolbar.clearfix > div.pt-heatmap-toolbar-r')
    await page2.waitForTimeout(15000)
    await scrollToBottom(page2, viewportHeight)
    // shareリンク先のフル画面のスクリーンショット
    await page2.screenshot({ path: `/Users/shuanno/giraffe-co/giraffe-tool/auto-tool/ptengine/image/page${pageIndex}.png`, fullPage: true })
    await page2.waitForTimeout(5000)
    if (deviceType == "pc") {
      resizeForPC(heatmapType,pageIndex,filter_num,google_drive_folder,deviceType)
    } else {
      resizeForSP(heatmapType,pageIndex,filter_num,google_drive_folder,deviceType)
    }
    
    await page2.waitForTimeout(1000)
    await page2.close();
  }
  return shareLinkAction();
  
  //・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
  // ブラウザのスクロール操作 → これで綺麗なスクリーンショットが可能
  async function scrollToBottom(page, viewportHeight) {
    const getScrollHeight = () => { // html要素の高さを取得する関数
      return Promise.resolve(document.documentElement.scrollHeight) //documentElement = ドキュメントのルート（最上位）の要素、すなわち、html要素を返す
    }
    
    scrollHeight = await page.evaluate(getScrollHeight)
    let currentPosition = 0 // 現在のスクロール位置
    let scrollNumber = 0 // スクロール回数
    
    while (currentPosition < scrollHeight) {
      scrollNumber += 1
      const nextPosition = scrollNumber * viewportHeight //viewportHeightを1200に定義しているため、1200ずつ増加
      await page.evaluate(function (scrollTo) {
        return Promise.resolve(window.scrollTo(0, scrollTo)) // window.scrollTo()は特定の組み合わせの座標までスクロールする
      }, nextPosition)
      // await page.waitForNavigation({waitUntil: 'newworkidle2', timeout: 5000}).catch(e => console.log('timeout exceed. proceed to next operation'));
      
      currentPosition = nextPosition; 
      // console.log(`scrollNumber: ${scrollNumber}`)
      // console.log(`currentPosition: ${currentPosition}`)
      
      scrollHeight = await page.evaluate(getScrollHeight)
      // console.log(`ScrollHeight ${scrollHeight}`)
      
    }
  }
  
  //・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
  // shareリンク先でのPC画面スクリーンショットのトリミング
  async function resizeForPC(heatmapType,pageIndex,filter_num,google_drive_folder,deviceType) {
    Jimp.read(`/Users/shuanno/giraffe-co/giraffe-tool/auto-tool/ptengine/image/page${pageIndex}.png`, function (err, image) {
      x = 118
      y = 310
      width = 1020
      height = scrollHeight - y - 10
      image.crop(x, y, width,height ).write(`/Users/shuanno/Google Drive File Stream/マイドライブ/${google_drive_folder}/Filter${filter_num}-PC-${heatmapType}.png`);
    });
  }
  
  //・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
  // shareリンク先でのSP画面スクリーンショットのトリミング
  async function resizeForSP(heatmapType,pageIndex,filter_num,google_drive_folder,deviceType) {
    Jimp.read(`/Users/shuanno/giraffe-co/giraffe-tool/auto-tool/ptengine/image/page${pageIndex}.png`, function (err, image) {
      x = 443
      y = 310
      width = 375
      height = scrollHeight - y - 10
      image.crop(x, y, width,height ).write(`/Users/shuanno/Google Drive File Stream/マイドライブ/${google_drive_folder}/Filter${filter_num}-SP-${heatmapType}.png`);
    });
  }
}