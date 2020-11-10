//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// ヒートマップ画面の操作全般

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");
var op1 = require('./heatmap_page_analytics'); //ページ分析・更新のクリック
var op2 = require('./heatmap_click'); //クリックheatmapのクリック
var op3 = require('./heatmap_attention'); //アテンションheatmapのクリック
var op4 = require('./share_screenshot') //スクリーンショット・リサイズ処理
var op5 = require('./data_num_details')  //数値詳細からデータ抽出 → CSVファイル変換・保存処理ファイルも内部で呼び出し
var op6 = require('./heatmap_select_device_pc') //デバイスタイプをpcに選択
var op7 = require('./heatmap_select_device_sp') //デバイスタイプをspに選択
var op8 = require('./heatmap_click_share') //shareボタンをクリック
var op9 = require('./share_data_title') //調査内容の期間・条件等を取得し配列に格納
var op10 = require('./filter_add_first') //filterを選択するウィンドウを開く
var op11 = require('./filter_clear') //filterを無効化する
var op15 = require('./filter')


var data_details = []
var filter_num = 11

exports.operation = function(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder) {
  async function operation() {
    var first_hierarchy
    var second_hierarchy
    var third_hierarchy
    
    for (first_hierarchy = 2; first_hierarchy <= 3; first_hierarchy++) {
      if(first_hierarchy != 0){
     
        for (second_hierarchy = 0; second_hierarchy <= 2; second_hierarchy++) { 
          for (third_hierarchy = 0; third_hierarchy < 3; third_hierarchy++) {
            
            console.log('filter' + filter_num + '----' + first_hierarchy + '：' + second_hierarchy + '：' + third_hierarchy)
            await page.waitForTimeout(5000)
            await op15.filter(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy, 0)
            //デバイスタイプの選択
            var deviceType = "pc"
            console.log('pc')
            var heatmapType = "クリック"
            data_details = []
            await page.waitForTimeout(5000)
            await op6.select_device_pc(page, browser, deviceType, viewportHeight, viewportWidth, study_page)
            await page.waitForTimeout(5000)
            await op1.page_analytics(page,deviceType)
            await page.waitForTimeout(5000)
            await op2.click_heatmap(page)
            await page.waitForTimeout(5000)
            await op8.shareLink_click(page)
            await page.waitForTimeout(5000)
            await op9.data_title(page,browser,data_details)
            await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
            await op5.num_details(page, data_details,filter_num,deviceType,google_drive_folder);
            await page.waitForTimeout(2000)
        
            // アテンションマップのスクリーンショット
            await op3.attention_heatmap(page)
            heatmapType = "アテンション"
            await op8.shareLink_click(page)
            await page.waitForTimeout(5000)
            await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
            await page.waitForTimeout(3000)
        
            deviceType = "sp"
            var heatmapType = "クリック"
            await page.waitForTimeout(5000)
            console.log('sp')
            data_details = []
            await op7.select_device_sp(page,browser,deviceType,viewportHeight,viewportWidth,study_page)
            await page.waitForTimeout(5000)
            await op1.page_analytics(page,deviceType);
            await page.waitForTimeout(5000)
            await op2.click_heatmap(page)
            await page.waitForTimeout(5000)
            await op8.shareLink_click(page)
            await page.waitForTimeout(5000)
            await op9.data_title(page,browser,data_details)
            await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
            await op5.num_details(page, data_details,filter_num,deviceType,google_drive_folder);
            await page.waitForTimeout(2000)
        
            // アテンションマップのスクリーンショット
            await op3.attention_heatmap(page)
            heatmapType = "アテンション"
            await op8.shareLink_click(page)
            await page.waitForTimeout(5000)
            await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
            
        
            filter_num += 1
            await page.waitForTimeout(5000)
            await op11.filter_clear(page)
          }
        }
      } else {
        console.log('filter' + filter_num + '----' + first_hierarchy + ':0:0')
        await page.waitForTimeout(5000)
        //await op15.filter(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy, 0)
        //デバイスタイプの選択
        var deviceType = "pc"
        console.log('pc')
        var heatmapType = "クリック"
        data_details = []
        await page.waitForTimeout(10000)
        await op6.select_device_pc(page, browser, deviceType, viewportHeight, viewportWidth, study_page)
        await page.waitForTimeout(5000)
        await op1.page_analytics(page,deviceType)
        await page.waitForTimeout(5000)
        await op2.click_heatmap(page)
        await page.waitForTimeout(5000)
        await op8.shareLink_click(page)
        await page.waitForTimeout(5000)
        await op9.data_title(page,browser,data_details)
        await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
        await op5.num_details(page, data_details,filter_num,deviceType,google_drive_folder);
        await page.waitForTimeout(2000)
    
        // アテンションマップのスクリーンショット
        await op3.attention_heatmap(page)
        heatmapType = "アテンション"
        await op8.shareLink_click(page)
        await page.waitForTimeout(5000)
        await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
        await page.waitForTimeout(3000)
    
        deviceType = "sp"
        var heatmapType = "クリック"
        await page.waitForTimeout(5000)
        console.log('sp')
        data_details = []
        await op7.select_device_sp(page,browser,deviceType,viewportHeight,viewportWidth,study_page)
        await page.waitForTimeout(5000)
        await op1.page_analytics(page,deviceType);
        await page.waitForTimeout(5000)
        await op2.click_heatmap(page)
        await page.waitForTimeout(5000)
        await op8.shareLink_click(page)
        await page.waitForTimeout(5000)
        await op9.data_title(page,browser,data_details)
        await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
        await op5.num_details(page, data_details,filter_num,deviceType,google_drive_folder);
        await page.waitForTimeout(2000)
    
        // アテンションマップのスクリーンショット
        await op3.attention_heatmap(page)
        heatmapType = "アテンション"
        await op8.shareLink_click(page)
        await page.waitForTimeout(5000)
        await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
        
    
        filter_num += 1
        await page.waitForTimeout(5000)
      }
    }
  }
  return operation();
}

// page_analytics
// click_heatmap
// screenshot
// num_details
// attention_heatmap
// screenshot
// num_details
