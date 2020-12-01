const puppeteer = require('puppeteer')
const fs = require("fs")
var Jimp =  require("jimp")
var fl1 = require('./filter_add_first')
var fl2 = require('./filter_click_ok')
var fl3 = require('./filter_click_enable')
var fl4 = require('./filter_visit')
var fl5 = require('./filter_narrow_page')
var fl6 = require('./filter_add_from_second')
var fl7 = require('./filter_inflow_source')
var fl8 = require('./filter_seo')
var fl9 = require('./filter_bounce')
var fl10 = require('./filter_unbounce')
var fl11 = require('./filter_select_revisit')
var fl12 = require('./filter_advertise')
var fl20 = require('./filter_close_window')


exports.filter = function(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy, error){
  async function filter() {
    try {
      await fl1.filter_add(page)
    } catch(err) {
      await page.evaluate(() => {
        location.reload(true)
      })
      await fl1.filter_add(page)
    }
    
    if (first_hierarchy == 1) {
      //セッションを選択
      await fl4.filter_visit(page)
      await fl5.narrow_filter(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy, 1)
      
      await fl2.filter_ok(page)
      
      if (second_hierarchy == 1) {
        //SEOを選択
        await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        await page.waitForTimeout(8000)
        await fl7.inflow_source(page)
        await fl8.seo(page, 1)
        

          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          if (third_hierarchy == 1) {
            console.log("セッション：SEO：直帰")//[セッション：SEO：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("セッション：SEO：非直帰")//[セッション：SEO：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[セッション：SEO：CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("セッション：SEO")//[セッション：SEO]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
        
      } else if (second_hierarchy == 2) {
        //広告を選択
        await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        await page.waitForTimeout(8000)
        await fl12.advertise(page)
        

          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          if (third_hierarchy == 1) {
            console.log("セッション：広告：直帰") //[セッション：広告：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("セッション：広告：非直帰") //[セッション：広告：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[セッション：広告：CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("セッション：広告") //[セッション：広告]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
  
          
        } else {
          if (third_hierarchy == 1) {
            console.log("セッション：直帰") //[セッション：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("セッション：非直帰") //[セッション：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[セッション：CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("セッション") //[セッション]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
        }
      


    } else if (first_hierarchy == 2) {
      //回遊を選択
      await fl4.filter_visit(page)
      await fl5.narrow_filter(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy, 0)
    

        await fl2.filter_ok(page)
        await page.waitForTimeout(3000)
        if (second_hierarchy == 1) {
          //SEOを選択
          await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          await page.waitForTimeout(8000)
          await fl7.inflow_source(page)
          await fl8.seo(page, 1)
        

          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          if (third_hierarchy == 1) {
            console.log("回遊：SEO：直帰") //[回遊：SEO：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("回遊：SEO：非直帰") //[回遊：SEO：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[回遊：SEO：CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("回遊：SEO") //[回遊：SEO]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
        
      } else if (second_hierarchy == 2) {
        //広告を選択
        await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        await page.waitForTimeout(8000)
        await fl12.advertise(page)
        

          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          if (third_hierarchy == 1) {
            console.log("回遊：広告：直帰") //[回遊：広告：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("回遊：広告：非直帰") //[回遊：広告：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[回遊：広告：CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("回遊：広告") //[回遊：広告]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
  
        
      } else {
        if (third_hierarchy == 1) {
          console.log("回遊：直帰") //[回遊：直帰]
          await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          await page.waitForTimeout(8000)
          await fl4.filter_visit(page)
          await fl9.bounce(page)
          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          await fl3.enable(page)
          await fl20.filterClose(page)
        } else if (third_hierarchy == 2) {
            console.log("回遊：非直帰") //[回遊：非直帰]
          await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          await page.waitForTimeout(8000)
          await fl4.filter_visit(page)
          await fl10.unbounce(page)
          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          await fl3.enable(page)
          await fl20.filterClose(page)
        } else if (third_hierarchy == 3) {
          //[回遊：CV名]
          //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        } else {
          console.log("回遊") //[回遊]
          await fl3.enable(page)
          await fl20.filterClose(page)
        }
      }

      

    } else if (first_hierarchy == 3) {
      //再訪問を選択
      await fl4.filter_visit(page)
      await fl11.filter_select_revisit(page)
      await fl2.filter_ok(page)
      await page.waitForTimeout(3000)
      if (second_hierarchy == 1) {
        //SEOを選択
        await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        await page.waitForTimeout(8000)
        await fl7.inflow_source(page)
        await fl8.seo(page, 1)

          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          if (third_hierarchy == 1) {
            console.log("再訪問：SEO：直帰") //[再訪問：SEO：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("再訪問：SEO：非直帰") //[再訪問：SEO：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[再訪問：SEO：CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("再訪問：SEO") //[再訪問：SEO]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
        
      } else if (second_hierarchy == 2) {
        //広告を選択
        await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        await page.waitForTimeout(8000)
        await fl12.advertise(page)

          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          if (third_hierarchy == 1) {
            console.log("再訪問：広告：直帰") //[再訪問：広告：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("再訪問：広告：非直帰") //[再訪問：広告：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[再訪問：広告:CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("再訪問：広告") //[再訪問：広告]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
        

      } else {
        if (third_hierarchy == 1) {
          console.log("再訪問：直帰") //[再訪問：直帰]
          await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          await page.waitForTimeout(8000)
          await fl4.filter_visit(page)
          await fl9.bounce(page)
          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          await fl3.enable(page)
          await fl20.filterClose(page)
        } else if (third_hierarchy == 2) {
          console.log("再訪問：非直帰") //[再訪問：非直帰]
          await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          await page.waitForTimeout(8000)
          await fl4.filter_visit(page)
          await fl10.unbounce(page)
          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          await fl3.enable(page)
          await fl20.filterClose(page)
        } else if (third_hierarchy == 3) {
          //[再訪問：CV名]
          //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        } else {
          console.log("再訪問")//[再訪問]
          await fl3.enable(page)
          await fl20.filterClose(page)
        }
      }

/////////////////////////////////////////////////////////////////////////////////////
    } else {
      if (second_hierarchy == 1) {
        //SEOを選択
        await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        await page.waitForTimeout(8000)
        await fl7.inflow_source(page)
        await fl8.seo(page, 1)

          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          if (third_hierarchy == 1) {
            console.log("再訪問：SEO：直帰") //[再訪問：SEO：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("再訪問：SEO：非直帰") //[再訪問：SEO：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[再訪問：SEO：CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("再訪問：SEO") //[再訪問：SEO]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
        
      } else if (second_hierarchy == 2) {
        //広告を選択
        await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        await page.waitForTimeout(8000)
        await fl12.advertise(page)

          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          if (third_hierarchy == 1) {
            console.log("再訪問：広告：直帰") //[再訪問：広告：直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl9.bounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 2) {
            console.log("再訪問：広告：非直帰") //[再訪問：広告：非直帰]
            await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
            await page.waitForTimeout(8000)
            await fl4.filter_visit(page)
            await fl10.unbounce(page)
            await fl2.filter_ok(page)
            await page.waitForTimeout(3000)
            await fl3.enable(page)
            await fl20.filterClose(page)
          } else if (third_hierarchy == 3) {
            //[再訪問：広告:CV名]
            //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          } else {
            console.log("再訪問：広告") //[再訪問：広告]
            await fl3.enable(page)
            await fl20.filterClose(page)
          }
        

      } else {
        if (third_hierarchy == 1) {
          console.log("再訪問：直帰") //[再訪問：直帰]
          await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          await page.waitForTimeout(8000)
          await fl4.filter_visit(page)
          await fl9.bounce(page)
          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          await fl3.enable(page)
          await fl20.filterClose(page)
        } else if (third_hierarchy == 2) {
          console.log("再訪問：非直帰") //[再訪問：非直帰]
          await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
          await page.waitForTimeout(8000)
          await fl4.filter_visit(page)
          await fl10.unbounce(page)
          await fl2.filter_ok(page)
          await page.waitForTimeout(3000)
          await fl3.enable(page)
          await fl20.filterClose(page)
        } else if (third_hierarchy == 3) {
          //[再訪問：CV名]
          //await fl6.filter_add_after(page, narrow_url, first_hierarchy, second_hierarchy, third_hierarchy)
        } else {
          console.log("再訪問")//[再訪問]
          await fl3.enable(page)
          await fl20.filterClose(page)
        }
      }


    }
   
  }
  return filter();
}