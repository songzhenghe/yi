<?php 
include("../x.php");
if(!($_SESSION["auth"]["media"]&EDI)){
	exit("您无权访问本页！");
}
$media_id=$sql_func->inject_check(trim($_GET["media_id"]));
if($media_id!="" and $media_id>0){
	$query="select `name`,`position`,`tag`,`order` from `".$prefix."media` where `id`='$media_id'";
	$info=$sql_func->select($query);
}else{
	exit("参数错误！");
}
if($_POST["Submit"]){
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$position=$common_func->enter_check($_POST["position"],"number",2,1);
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($name!="" and $tag!=""){
		$query="update `".$prefix."media` set `name`='$name',`position`='$position',`tag`='$tag',`order`='$order' where `id`='$media_id'";
		$sql_func->update($query,1);
		echo "<script>window.parent.location.reload();</script>";
		exit;
	}else{
		echo "<script>alert('名称，状态均不能为空！');window.history.back(-1);</script>";
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
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">媒体分类编辑</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">名称：</td>
    <td align="left"><input name="name" type="text" value="<?php echo $info["name"];?>" class="input"/> <span class="green">（长度在0-20之间）</span></td>
  </tr>
  <tr>
    <td align="right">位置：</td>
    <td align="left">
	<input name="position" type="text" value="<?php echo $info["position"];?>" class="input2" /> <span class="green">（正整数最大2位，不填则默认为1）</span>
	</td>
  </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left">
	<input name="order" type="text" value="<?php echo $info["order"];?>" class="input2" /> <span class="green">（正整数最大4位，不填则默认为1）</span>
	</td>
  </tr>
  <tr>
    <td align="right">状态：</td>
    <td align="left">
	<input name="tag" type="radio" value="1" <?php if($info["tag"]==1){echo "checked=\"checked\"";}?> />显示
	<input name="tag" type="radio" value="0" <?php if($info["tag"]==0){echo "checked=\"checked\"";}?>  />隐藏
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="提交" /></td>
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