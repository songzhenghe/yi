<?php 
include("../x.php");
if(!($_SESSION["auth"]["video"]&ADD)){
	exit("����Ȩ���ʱ�ҳ��");
}
if($_POST["Submit"]){
	$media_id=$_POST["media_id"];
	$type=$_POST["type"];
	$title=($type==1)?($_FILES["file2"]["name"]):($_POST["title"]);
	$alt=$common_func->enter_check($_POST["alt"],"string",300,"#");
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	$pathinfo=($type==1)?"1":"2";
	if($media_id!="" and $title!=""){
		if($_FILES["file"]["name"]!=""){
			$pic=$common_func->fileupload(UF,array(".jpg"),2);
		}else{
			$pic="#";
		}
		if($_FILES["file2"]["name"]!="" and $type==1){
			$title=$common_func->fileupload(UF,array(".flv"),SYS_UP_FILESIZE/1048576,"file2");
		}else{
			$title=$common_func->enter_check($_POST["title"],"string",300);	
		}
		$array=explode("@",$_SESSION["identify"]);
		$add_man=$array[3];
		$add_time=$common_func->nowtime();
		$query="insert into `".$prefix."item` (`media_id`,`title`,`alt`,`url`,`pic`,`add_man`,`add_time`,`tag`,`order`,`type`,`pathinfo`) values ('$media_id','$title','$alt','$url','$pic','$add_man','$add_time','$tag','$order','2','$pathinfo')";
		$sql_func->insert($query,3);
		echo "<script>alert('���ݱ���ɹ���');location.href='item_add-2.php';</script>";
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
<link type="text/css" media="screen" rel="stylesheet" href="<?php echo B_CSS;?>colorbox.css" />
<script type="text/javascript" src="<?php echo B_JS;?>jquery.js"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script src='<?php echo B_JS;?>jquery.MetaData.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MultiFile.js' type="text/javascript"></script>
<script>
$(document).ready(function(){
	$(".example1").colorbox({width:"1000px", height:"600px", iframe:true});
	$(".type").change(function(){
		if($(this).attr("value")=="1"){
			$("#title1").show();
			$("#title2").hide();
			$("#title2 input[name='title']").attr("value","");
		}else{
			$("#title2").show();
			$("#title1").hide();
		}
	});
});
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">��Ƶ��Ŀ���</div>
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
	  <option value="">ѡ����Ƶ��Ŀ��������</option>
	  <?php 
	  	$param="select * from `".$prefix."media` where `tag`='1' and `type`='2'";
		$param=$sql_func->mselect($param);
		$sql_func->choose_select($param,"id","name");
		unset($param);
	  ?>
	</select>
	<span class="red">״̬Ϊ�����ء�����Ƶ�����ڴ�û����ʾ</span>
	</td>
  </tr>
  <tr>
    <td align="right">���ͣ�</td>
    <td align="left">
	<select name="type" class="type">
	  <option value="1">�����ϴ���Ƶ</option>
	  <option value="2">��������ŵ�ַ</option>
    </select>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
	<div id="title1">
    	�ļ���<input name="file2" type="file" class="multi" maxlength="1" accept="flv" />
		<span class="green">(�ļ���ʽΪFLV)</span>
	</div>
	<div id="title2" style="display:none;">
		�������ļ���ַ��<input name="title" type="text" value="" class="input" /> <span class="green">�磺��/fm_files/video.flv��"/"������վ��Ŀ¼��֧��http��</span><br />
        <input type="button" class="example1 button" value="���ļ��������ѡ��" href="../module_fm/fm_getinfo.php" />&nbsp;&nbsp;
    	<input type="button" class="example1 button" value="ͨ���ļ������ϴ����ļ�" href="../module_fm/fm_upload.php" />
	</div>
	</td>
  </tr>
  <tr>
    <td align="right">��ע��</td>
    <td align="left"><input name="alt" type="text" class="input" value="" /> <span class="green">(0-300�ַ�,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">���ӵ�ַ��</td>
    <td align="left"><input name="url" type="text" class="input" value="" /> <span class="green">(0-300�ַ�,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">Ԥ��ͼ��</td>
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
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="�ύ" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="����" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><a href="item_add2.php">�л����߼����</a></td>
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