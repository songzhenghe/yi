<?php 
include("../x.php");
$user_name=$_SESSION[$_SESSION["identify"]];
$query="select * from `".$prefix."user` where `user_name`='$user_name'";
$info=$sql_func->select($query);
if($_POST["Submit_1"]){
	$array=explode("@",$_SESSION["identify"]);
	$id=$array[3];
	$user_name=trim($_POST["user_name"]);
	$user_password=trim($_POST["user_password"]);
	if($user_name!="" and $user_password!=""){
		define(ALL,"yi_cms");
		if(md5($user_password.ALL)==$info["user_password"]){
			$query="select `id` from `".$prefix."user` where `user_name`='$user_name'";
			if($sql_func->num_rows($query)==0){
				$query="update `".$prefix."user` set `user_name`='$user_name' where `id`='$id'";
				$sql_func->update($query,"1");
				echo "<script>alert('Ϊ��ʹ������Ч�������µ�½��');window.parent.location.href='logout.php';</script>";
				exit;
			}else{
				echo "<script>alert('�û����Ѵ��ڣ��������������ƣ�');location.href='safe_edit.php';</script>";
				exit;
			}
		}else{
			echo "<script>alert('���벻��ȷ���û����޸�ʧ�ܣ���������ȷ�����룡');window.history.back(-1);</script>";
			exit;
		}
	}else{
		echo "<script>alert('���û�������Ϊ�գ�������1-20֮�䣡���벻��Ϊ�գ�');window.history.back(-1);</script>";
		exit;
	}
}
if($_POST["Submit_2"]){
	$array=explode("@",$_SESSION["identify"]);
	$id=$array[3];
	$old_password=trim($_POST["old_password"]);
	$new_password=trim($_POST["new_password"]);
	if($old_password!="" and strlen($new_password)>0 and strlen($new_password)<=32){
		define(ALL,"yi_cms");
		if(md5($old_password.ALL)==$info["user_password"]){
			$new_password=md5($new_password.ALL);
			$query="update `".$prefix."user` set `user_password`='$new_password' where `id`='$id'";
			$sql_func->update($query,"2","safe_edit.php");
			exit;
		}else{
			echo "<script>alert('�����벻��ȷ�����������룡');window.history.back(-1);</script>";
			exit;
		}
	}else{
		echo "<script>alert('�¾����벻��Ϊ���ұ�����ȣ�������1-20֮�䣡');window.history.back(-1);</script>";
		exit;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>���ݹ���ϵͳ</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">��½��Ϣ�޸�</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center"><span class="red">������Ϣ��Ҫ</span></td>
    </tr>
  <tr>
    <td align="right">�û�����</td>
    <td align="left"><span class="red"><?php echo $info["user_name"];?></span></td>
  </tr>
  <tr>
    <td align="right">�ϴε�½��</td>
    <td align="left"><?php echo $info["login_time"];?></td>
  </tr>
  <tr>
    <td align="right">�ϴε�½IP��</td>
    <td align="left"><?php echo $info["login_ip"];?></td>
  </tr>
  <tr>
    <td align="right">��½������</td>
    <td align="left"><?php echo ($info["times"]-1);?>��</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><span class="red">�޸��û���</span></td>
    </tr>
  <tr>
    <td align="right">�û�����</td>
    <td align="left"><input name="user_name" type="text" value="" maxlength="20" class="input" /> <span class="green">(1-20�ַ�)</span></td>
  </tr>
  <tr>
    <td align="right">���룺</td>
    <td align="left">
		<input name="user_password" type="password" class="input" size="20" maxlength="20" /> 
		<span class="green">(Ϊ��֤�޸��û����ɹ�������������ȷ�����룡)</span>	</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit_1" type="submit" class="button" value="�޸��û���" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><span class="red">�޸�����</span></td>
  </tr>
  <tr>
    <td align="right">�����룺</td>
    <td align="left">
		<input name="old_password" type="password" class="input" size="20" maxlength="20" /> 
		<span class="green">(1-20�ַ�)</span>	</td>
  </tr>
  <tr>
    <td align="right">�����룺</td>
    <td align="left">
		<input name="new_password" type="password" class="input" size="20" maxlength="20" /> 
		<span class="green">(1-20�ַ�)</span>	</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit_2" type="submit" class="button" value="�޸�����" /></td>
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