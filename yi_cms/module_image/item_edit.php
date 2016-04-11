<?php 
include("../x.php");
if(!($_SESSION["auth"]["picture"]&EDI)){
	exit("您无权访问本页！");
}
$item_id=$sql_func->inject_check(trim($_GET["item_id"]));
if($item_id!="" and $item_id>0){
	$query="select `alt`,`url`,`tag`,`order` from `".$prefix."item` where `id`='$item_id'";
	$info=$sql_func->select($query);
}else{
	exit("参数错误！");
}
if($_POST["Submit"]){
	$alt=$common_func->enter_check($_POST["alt"],"string",300,"#");
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($tag!=""){
		$query="update `".$prefix."item` set `alt`='$alt',`url`='$url',`tag`='$tag',`order`='$order' where `id`='$item_id'";
		$sql_func->update($query,1);
		echo "<script>window.parent.location.reload();</script>";
		exit;
	}else{
		echo "<script>alert('状态不能为空！');window.history.back(-1);</script>";
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
<div class="t_center">图片项目编辑</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">备注：</td>
    <td align="left"><input name="alt" type="text" class="input" value="<?php echo $info["alt"];?>" /> <span class="green">(0-300字符,可选)</span></td>
  </tr>
  <tr>
    <td align="right">链接地址：</td>
    <td align="left"><input name="url" type="text" class="input" value="<?php echo $info["url"];?>" /> <span class="green">(0-300字符,可选)</span></td>
  </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left">
	<input name="order" type="text" class="input2" value="<?php echo $info["order"];?>" /> <span class="green">(正整数最大4位，不填则默认为1)</span>
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