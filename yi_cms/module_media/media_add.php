<?php 
include("../x.php");
if(!($_SESSION["auth"]["media"]&ADD)){
	exit("����Ȩ���ʱ�ҳ��");
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
			echo "<script>alert('�˷����Ѵ��ڣ��������������ƣ�');window.history.back(-1);</script>";
			exit;
		}
	}else{
		echo "<script>alert('���ƣ����ͣ�״̬������Ϊ�գ�');window.history.back(-1);</script>";
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
<div class="t_center">ý��������</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">ý�������Ϣ</td>
  </tr>
  <tr>
    <td align="right">���ƣ�</td>
    <td align="left"><input name="name" type="text" value="" class="input" /> <span class="green">��������0-20֮�䣩</span></td>
  </tr>
  <tr>
    <td align="right">���ͣ�</td>
    <td align="left">
	<select name="type">
	  <option value="">ѡ��һ��ý������</option>
	  <option value="1">ͼƬ��Ŀ����</option>
	  <option value="2">��Ƶ��Ŀ����</option>
	  <option value="3">��Ƶ��Ŀ����</option>
	  <option value="4">flash��Ŀ����</option>
	  <option value="5">������Ŀ����</option>
	</select>
	</td>
  </tr>
  <tr>
    <td align="right">λ�ã�</td>
    <td align="left"><input name="position" type="text" value="" class="input2" /> <span class="green">�����������2λ��������Ĭ��Ϊ1��</span></td>
  </tr>
  <tr>
    <td align="right">��ʾ��ţ�</td>
    <td align="left"><input name="order" type="text" value="" class="input2" /> <span class="green">�����������4λ��������Ĭ��Ϊ1��</span></td>
  </tr>
  <tr>
    <td align="right">״̬��</td>
    <td align="left"><input name="tag" type="radio" value="1" checked="checked" />��ʾ <input name="tag" type="radio" value="0" />����</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">����ˣ�<?php echo $_SESSION[$_SESSION["identify"]];?> | ���ʱ�䣺ϵͳ�Զ���¼</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="�ύ" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="����" /></td>
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