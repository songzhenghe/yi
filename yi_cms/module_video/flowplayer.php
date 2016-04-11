<?php 
include("../x.php");
if(!($_SESSION["auth"]["video"]&LIS)){
	exit("您无权访问本页！");
}
$item_id=$sql_func->inject_check(trim($_GET["item_id"]));
if($item_id!="" and $item_id>0){
	$query="select `title`,`pic`,`pathinfo` from `".$prefix."item` where `id`='$item_id'";
	$info=$sql_func->select($query);
}else{
	exit("参数错误！");
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>内容管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" type="text/javascript" src="<?php echo B_JS;?>flowplayer-3.2.4.min.js"></script>
</head>
<body>
<div align="center">
<a  href="" style="display:block;width:520px;height:330px" id="player"></a> 
<?php 
	if($info["pathinfo"]==1){
?>
<script>
flowplayer("player", "<?php echo B_JS;?>flowplayer.commercial-3.2.5.swf",{
	key: '#$7162d2d730cf607ac6d',
	playlist: [
	<?php 
		if($info["pic"]!="#" and file_exists(UF.$info["pic"])){
	?>
	{
		url: '<?php echo UF2.$info["pic"];?>', 
		scaling: 'orig'
	}
	<?php 
		}
	if($info["pic"]!="#" and file_exists(UF.$info["pic"]) and $info["title"]!="" and file_exists(UF.$info["title"])){
		echo ",";
	}
		if($info["title"]!="" and file_exists(UF.$info["title"])){
	?>
	{
		url: '<?php echo UF2.$info["title"];?>', 
		autoPlay: false,
		autoBuffering: true 
	}
	<?php 
		}
	?>
	]
});
</script>
<?php 
	}else{
?>
<script>
flowplayer("player", "<?php echo B_JS;?>flowplayer.commercial-3.2.5.swf",{
	key: '#$7162d2d730cf607ac6d',
	playlist: [
	<?php 
		if($info["pic"]!="#" and file_exists(UF.$info["pic"])){
	?>
	{
		url: '<?php echo UF2.$info["pic"];?>', 
		scaling: 'orig'
	}
	<?php 
		}
	if($info["pic"]!="#" and file_exists(UF.$info["pic"]) and $info["title"]!=""){
		echo ",";
	}
		if($info["title"]!=""){
	?>
	{
		url: '<?php echo $info["title"];?>', 
		autoPlay: false,
		autoBuffering: true 
	}
	<?php 
		}
	?>
	]
});
</script>
<?php 
	}
?>
</div>
<div style="text-align:center;margin:5px auto 0;color:red;">
<?php 
	if($info["pic"]!="#" and !file_exists(UF.$info["pic"])){
		echo "预览图像不存在！";	
	}
?>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>