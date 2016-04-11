<?php 
include("../x.php");
if(!($_SESSION["auth"]["flash"]&LIS)){
	exit("您无权访问本页！");
}
$item_id=$sql_func->inject_check(trim($_GET["item_id"]));
if($item_id!="" and $item_id>0){
	$query="select `title`,`pathinfo` from `".$prefix."item` where `id`='$item_id'";
	$info=$sql_func->select($query);
}else{
	exit("参数错误！");
}
if($info["pathinfo"]==1){
	$path=UF2.$info["title"];
}else{
	$path=$info["title"];
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>内容管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div align="center">
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="450" height="350" id="<?php echo $path;?>" align="middle">
<param name="allowScriptAccess" value="sameDomain" />
<param name="movie" value="<?php echo $path;?>" />
<param name="quality" value="high" />
<param name="bgcolor" value="#ffffff" />
<embed src="<?php echo $path;?>" quality="high" bgcolor="#ffffff" width="450" height="350" name="<?php echo $path;?>" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
</object>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>