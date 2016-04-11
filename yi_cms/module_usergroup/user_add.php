<?php 
include("../x.php");
if($_SESSION["super_admin"]==""){
	exit;
}
if($_POST["Submit"]){
	$user_name=$common_func->enter_check($_POST["user_name"],"string",20);
	$user_password=$common_func->enter_check($_POST["user_password"],"string",20);
	$user_password2=$common_func->enter_check($_POST["user_password2"],"string",20);
	$tag=$_POST["tag"];
	$group_id=$_POST["group_id"];
	if($user_name!="" and $user_password!="" and $user_password2!="" and $user_password==$user_password2 and $group_id!=""){
		$query="select `id` from `".$prefix."user` where `user_name`='$user_name'";
		if($sql_func->num_rows($query)==0){
			define(ALL,"yi_cms");
			$user_password=md5($user_password.ALL);
			$query="insert into `".$prefix."user` (`type`,`user_name`,`user_password`,`tag`,`login_time`,`login_ip`,`times`,`group_id`) values ('2','$user_name','$user_password','$tag','0000-00-00 00:00:00','000.000.000.000','0','$group_id')";
			$sql_func->insert($query,2,"user_add.php");
			exit;
		}else{
			echo "<script>alert('用户名已存在，请输入其它名称！');location.href='user_add.php';</script>";
			exit;
		}
	}else{
		echo "<script>alert('用户名、密码、确认密码、所属组不能为空，且两次密码须相等！');location.href='user_add.php';</script>";
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
<div class="t_center">用户信息管理</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center">添加新用户</td>
  </tr>
  <tr>
    <td align="right">用户名：</td>
    <td align="left"><input name="user_name" type="text" class="input" value="" maxlength="20" /> <span class="green">(1-20字符)</span></td>
  </tr>
  <tr>
    <td align="right">密　码：</td>
    <td align="left"><input name="user_password" type="password" class="input" value="" maxlength="20" /> <span class="green">(1-20字符)</span></td>
  </tr>
  <tr>
    <td align="right">确认密码：</td>
    <td align="left"><input name="user_password2" type="password" class="input" value="" maxlength="20" /> <span class="green">(1-20字符)</span></td>
  </tr>
  <tr>
    <td align="right">状态：</td>
    <td align="left"><input name="tag" type="radio" value="1" checked="checked" />
      启用 <input type="radio" name="tag" value="0" />关闭</td>
  </tr>
  <tr>
    <td align="right">所属组：</td>
    <td align="left">
    <select name="group_id">
	  <option value="">============</option>
	  <?php 
	  	$param="select `id`,`name` from `".$prefix."group` where `name`!='root'";
		$param=$sql_func->mselect($param);
		$sql_func->choose_select($param,"id","name");
		unset($param);
	  ?>
	</select>
    </td>
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