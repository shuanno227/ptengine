//・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・・//
// 数値詳細のデータを配列をCSVに変換・保存
var fs = require('fs');
exports.exportCSV = function(array,filter_num,deviceType,google_drive_folder) {
  function exportCSV() {
    var formatCSV = '';
    for (var m = 0; m < array.length; m++) {
      var value = array[m];
  
      for (var n = 0; n < value.length; n++) { var innerValue = value[n]===null?'':value[n].toString(); var result = innerValue.replace(/"/g, '""'); if (result.search(/("|,|\n)/g) >= 0)
      result = '"' + result + '"';
      if (n > 0)
      formatCSV += ',';
      formatCSV += result;
      }
      formatCSV += '\n';
    }
    fs.writeFile(`/Users/shuanno/Google Drive File Stream/マイドライブ/${google_drive_folder}/Filter${filter_num}-${deviceType}.csv`, formatCSV, 'utf8', function (err) {
      if (err) {
        console.log(err)
        console.log('保存できませんでした');
      } else {
        console.log('保存できました');
      }
    });
  }
  return exportCSV();
}