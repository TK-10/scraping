//グローバル変数
var new_date;//日付
var new_title;//タイトル
var value;//送信フラグ
var spreadsheet;//スプレッドシート
var sheet;//シート
var range;//セル(A2)

// ■Scraping処理
function scraping() {
  
  const url = 'https://urk-match.jp/';
  let fromText = '<ul class="index-info-list">'; // 取得するタグの開始指定
  let toText = '</ul>'; // 取得するタグの終了指定

  // スクレイピング
  var html = UrlFetchApp.fetch(url).getContentText();
  
  // パース+必要な日時のみ切り取り
  var date = Parser.data(html).from('<span class="date">').to('</span>').iterate();
  //最新のお知らせ記事の日時を変数に入れる
  var new_date = date[0];
  
  // パース+必要なタイトルのみ切り取り配列に入れる
  var title = Parser.data(html).from('<span class="title">').to('</span>').iterate();
  //最新のお知らせ記事のタイトルを変数に入れる
  var new_title = title[0];

  sheetRead();//送信フラグ読み込み
  
  //2021年7月31日時点の最新が06.30（水）なのでそれ以外(最新か)解析
  //新型コロナの文言が含まれていて、記事の日数が最新だった場合
  if(new_date　!= '06.30（水）' && new_title.indexOf('新型コロナ') !== -1){
    if(value === 0){//もし送信フラグが(0:未送信)だった場合のみ
      
      //メールに送信する
      mailSend(new_date,new_title);
    }
  }
}

//送信フラグ読み込み(重複送信防止)
function sheetRead() {
  //現在のスプレッドシートを取得
  spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  //現在のシートを取得
  sheet = spreadsheet.getActiveSheet();
  //指定するセルの範囲（A2）を取得
  range = sheet.getRange("A2");
  //値を取得する
  value = range.getValue();
  
}

//送信フラグ書き込み(重複送信防止)
function sheetInsert() {
  
  range.setValue("1")//送信フラグを更新(0:未送信 1:送信済み)
  
}

//メール送信
function mailSend(new_date,new_title) {

  const recipient = ['メールアドレス1','メールアドレス2']; //送信先のメールアドレス
  const subject = '【上本町リウマチこまちクリニック】の新型コロナワクチンに関する新しい情報が更新されました';

  const body = '【お知らせ内容】\n' + new_title + '\n\n下記URLをクリックして詳細をご確認ください\n'+'https://urk-match.jp/';

  if(new_date　!= '06.30（水）' && new_title.indexOf('新型コロナ') !== -1){

    GmailApp.sendEmail(recipient.join(","), subject, body);
    sheetInsert();//メール送信後に送信フラグを更新
  }
}
