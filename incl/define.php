<?php
include_once("permission.php");
date_default_timezone_set("Asia/Shanghai");//时区设置
define('GPC',get_magic_quotes_gpc());//自动转义状态的常量
define('ROOT',substr(str_replace('\\','/',realpath(dirname(__FILE__).'/')),0,-5)."/");//格式 E:/wwwroot/yi_cms/

//自动定义网站相对路径与绝对路径
$dir=substr(str_replace('\\','/',dirname(__FILE__)),strlen($_SERVER['DOCUMENT_ROOT']));
if($dir==""){
	$dir="/";
}else{
	$dir=substr($dir,0,strrpos($dir,"/")+1);
}
define('R_PATH',$dir);//网站相对于根目录的路径，通常为"/"或其它如："/folder_name/"，以"/"结束。
define('URL','http://'.str_replace('//','/',$_SERVER['HTTP_HOST'].'/'.R_PATH));//网站URL绝对路径 如：http://www.example.com/yi_system/
unset($dir);
//
define('CDN','yi_cms'); //网站后台文件夹名称
define('B_CSS',R_PATH.CDN.'/css/');//网站后台css文件夹地址 如：/yi_system/yi_cms/css/
define('B_JS',R_PATH.CDN.'/js/');//网站后台js文件夹地址 如：/yi_system/yi_cms/js/
define('B_IMG',R_PATH.CDN.'/images/');//网站后台图片文件夹地址 如：/yi_system/yi_cms/images/
//
define('INCL',ROOT."incl/");//定义文件包含目录
define("DEL",8);define("LIS",4);define("EDI",2);define("ADD",1);//权限
define('SYS_UP_FOLDER',"userfiles");//定义系统附件文件夹名称
define('SYS_UP_FILESIZE',1024*1024*20);//定义系统附件大小,单位byte,用于大文件上传 如：图片、视频、音频、flash和编辑器部分
define('UF',ROOT.SYS_UP_FOLDER."/");//定义系统附件目录上传用
define('UF2',URL.SYS_UP_FOLDER."/");//定义系统附件目录浏览用
//本文件用于更加具体的项目信息配置
$upload_config=array(
	"folder_name"=>"fm_files",
	"file_type"=>array(".jpg",".jpeg",".png",".gif",".bmp",".psd",".rar",".zip",".7z",".gz",".tar",".doc",".xls",".ppt",".pdf",".txt",".swf",".fla",".flv",".avi",".mov",".mp4",".wmv",".mp3",".wma",".wav"),
	"file_size"=>1024*1024*100
);
//$upload_config仅应用于文件管理中，如fm_upload.php等
?>