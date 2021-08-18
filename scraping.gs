//変数
var new_date;
var new_title;

// ■Scraping処理
function scraping() {
  
  const url = 'URL';
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

  //2021年7月31日時点の最新が06.30（水）なのでそれ以外(最新か)解析
  //新型コロナの文言が含まれていて、記事の日数が最新だった場合
  if(new_date　!= '06.30（水）' && new_title.indexOf('新型コロナ') !== -1){
  
    //メールに送信する
    mailSend(new_date,new_title);

  }
}

//メール送信
function mailSend(new_date,new_title) {

  const recipient = ['送信アドレス1','送信アドレス2']; //送信先のメールアドレス
  const subject = '【○○クリニック】の新型コロナワクチンに関する新しい情報が更新されました';

  const body = '【お知らせ内容】\n' + new_title + '\n\n下記URLをクリックして詳細をご確認ください\n'+'URL';


	//送信
    GmailApp.sendEmail(recipient.join(","), subject, body);
    
}