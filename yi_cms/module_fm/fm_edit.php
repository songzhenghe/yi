<?php 
include("../x.php");
if(!($_SESSION["auth"]["fm"]&EDI)){
	exit("����Ȩ���ʱ�ҳ��");
}
$id=$sql_func->inject_check(trim($_GET["id"]));
if($id!="" and $id>0){
	$query="select `note` from `".$prefix."fm` where `id`='$id'";
	$info=$sql_func->select($query);
}else{
	exit("��������");
}
if($_POST["Submit"]){
	$note=$common_func->enter_check($_POST["note"],"string",300,"#");
	if($note!=""){
		$query="update `".$prefix."fm` set `note`='$note' where `id`='$id'";
		$sql_func->update($query,1);
		echo "<script>window.parent.location.reload();</script>";
		exit;
	}else{
		echo "<script>alert('��ע�޸�ʧ�ܣ�');window.history.back(-1);</script>";
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
<div class="t_center">�ļ�����--�༭</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">��ע��</td>
    <td align="left"><textarea name="note" rows="5" cols="20"><?php echo $info["note"];?></textarea><br />
    <span class="green">��������0-300֮�䣬��ѡ��</span>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="�ύ" /></td>
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