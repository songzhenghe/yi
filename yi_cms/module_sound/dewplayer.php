<?php 
include("../x.php");
$item_id=$sql_func->inject_check(trim($_GET["item_id"]));
if($item_id!="" and $item_id>0){
	$query="select `title`,`pic`,`pathinfo` from `".$prefix."item` where `id`='$item_id'";
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
<script language="JavaScript" type="text/javascript" src="<?php echo B_JS;?>swfobject.js"></script>
</head>
<body style="text-align:center;">
<div id="dewplayer_content">
<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="135" height="50" id="dewplayer" type="application/x-shockwave-flash">
<param name="allowScriptAccess" value="sameDomain" />
<param name="movie" value="<?php echo B_JS;?>dewplayer-stream.swf?mp3=<?php echo $path;?>" />
<param name="quality" value="high" />
<param name="bgcolor" value="#ffffff" />
<param name="wmode" value="transparent" />
<embed src="<?php echo B_JS;?>dewplayer-stream.swf?mp3=<?php echo $path;?>" wmode="transparent" quality="high" bgcolor="#ffffff" width="135" height="50" name="dewplayer"  allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
</object>
<script type="text/javascript">
var flashvars = {
  mp3: "<?php echo $path;?>"
};
var params = {
  wmode: "transparent"
};
var attributes = {
  id: "dewplayer"
};
swfobject.embedSWF("<?php echo B_JS;?>dewplayer-stream.swf", "dewplayer_content", "135", "50", "9.0.0", false, flashvars, params, attributes);
</script>
</div>
<?php 
//	if($info["pic"]!="#" and file_exists(UF.$info["pic"])){
//		echo "<img src=\"".UF2.$info["pic"]."\" width=\"200\" height=\"200\" />";
//	}else{
//		echo "预览图片未设置或已被删除！";
//	}
?>
</body>
</html>
<?php
	include(INCL."close.php");
?>