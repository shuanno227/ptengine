//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// Ptengineの操作（ヒートマップ一覧画面までの操作）
const puppeteer = require('puppeteer');
const fs = require("fs");
var Jimp = require("jimp");

exports.ptLogin = function(page, email, password, profile) {
  async function ptLogin() {
    
    await page.type('input[type="text"]', email);
    await page.waitForTimeout(3000);
    await page.type('input[type="password"]', password);
    await page.waitForTimeout(3000);
    await page.click('button');

    let profile_selector = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-datacenter > header > div > nav > div.pt-header-container-fluid.clearfix > ul > li.pt-fl.pt-header-profile-wrap.pt-h56.js-tours__profile_list > div'
    let profile_selector_input = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-datacenter > header > div > nav > div.pt-header-container-fluid.clearfix > ul > li.pt-fl.pt-header-profile-wrap.pt-h56.js-tours__profile_list > div > div.pt-light-panel.pt-transition.pt-header-whitecolor.pt-dropdown-select-list.pt-header-profile-dropbox.pt-panel-shadow.js-pt-header-hover-dropdown > div.pt-search.pt-mb10 > div > input'
    let profile_selector_search = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-datacenter > header > div > nav > div.pt-header-container-fluid.clearfix > ul > li.pt-fl.pt-header-profile-wrap.pt-h56.js-tours__profile_list > div > div.pt-light-panel.pt-transition.pt-header-whitecolor.pt-dropdown-select-list.pt-header-profile-dropbox.pt-panel-shadow.js-pt-header-hover-dropdown > ul > li > div > a'
    await page.waitForTimeout(5000)
    await page.waitForSelector(profile_selector, {timeout : 120000})
    await page.click(profile_selector)
    await page.waitForTimeout(3000)
    await page.waitForSelector(profile_selector_input, {timeout : 120000})
    await page.type(profile_selector_input, profile)
    await page.waitForTimeout(3000)
    await page.waitForSelector(profile_selector_search, {timeout : 120000})
    await page.click(profile_selector_search)
    await page.waitForTimeout(5000)
    let heatmap = 'body > div.ng-scope > div.js-pt-main-outward.pt-main.ng-scope.pt-container-outward-datacenter > header > div > nav > div.pt-header-submenu > ul > li:nth-child(4)'
    await page.waitForSelector(heatmap, {timeout : 120000});
    await page.click(heatmap)
    await page.waitForNavigation()
  }
  return ptLogin();
}