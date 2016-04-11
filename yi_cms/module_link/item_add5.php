<?php 
include("../x.php");
if(!($_SESSION["auth"]["link"]&ADD)){
	exit("您无权访问本页！");
}
if($_POST["Submit"]){
	$media_id=$_POST["media_id"];
	$title=$common_func->enter_check($_POST["title"],"string",300);
	$alt=$common_func->enter_check($_POST["alt"],"string",300,"#");
	$url=$common_func->enter_check($_POST["url"],"string",300);
	if($_FILES["file"]["name"]!=""){
		$pic=$common_func->fileupload(UF,array(".jpg"),2);
	}else{
		$pic="#";
	}
	$array=explode("@",$_SESSION["identify"]);
	$add_man=$array[3];
	$add_time=$common_func->nowtime();
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($media_id!="" and $title!="" and $url!=""){
		$query="insert into `".$prefix."item` (`media_id`,`title`,`alt`,`url`,`pic`,`add_man`,`add_time`,`tag`,`order`,`type`,`pathinfo`) values ('$media_id','$title','$alt','$url','$pic','$add_man','$add_time','$tag','$order','5','2')";
		$sql_func->insert($query,2,"item_add5.php");
		exit;
	}else{
		echo "<script>alert('所属分类、名称、链接地址不能为空！');location.href='item_add5.php';</script>";
		exit;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>内容管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<script src='<?php echo B_JS;?>jquery.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MetaData.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MultiFile.js' type="text/javascript"></script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">链接项目添加</div>
</div>
<div class="bottom">
<form action="" method="post" enctype="multipart/form-data" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">项目信息添加</td>
  </tr>
  <tr>
    <td align="right">所属分类：</td>
    <td align="left">
	<select name="media_id">
	  <option value="">选择链接项目所属分类</option>
	  <?php 
	  	$param="select * from `".$prefix."media` where `tag`='1' and `type`='5'";
		$param=$sql_func->mselect($param);
		$sql_func->choose_select($param,"id","name");
		unset($param);
	  ?>
	</select>
	<span class="red">状态为‘隐藏’的链接分类在此没有显示</span>	</td>
  </tr>
  <tr>
    <td align="right">名称：</td>
    <td align="left"><input name="title" type="text" class="input" value="" /> <span class="green">(0-300字符)</span></td>
  </tr>
  <tr>
    <td align="right">备注：</td>
    <td align="left"><input name="alt" type="text" class="input" value="" /> <span class="green">(0-300字符,可选)</span></td>
  </tr>
  <tr>
    <td align="right">链接地址：</td>
    <td align="left"><input name="url" type="text" class="input" value="" /> <span class="green">(0-300字符)</span></td>
  </tr>
  <tr>
    <td align="right">图片：</td>
    <td align="left"><input name="file" type="file" class="multi" maxlength="1" accept="jpg" /> <span class="green">(jpg图片大小不超过2M,可选)</span></td>
  </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left"><input name="order" type="text" class="input2" value="" /> <span class="green">（正整数最大4位，不填则默认为1）</span></td>
  </tr>
  <tr>
    <td align="right">状态：</td>
    <td align="left"><input type="radio" name="tag" value="1" checked="checked" />显示 <input type="radio" name="tag" value="2" />隐藏</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]];?> | 添加时间：系统自动记录 </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
	<input name="Submit" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="重置" />
	</td>
  </tr>
</table>
</form>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>