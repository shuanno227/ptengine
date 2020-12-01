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
var op15 = require('./filter');
//const { pagespeedonline } = require('googleapis/build/src/apis/pagespeedonline');


var data_details = []
var filter_num = 1
var filter_window_open = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-btn.pt-transition.js-pt-filter-pull.pt-svg-layer.js-pt-filter-red-circle"
var filter_window_close = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > a.pt-mod-filter-packup.pt-transition.js-pt-filter-packup.pt-svg-layer"
var filter_add_button = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mb30.pt-mod-filter-add.js-mod-filter-add"
var ryuunyuu_button = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(2)"


exports.operation = function(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder) {
  async function operation() {
    var first_hierarchy
    var second_hierarchy
    var third_hierarchy
    
    for (first_hierarchy = 0; first_hierarchy <= 3; first_hierarchy++) {
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


          // exports.operation = function(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder) {
          //   async function operation() {
             
          
          //     // var deviceType = "pc"
          //     // console.log('pc')
          //     // var heatmapType = "クリック"
          //     // data_details = []
          //     // await page.waitForTimeout(10000)
          //     // await op6.select_device_pc(page, browser, deviceType, viewportHeight, viewportWidth, study_page)
          //     // await page.waitForTimeout(5000)
          //     // await op1.page_analytics(page,deviceType)
          //     // await page.waitForTimeout(5000)
          //     // await op2.click_heatmap(page)
          //     // await page.waitForTimeout(5000)
          //     // await op8.shareLink_click(page)
          //     // await page.waitForTimeout(5000)
          //     // await op9.data_title(page,browser,data_details)
          //     // await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
          //     // await op5.num_details(page, data_details,filter_num,deviceType,google_drive_folder);
          //     // await page.waitForTimeout(2000)
          
          //     // // アテンションマップのスクリーンショット
          //     // await op3.attention_heatmap(page)
          //     // heatmapType = "アテンション"
          //     // await op8.shareLink_click(page)
          //     // await page.waitForTimeout(5000)
          //     // await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
          //     // await page.waitForTimeout(3000)
          
          
              
          
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          
          //     // // 検索エンジンを含む
          //     // await page.waitForTimeout(10000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //      var visit_variety = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(2) > span"
          //     // await page.waitForSelector(visit_variety, {timeout : 120000})
          //     // await page.click(visit_variety)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(1)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(3) > label')
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // // 検索エンジンを含まない
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
              
          //     // await page.waitForSelector(visit_variety, {timeout : 120000})
          //     // await page.click(visit_variety)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(1)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div:nth-child(2) > label:nth-child(4)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(3) > label')
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // CV名：「売り出されたら教えて」含める
              
          //     // await page.waitForTimeout(5000)
          //     // console.log('check')
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //     // var cv_button = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(5)"
          //     // await page.waitForTimeout(5000)
          //     // await page.click(cv_button)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(2)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // // CV名：「売り出されたら教えて」含めない
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //     // var cv_button = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(5)"
          //     // await page.waitForTimeout(5000)
          //     // await page.click(cv_button)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div:nth-child(2) > label:nth-child(4)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(2)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // // CV名：「ゴール全て」含める
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //     // var cv_button = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(5)"
          //     // await page.waitForTimeout(5000)
          //     // await page.click(cv_button)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(3)')
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // // CV名：「ゴール全て」含めない
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //     // var cv_button = "body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(5)"
          //     // await page.waitForTimeout(5000)
          //     // await page.click(cv_button)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div:nth-child(2) > label:nth-child(4)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(3)')
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // 直帰
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(1)')
          //     // await page.waitForTimeout(5000)
              
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(3)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(2) > label')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // // 非直帰
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(1)')
          //     // await page.waitForTimeout(5000)
              
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(3)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > ul > li:nth-child(3) > label')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // // 「tokyo」を含む
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(4) > span')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(2)')
          //     // await page.waitForTimeout(5000)
              
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > div > ul > li:nth-child(2) > label')
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          //     // // 「tokyo」含まない
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_add_button)
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-column.pop-layer.js-mod-filter-column > ul > li:nth-child(4) > span')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-dimension.pop-layer.js-mod-filter-dimension > ul > li:nth-child(2)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div:nth-child(2) > label:nth-child(4)')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > div.list.pt-tl > div > ul > li:nth-child(2) > label')
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-tc.pt-mod-filter-choice.pt-pl20.pt-pr20.pop-layer.js-mod-filter-choice > footer > button.pt-btn.btn-large.pt-mt30.pt-mb10.js-mod-filter-sub-type-ok')
          //     // await page.waitForTimeout(5000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > button.pt-m-auto.pt-btn.btn-large.pt-mt30.pt-mod-filter-enable.js-mod-filter-enable')
          //     // await page.waitForTimeout(3000)
          //     // await page.click(filter_window_close)
          //     // await sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder);
          //     // await page.waitForTimeout(5000)
          //     // await page.click(filter_window_open)
          //     // await page.waitForTimeout(3000)
          //     // await page.click('body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-heatmap > div.pt-container-fluid.js-container-fluid > section > article.pt-mod-filter-add.pt-tc.base-layer.js-mod-filter-base-layer > footer > a')
              
          
          //   }
          //   return operation();
          // }
          
          // async function sp_operation(page,browser,viewportHeight,viewportWidth,study_page,narrow_url,google_drive_folder){
          //   var heatmapType = "クリック"
          //   var deviceType = 'sp'
          //   await page.waitForTimeout(5000)
          //   console.log('sp')
          //   data_details = []
          //   await op7.select_device_sp(page,browser,deviceType,viewportHeight,viewportWidth,study_page)
          //   await page.waitForTimeout(5000)
          //   await op1.page_analytics(page,deviceType);
          //   await page.waitForTimeout(5000)
          //   await op2.click_heatmap(page)
          //   await page.waitForTimeout(5000)
          //   await op8.shareLink_click(page)
          //   await page.waitForTimeout(5000)
          //   await op9.data_title(page,browser,data_details)
          //   await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
          //   await op5.num_details(page, data_details,filter_num,deviceType,google_drive_folder);
          //   await page.waitForTimeout(2000)
          
          //   // アテンションマップのスクリーンショット
          //   await op3.attention_heatmap(page)
          //   heatmapType = "アテンション"
          //   await op8.shareLink_click(page)
          //   await page.waitForTimeout(5000)
          //   await op4.screenshot(page,browser,heatmapType,deviceType,viewportHeight,viewportWidth,data_details,filter_num,google_drive_folder)
            
          //   filter_num += 1
          
          
          
          
          // }