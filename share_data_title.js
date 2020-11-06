//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// 調査期間とセグメント条件を配列に格納

const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");
var op1 = require('./share_hidden_element')
var op2 = require('./share_change_heatmap_color')

exports.data_title = function(page,browser,data_details) {
  async function data_title(){


    var data_title_array = []
    const pages = await browser.pages();
    const page2 = pages[pages.length-1];
    await page2.bringToFront();

    
    data_title_array.push("計測範囲")
    await page.waitForTimeout(2000)
    var study_period_content_dom = "span.js-heatmap-description-page-date"
    var study_period_content = await page2.evaluate((selector) => {
      return document.querySelector(selector).innerText;
    }, study_period_content_dom) 
    data_title_array.push(study_period_content)

    data_details.push(data_title_array)

    data_title_array = []

    data_title_array.push("セグメント条件")
    
    var title_content_selector = "span.js-heatmap-description-page-filter-text"
    var title_content = await page2.evaluate((selector) => {
      return document.querySelector(selector).innerText;
    },title_content_selector)
    data_title_array.push(title_content)

    data_details.push(data_title_array)

    await op1.arise_hidden_element(page2)
    await op2.heatmap_color(page2);
    
  }
  return data_title();
}