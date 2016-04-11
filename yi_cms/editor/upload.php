<?php
include("../x.php");
$config=array();

$config['type']=array("flash","img","file");	//上传允许type值

$config['img']=array("jpg","bmp","gif","png","jpeg");	//img允许后缀
$config['flash']=array("flv","swf");	//flash允许后缀
$config['file']=array("rar","zip","doc","xls","ppt","pdf","jpg","bmp","gif","png","jpeg","swf","flv");	//file允许后缀

$config['flash_size']=SYS_UP_FILESIZE;	//上传flash大小上限 byte
$config['img_size']=SYS_UP_FILESIZE;	//上传img大小上限   byte
$config['file_size']=SYS_UP_FILESIZE;	//上传file大小上限  byte

$config['message']="上传成功";	//上传成功后显示的消息，若为空则不显示

$config['name']=time().rand(0,100000);	//上传后的文件命名规则

$sdir    =dirname($_SERVER['PHP_SELF']);
$baseUrl =substr($sdir,0,strpos($sdir,"/yi_cms/editor")).'/'.SYS_UP_FOLDER."/";//取得路径 格式/userfiles/

$config['flash_dir']=$baseUrl."";	//上传flash文件地址 后面加"/"
$config['img_dir']=$baseUrl."";	    //上传img文件地址 后面加"/"
$config['file_dir']=$baseUrl."";	//上传img文件地址 后面加"/"

$config['site_url']="";	//网站的网址 这与图片上传后的地址有关 最后加"/" 可留空

//文件上传
uploadfile($prefix,$common_func,$sql_func);

function uploadfile($prefix,$common_func,$sql_func)
{
	global $config;
	//判断是否是非法调用
	if(empty($_GET['CKEditorFuncNum']))
		mkhtml(1,"","错误的功能调用请求！");
	$fn=$_GET['CKEditorFuncNum'];
	if(!in_array($_GET['type'],$config['type']))
		mkhtml(1,"","错误的文件调用请求！");
	$type=$_GET['type'];
	if(is_uploaded_file($_FILES['upload']['tmp_name']))
	{
		//判断上传文件是否允许
		$filearr=pathinfo($_FILES['upload']['name']);
		$filetype=$filearr["extension"];
		//$filearr=explode(".",$_FILES['upload']['name']);
		//$filetype=$filearr[count($filearr)-1];
		if(!in_array($filetype,$config[$type]))
			mkhtml($fn,"","错误的文件类型！");
		//判断文件大小是否符合要求
		if($_FILES['upload']['size']>$config[$type."_size"])
			mkhtml($fn,"","上传的文件不能超过".($config[$type."_size"]/1048576)."MB！");
		$file_abso=$config[$type."_dir"].$config['name'].".".$filetype;
		$file_abso=str_replace('//','/',$file_abso); //去除多余/
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
			mkhtml($fn,"","文件上传失败，请检查上传目录设置和目录读写权限！");
		}
	}
}
//输出js调用
function mkhtml($fn,$fileurl,$message)
{
	$str='<script type="text/javascript">window.parent.CKEDITOR.tools.callFunction('.$fn.', \''.$fileurl.'\', \''.$message.'\');</script>';
	exit($str);
}
?>