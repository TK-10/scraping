<?php
        //phpQueryの読み込み
        require_once("./phpQuery/phpQuery-onefile.php");
        //DB接続情報の読み込み
        require_once("DB.php");
        //idの設定
        $id = 1;
        //URLからデータを取得
        $html = file_get_contents("URL");
        //DOM分析
        $doc = phpQuery::newDocument($html);

        // クラス名を指定しお知らせ一覧から最新記事を取得
        $newTitleList = $doc->find(".index-info li:eq(0)");
        
        //最新記事の日付を取得
        $newTitleDate = $doc[".date:eq(0)"]->text();

//----------------------------------------
//メールの重複送信を防ぐため送信フラグを確認
//----------------------------------------
        try{
           //DB名を引数として渡す
           $pdo = db("tk10");

            //メール送信フラグを取得
            $stmt= $pdo->prepare ("SELECT send_flg FROM t_scraping WHERE id = :id");

            //値をセット
            $stmt->bindParam(':id', $id);

            //クエリ実行
            $ret = $stmt->execute();     

            // 該当するデータを取得
            if( $ret ) {
                $send_flg = $stmt->fetch();//結果を変数に格納(0:未送信 1:送信済み)
            }

        } catch (PDOException $Exception) {
            print "エラー：" . $Exception->getMessage();
        }

        //DB切断
        $pdo = null;
        
 //---------
//メール送信
//----------        
    //送信フラグが未送信で
    if($send_flg　=== 0){
        //2021年7月31日時点の最新が06.30（水）なのでそれ以外(最新)でコロナ関連の記事が投稿されたら通知
        if(strpos($newTitleDate, "06.30（水）") === false && strpos($newTitleList, "コロナ") !== false){
            
            //メール送信
            $to = "送信するメールアドレス";
            $subject = "○○クリニックで最新のコロナ関連記事が投稿されました";
            $message = "下記URLにて詳細をご確認ください";
            $headers = "From: from@example.com";
            mb_send_mail($to, $subject, $message, $headers); 
            
        }
    }
?>
