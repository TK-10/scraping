<?php
        // phpQuery�̓ǂݍ���
        require_once("./phpQuery/phpQuery-onefile.php");
        
        //URL����f�[�^���擾����ꍇ
        $html = file_get_contents("URL");
        //DOM����
        $doc = phpQuery::newDocument($html);

        // �N���X�����w�肵���m�点�ꗗ����ŐV�L�����擾
        $newTitleList = $doc->find(".index-info li:eq(0)");
        
        //�ŐV�L���̓��t���擾
        $newTitleDate = $doc[".date:eq(0)"]->text();
        
        //���݂̍ŐV�L����06.30�i���j�Ȃ̂ŁA06.30�i���j�ȊO�̓��t=�ŐV�L���ŃR���i�֘A�̋L�������e���ꂽ��ʒm
        if(strpos($newTitleDate, "06.30�i���j") === false && strpos($newTitleList, "�R���i") !== false){
            
            //���[�����M
            $to = "���M���郁�[���A�h���X";
            $subject = "�����N���j�b�N�ōŐV�̃R���i�֘A�L�������e����܂���";
            $message = "���LURL�ɂďڍׂ����m�F��������";
            $headers = "From: from@example.com";
            mb_send_mail($to, $subject, $message, $headers); 
            
        }
?>
