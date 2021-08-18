//�ϐ�
var new_date;
var new_title;

// ��Scraping����
function scraping() {
  
  const url = 'URL';
  let fromText = '<ul class="index-info-list">'; // �擾����^�O�̊J�n�w��
  let toText = '</ul>'; // �擾����^�O�̏I���w��

  // �X�N���C�s���O
  var html = UrlFetchApp.fetch(url).getContentText();
  
  // �p�[�X+�K�v�ȓ����̂ݐ؂���
  var date = Parser.data(html).from('<span class="date">').to('</span>').iterate();
  //�ŐV�̂��m�点�L���̓�����ϐ��ɓ����
  var new_date = date[0];
  
  // �p�[�X+�K�v�ȃ^�C�g���̂ݐ؂���z��ɓ����
  var title = Parser.data(html).from('<span class="title">').to('</span>').iterate();
  //�ŐV�̂��m�点�L���̃^�C�g����ϐ��ɓ����
  var new_title = title[0];

  //2021�N7��31�����_�̍ŐV��06.30�i���j�Ȃ̂ł���ȊO(�ŐV��)���
  //�V�^�R���i�̕������܂܂�Ă��āA�L���̓������ŐV�������ꍇ
  if(new_date�@!= '06.30�i���j' && new_title.indexOf('�V�^�R���i') !== -1){
  
    //���[���ɑ��M����
    mailSend(new_date,new_title);

  }
}

//���[�����M
function mailSend(new_date,new_title) {

  const recipient = ['���M�A�h���X1','���M�A�h���X2']; //���M��̃��[���A�h���X
  const subject = '�y�����N���j�b�N�z�̐V�^�R���i���N�`���Ɋւ���V������񂪍X�V����܂���';

  const body = '�y���m�点���e�z\n' + new_title + '\n\n���LURL���N���b�N���ďڍׂ����m�F��������\n'+'URL';


	//���M
    GmailApp.sendEmail(recipient.join(","), subject, body);
    
}