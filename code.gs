function findRow(sheet,val,col){
    var dat = sheet.getDataRange().getValues();

    for(var i=1;i<dat.length;i++){
      if(String(dat[i][col-1]) == String(val)){
        return i+1;
      }
    }
    return 0;
  }

function makeGraphData() {

    var objSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var graphSheet = objSpreadsheet.getSheetByName("グラフ");
    var sapporoSheet = objSpreadsheet.getSheetByName("札幌");
    var tokyoSheet = objSpreadsheet.getSheetByName("東京");
    var nahaSheet = objSpreadsheet.getSheetByName("那覇");
    sapporoSheet.unhideRow(sapporoSheet.getRange("A1:A")); // グラフの非表示をリセット
    tokyoSheet.unhideRow(tokyoSheet.getRange("A1:A")); // グラフの非表示をリセット
    nahaSheet.unhideRow(nahaSheet.getRange("A1:A")); // グラフの非表示をリセット

    var startValue = graphSheet.getRange("B2").getValue(); // 開始日の値を取得
    var endValue = graphSheet.getRange("D2").getValue(); // 終了日の値を取得

    var str_row = 0;
    var end_row = 0;

    str_row = findRow(sapporoSheet,startValue,1)
    if(0 == str_row){
        Browser.msgBox("開始日の値がデータ範囲外です", Browser.Buttons.OK);
        return -1
    }
    end_row = findRow(sapporoSheet,endValue,1)
    if(0 == end_row){
        Browser.msgBox("終了日の値がデータ範囲外です", Browser.Buttons.OK);
        return -1
    }
  
    sapporoSheet.hideRow(sapporoSheet.getRange("A"+(end_row+1)+":A"+sapporoSheet.getLastRow()));
    sapporoSheet.hideRow(sapporoSheet.getRange("A2:A"+(str_row+1)));
    tokyoSheet.hideRow(tokyoSheet.getRange("A"+(end_row+1)+":A"+tokyoSheet.getLastRow()));
    tokyoSheet.hideRow(tokyoSheet.getRange("A2:A"+(str_row+1)));
    nahaSheet.hideRow(nahaSheet.getRange("A"+(end_row+1)+":A"+nahaSheet.getLastRow()));
    nahaSheet.hideRow(nahaSheet.getRange("A2:A"+(str_row+1)));
}