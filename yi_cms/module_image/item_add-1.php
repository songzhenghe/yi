<?php 
include("../x.php");
if(!($_SESSION["auth"]["picture"]&ADD)){
	exit("����Ȩ���ʱ�ҳ��");
}
if($_POST["Submit"]){
	$media_id=$_POST["media_id"];
	$alt=$common_func->enter_check($_POST["alt"],"string",300,"#");
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$array=explode("@",$_SESSION["identify"]);
	$add_man=$array[3];
	$add_time=$common_func->nowtime();
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($media_id!="" and $_FILES["file"]["name"]!="" and $add_man!="" and $add_time!="" and $tag!=""){
		$filename=$common_func->fileupload(UF,array(".jpg",".jpeg",".png",".gif"),SYS_UP_FILESIZE/1048576);
		$common_func->resizeimg(200,150,UF,$filename,UF,"s-");
		$title=$filename;
		$pic="s-".$filename;
		$query="insert into `".$prefix."item` (`media_id`,`title`,`alt`,`url`,`pic`,`add_man`,`add_time`,`tag`,`order`,`type`,`pathinfo`) values ('$media_id','$title','$alt','$url','$pic','$add_man','$add_time','$tag','$order','1','1')";
		$sql_func->insert($query,2,"item_add-1.php");
		exit;
	}else{
		echo "<script>alert('�������ࡢ�ļ�����Ϊ�գ�');window.history.back(-1);</script>";
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
<div class="t_center">ͼƬ��Ŀ���</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1" enctype="multipart/form-data">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">��Ŀ��Ϣ���</td>
  </tr>
  <tr>
    <td align="right">�������ࣺ</td>
    <td align="left">
	<select name="media_id">
	  <option value="">ѡ��ͼƬ��Ŀ��������</option>
	  <?php 
	  	$param="select * from `".$prefix."media` where `tag`='1' and `type`='1'";
		$param=$sql_func->mselect($param);
		$sql_func->choose_select($param,"id","name");
		unset($param);
	  ?>
	</select>
	<span class="red">״̬Ϊ�����ء���ͼƬ�����ڴ�û����ʾ</span>
	</td>
  </tr>
  <tr>
    <td align="right">�ļ���</td>
    <td align="left"><input name="file" type="file" class="multi" maxlength="1" accept="gif|jpg|png" /><span class="green">(�ļ���ʽΪJPG|PNG|GIF)</span></td>
  </tr>
  <tr>
    <td align="right">��ע��</td>
    <td align="left"><input name="alt" type="text" class="input" /><span class="green">(0-300�ַ�,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">���ӣ�</td>
    <td align="left"><input name="url" type="text" class="input" /><span class="green">(0-300�ַ�,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">��ʾ��ţ�</td>
    <td align="left"><input name="order" type="text" class="input2" /><span class="green">(���������4λ��������Ĭ��Ϊ1)</span></td>
  </tr>
  <tr>
    <td align="right">״̬��</td>
    <td align="left"><input name="tag" type="radio" value="1" checked="checked" />��ʾ <input name="tag" type="radio" value="0" />����</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">����ˣ�<?php echo $_SESSION[$_SESSION["identify"]];?> | ���ʱ�䣺ϵͳ�Զ���¼ </td>
    </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="�ύ" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="����" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">
        <a href="item_add.php">�л����߼����</a>
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