<?php 
include("../x.php");
if(!($_SESSION["auth"]["flash"]&EDI)){
	exit("����Ȩ���ʱ�ҳ��");
}
$item_id=$sql_func->inject_check(trim($_GET["item_id"]));
if($item_id!="" and $item_id>0){
	$query="select `title`,`alt`,`url`,`pic`,`tag`,`order`,`pathinfo` from `".$prefix."item` where `id`='$item_id'";
	$info=$sql_func->select($query);
}else{
	exit("��������");
}
if($_POST["Submit"]){
	$newordel=$_POST["newordel"];
	$pic_old=$_POST["pic"];
	$title=$common_func->enter_check($_POST["title"],"string",300);
	$alt=$common_func->enter_check($_POST["alt"],"string",300,"#");
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	if($newordel==1){
		if($_FILES["file"]["name"]!=""){
			$pic=$common_func->fileupload(UF,array(".jpg"),2);
			if($pic_old!="#"){
				@unlink(UF.$pic_old);
			}
		}
	}else if($newordel==2){
		$pic="#";
		if($pic_old!="#"){
				@unlink(UF.$pic_old);
		}
	}else{
		$pic=$_POST["pic"];
	}
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($title!="" and $tag!=""){
		$query="update `".$prefix."item` set `title`='$title',`alt`='$alt',`url`='$url',`pic`='$pic',`tag`='$tag',`order`='$order' where `id`='$item_id'";
		$sql_func->update($query,1);
		echo "<script>window.parent.location.reload();</script>";
		exit;
	}else{
		echo "<script>alert('״̬����Ϊ�գ�');window.history.back(-1);</script>";
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
<div class="t_center">flash��Ŀ�༭</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1" enctype="multipart/form-data">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">�ļ���ַ��</td>
    <td align="left">
	<input name="title" type="text" class="input" value="<?php echo $info["title"];?>" <?php if($info["pathinfo"]==1){echo "readonly=\"readonly\"";}?> />
	 <span class="green">(0-300�ַ�)</span>
	</td>
  </tr>
  <tr>
    <td align="right">��ע��</td>
    <td align="left"><input name="alt" type="text" class="input" value="<?php echo $info["alt"];?>" /> <span class="green">(0-300�ַ�,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">���ӵ�ַ��</td>
    <td align="left"><input name="url" type="text" class="input" value="<?php echo $info["url"];?>" /> <span class="green">(0-300�ַ�,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">Ԥ��ͼƬ��</td>
    <td align="left">
	<?php
	 if($info["pic"]!="#" and file_exists(UF.$info["pic"])){
	 	echo "<img src=\"".UF2.$info["pic"]."\" width=\"40\" height=\"30\">";
	 }else{
	 	echo "δ���û��ļ���ɾ����";
	 }
	?><br />
	<input name="newordel" type="radio" value="1" />�������ã�<br />
	<input name="file" type="file" class="multi" maxlength="1" accept="jpg" /><span class="green">(jpgͼƬ��С������2M,��ѡ)</span><br />
	<input name="newordel" type="radio" value="2" />ɾ��Ԥ��ͼƬ
	<input name="pic" type="hidden" value="<?php echo $info["pic"];?>" />
	
	</td>
  </tr>
  <tr>
    <td align="right">��ʾ��ţ�</td>
    <td align="left">
	<input name="order" type="text" class="input2" value="<?php echo $info["order"];?>" /> <span class="green">(���������4λ��������Ĭ��Ϊ1)</span>
	</td>
  </tr>
  <tr>
    <td align="right">״̬��</td>
    <td align="left">
	<input name="tag" type="radio" value="1" <?php if($info["tag"]==1){echo "checked=\"checked\"";}?> />��ʾ
	<input name="tag" type="radio" value="0" <?php if($info["tag"]==0){echo "checked=\"checked\"";}?>  />����
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