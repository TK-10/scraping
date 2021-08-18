<?php
        // phpQueryの読み込み
        require_once("./phpQuery/phpQuery-onefile.php");
        
        //URLからデータを取得
        $html = file_get_contents("URL");
        //DOM分析
        $doc = phpQuery::newDocument($html);

        // クラス名を指定しお知らせ一覧から最新記事を取得
        $newTitleList = $doc->find(".index-info li:eq(0)");
        
        //最新記事の日付を取得
        $newTitleDate = $doc[".date:eq(0)"]->text();
        
        //2021年7月31日時点の最新が06.30（水）なのでそれ以外(最新)でコロナ関連の記事が投稿されたら通知
        if(strpos($newTitleDate, "06.30（水）") === false && strpos($newTitleList, "コロナ") !== false){
            
            //メール送信
            $to = "送信するメールアドレス";
            $subject = "○○クリニックで最新のコロナ関連記事が投稿されました";
            $message = "下記URLにて詳細をご確認ください";
            $headers = "From: from@example.com";
            mb_send_mail($to, $subject, $message, $headers); 
            
        }
?>
