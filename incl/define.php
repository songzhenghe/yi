<?php
include_once("permission.php");
date_default_timezone_set("Asia/Shanghai");//ʱ������
define('GPC',get_magic_quotes_gpc());//�Զ�ת��״̬�ĳ���
define('ROOT',substr(str_replace('\\','/',realpath(dirname(__FILE__).'/')),0,-5)."/");//��ʽ E:/wwwroot/yi_cms/

//�Զ�������վ���·�������·��
$dir=substr(str_replace('\\','/',dirname(__FILE__)),strlen($_SERVER['DOCUMENT_ROOT']));
if($dir==""){
	$dir="/";
}else{
	$dir=substr($dir,0,strrpos($dir,"/")+1);
}
define('R_PATH',$dir);//��վ����ڸ�Ŀ¼��·����ͨ��Ϊ"/"�������磺"/folder_name/"����"/"������
define('URL','http://'.str_replace('//','/',$_SERVER['HTTP_HOST'].'/'.R_PATH));//��վURL����·�� �磺http://www.example.com/yi_system/
unset($dir);
//
define('CDN','yi_cms'); //��վ��̨�ļ�������
define('B_CSS',R_PATH.CDN.'/css/');//��վ��̨css�ļ��е�ַ �磺/yi_system/yi_cms/css/
define('B_JS',R_PATH.CDN.'/js/');//��վ��̨js�ļ��е�ַ �磺/yi_system/yi_cms/js/
define('B_IMG',R_PATH.CDN.'/images/');//��վ��̨ͼƬ�ļ��е�ַ �磺/yi_system/yi_cms/images/
//
define('INCL',ROOT."incl/");//�����ļ�����Ŀ¼
define("DEL",8);define("LIS",4);define("EDI",2);define("ADD",1);//Ȩ��
define('SYS_UP_FOLDER',"userfiles");//����ϵͳ�����ļ�������
define('SYS_UP_FILESIZE',1024*1024*20);//����ϵͳ������С,��λbyte,���ڴ��ļ��ϴ� �磺ͼƬ����Ƶ����Ƶ��flash�ͱ༭������
define('UF',ROOT.SYS_UP_FOLDER."/");//����ϵͳ����Ŀ¼�ϴ���
define('UF2',URL.SYS_UP_FOLDER."/");//����ϵͳ����Ŀ¼�����
//���ļ����ڸ��Ӿ������Ŀ��Ϣ����
$upload_config=array(
	"folder_name"=>"fm_files",
	"file_type"=>array(".jpg",".jpeg",".png",".gif",".bmp",".psd",".rar",".zip",".7z",".gz",".tar",".doc",".xls",".ppt",".pdf",".txt",".swf",".fla",".flv",".avi",".mov",".mp4",".wmv",".mp3",".wma",".wav"),
	"file_size"=>1024*1024*100
);
//$upload_config��Ӧ�����ļ������У���fm_upload.php��
?>