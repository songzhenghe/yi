<?php 
include("../x.php");
if(!($_SESSION["auth"]["link"]&ADD)){
	exit("����Ȩ���ʱ�ҳ��");
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
		echo "<script>alert('�������ࡢ���ơ����ӵ�ַ����Ϊ�գ�');location.href='item_add5.php';</script>";
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
<script src='<?php echo B_JS;?>jquery.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MetaData.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MultiFile.js' type="text/javascript"></script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">������Ŀ���</div>
</div>
<div class="bottom">
<form action="" method="post" enctype="multipart/form-data" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">��Ŀ��Ϣ���</td>
  </tr>
  <tr>
    <td align="right">�������ࣺ</td>
    <td align="left">
	<select name="media_id">
	  <option value="">ѡ��������Ŀ��������</option>
	  <?php 
	  	$param="select * from `".$prefix."media` where `tag`='1' and `type`='5'";
		$param=$sql_func->mselect($param);
		$sql_func->choose_select($param,"id","name");
		unset($param);
	  ?>
	</select>
	<span class="red">״̬Ϊ�����ء������ӷ����ڴ�û����ʾ</span>	</td>
  </tr>
  <tr>
    <td align="right">���ƣ�</td>
    <td align="left"><input name="title" type="text" class="input" value="" /> <span class="green">(0-300�ַ�)</span></td>
  </tr>
  <tr>
    <td align="right">��ע��</td>
    <td align="left"><input name="alt" type="text" class="input" value="" /> <span class="green">(0-300�ַ�,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">���ӵ�ַ��</td>
    <td align="left"><input name="url" type="text" class="input" value="" /> <span class="green">(0-300�ַ�)</span></td>
  </tr>
  <tr>
    <td align="right">ͼƬ��</td>
    <td align="left"><input name="file" type="file" class="multi" maxlength="1" accept="jpg" /> <span class="green">(jpgͼƬ��С������2M,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">��ʾ��ţ�</td>
    <td align="left"><input name="order" type="text" class="input2" value="" /> <span class="green">�����������4λ��������Ĭ��Ϊ1��</span></td>
  </tr>
  <tr>
    <td align="right">״̬��</td>
    <td align="left"><input type="radio" name="tag" value="1" checked="checked" />��ʾ <input type="radio" name="tag" value="2" />����</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">����ˣ�<?php echo $_SESSION[$_SESSION["identify"]];?> | ���ʱ�䣺ϵͳ�Զ���¼ </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
	<input name="Submit" type="submit" class="button" value="�ύ" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="����" />
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