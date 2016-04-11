<?php 
include("../x.php");
if(!($_SESSION["auth"]["media"]&ADD)){
	exit("您无权访问本页！");
}
if($_POST["Submit"]){
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$type=$_POST["type"];
	$position=$common_func->enter_check($_POST["position"],"number",2,1);
	$array=explode("@",$_SESSION["identify"]);
	$add_man=$array[3];
	$add_time=$common_func->nowtime();
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($name!="" and $type!="" and $add_man!="" and $add_time!="" and $tag!=""){
		$query="select `id` from `".$prefix."media` where `name`='$name' and `type`='$type'";
		if($sql_func->num_rows($query)==0){
			$query="insert into `".$prefix."media` (`name`,`type`,`position`,`add_man`,`add_time`,`tag`,`order`) values ('$name','$type','$position','$add_man','$add_time','$tag','$order')";
			$sql_func->insert($query,2,"media_add.php");
		}else{
			echo "<script>alert('此分类已存在，请输入其它名称！');window.history.back(-1);</script>";
			exit;
		}
	}else{
		echo "<script>alert('名称，类型，状态均不能为空！');window.history.back(-1);</script>";
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
<div class="t_center">媒体分类添加</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">媒体分类信息</td>
  </tr>
  <tr>
    <td align="right">名称：</td>
    <td align="left"><input name="name" type="text" value="" class="input" /> <span class="green">（长度在0-20之间）</span></td>
  </tr>
  <tr>
    <td align="right">类型：</td>
    <td align="left">
	<select name="type">
	  <option value="">选择一种媒体类型</option>
	  <option value="1">图片项目分类</option>
	  <option value="2">视频项目分类</option>
	  <option value="3">音频项目分类</option>
	  <option value="4">flash项目分类</option>
	  <option value="5">链接项目分类</option>
	</select>
	</td>
  </tr>
  <tr>
    <td align="right">位置：</td>
    <td align="left"><input name="position" type="text" value="" class="input2" /> <span class="green">（正整数最大2位，不填则默认为1）</span></td>
  </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left"><input name="order" type="text" value="" class="input2" /> <span class="green">（正整数最大4位，不填则默认为1）</span></td>
  </tr>
  <tr>
    <td align="right">状态：</td>
    <td align="left"><input name="tag" type="radio" value="1" checked="checked" />显示 <input name="tag" type="radio" value="0" />隐藏</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]];?> | 添加时间：系统自动记录</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="重置" /></td>
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