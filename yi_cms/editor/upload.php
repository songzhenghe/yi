<?php
include("../x.php");
$config=array();

$config['type']=array("flash","img","file");	//�ϴ�����typeֵ

$config['img']=array("jpg","bmp","gif","png","jpeg");	//img�����׺
$config['flash']=array("flv","swf");	//flash�����׺
$config['file']=array("rar","zip","doc","xls","ppt","pdf","jpg","bmp","gif","png","jpeg","swf","flv");	//file�����׺

$config['flash_size']=SYS_UP_FILESIZE;	//�ϴ�flash��С���� byte
$config['img_size']=SYS_UP_FILESIZE;	//�ϴ�img��С����   byte
$config['file_size']=SYS_UP_FILESIZE;	//�ϴ�file��С����  byte

$config['message']="�ϴ��ɹ�";	//�ϴ��ɹ�����ʾ����Ϣ����Ϊ������ʾ

$config['name']=time().rand(0,100000);	//�ϴ�����ļ���������

$sdir    =dirname($_SERVER['PHP_SELF']);
$baseUrl =substr($sdir,0,strpos($sdir,"/yi_cms/editor")).'/'.SYS_UP_FOLDER."/";//ȡ��·�� ��ʽ/userfiles/

$config['flash_dir']=$baseUrl."";	//�ϴ�flash�ļ���ַ �����"/"
$config['img_dir']=$baseUrl."";	    //�ϴ�img�ļ���ַ �����"/"
$config['file_dir']=$baseUrl."";	//�ϴ�img�ļ���ַ �����"/"

$config['site_url']="";	//��վ����ַ ����ͼƬ�ϴ���ĵ�ַ�й� ����"/" ������

//�ļ��ϴ�
uploadfile($prefix,$common_func,$sql_func);

function uploadfile($prefix,$common_func,$sql_func)
{
	global $config;
	//�ж��Ƿ��ǷǷ�����
	if(empty($_GET['CKEditorFuncNum']))
		mkhtml(1,"","����Ĺ��ܵ�������");
	$fn=$_GET['CKEditorFuncNum'];
	if(!in_array($_GET['type'],$config['type']))
		mkhtml(1,"","������ļ���������");
	$type=$_GET['type'];
	if(is_uploaded_file($_FILES['upload']['tmp_name']))
	{
		//�ж��ϴ��ļ��Ƿ�����
		$filearr=pathinfo($_FILES['upload']['name']);
		$filetype=$filearr["extension"];
		//$filearr=explode(".",$_FILES['upload']['name']);
		//$filetype=$filearr[count($filearr)-1];
		if(!in_array($filetype,$config[$type]))
			mkhtml($fn,"","������ļ����ͣ�");
		//�ж��ļ���С�Ƿ����Ҫ��
		if($_FILES['upload']['size']>$config[$type."_size"])
			mkhtml($fn,"","�ϴ����ļ����ܳ���".($config[$type."_size"]/1048576)."MB��");
		$file_abso=$config[$type."_dir"].$config['name'].".".$filetype;
		$file_abso=str_replace('//','/',$file_abso); //ȥ������/
		//$file_host=$_SERVER['DOCUMENT_ROOT'].$file_abso;
		$file_host=UF.$config['name'].".".$filetype;
		if(move_uploaded_file($_FILES['upload']['tmp_name'],$file_host))
		{
			//insert mysql
			$article_id=$_SESSION["article_id"];
			$array=explode("@",$_SESSION["identify"]);
			$name=$config['name'].".".$filetype;
			$add_man=$array[3];
			$add_time=$common_func->nowtime();
			$query="insert into `".$prefix."file` (`id`,`article_id`,`name`,`add_man`,`add_time`) values (NULL,'$article_id','$name','$add_man','$add_time')";
			$sql_func->insert($query,3);
			//insert mysql
			mkhtml($fn,$config['site_url'].$file_abso,$config['message']);
		}
		else
		{
			mkhtml($fn,"","�ļ��ϴ�ʧ�ܣ������ϴ�Ŀ¼���ú�Ŀ¼��дȨ�ޣ�");
		}
	}
}
//���js����
function mkhtml($fn,$fileurl,$message)
{
	$str='<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction('.$fn.', \''.$fileurl.'\', \''.$message.'\');</script>';
	exit($str);
}
?>