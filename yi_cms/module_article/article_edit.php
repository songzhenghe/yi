<?php 
include("../x.php");
if(!($_SESSION["auth"]["article"]&EDI)){
	exit("����Ȩ���ʱ�ҳ��");
}
$article_id=$sql_func->inject_check(trim($_GET["article_id"]));
if($article_id>0 and $article_id!=""){
	$query="select `category_id`,`preview`,`title`,`content`,`tag`,`order` from `".$prefix."article` where `id`='$article_id'";
	$info=$sql_func->select($query);
	$_SESSION["article_id"]=$article_id;
}else{
	exit("��������");
}
if($_POST["Submit"]){
	$newordel=$_POST["newordel"];
	$pic_old=$_POST["preview"];
	
	$category_id=$_POST["category_id"];
	$title=$common_func->enter_check($_POST["title"],"string",256);
	$content=$common_func->_mysql_string(trim($_POST["content"]));
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	
	if($newordel==1){//�����ϴ�ͼ
		if($_FILES["file"]["name"]!=""){
			$pic=$common_func->fileupload(UF,array(".jpg",".png",".jpeg",".gif"),2);
			if($pic_old!="#"){
				@unlink(UF.$pic_old);
			}
		}else{//���ûѡ���ļ�����ʾ
			echo "<script>alert('������û��ѡ��ͼƬ�ޣ�');location.href='article_edit.php?article_id=".$article_id."';</script>";
			exit;
		}
	}else if($newordel==2){//ɾ��ͼ
		$pic="#";
		if($pic_old!="#"){
				@unlink(UF.$pic_old);
		}
	}else{
		$pic=$_POST["preview"];
	}
	
	if($category_id!="" and $title!="" and $content!="" and $tag!=""){
		$query="update `".$prefix."article` set `category_id`='$category_id',`preview`='$pic',`title`='$title',`content`='$content',`tag`='$tag',`order`='$order' where `id`='$article_id'";
		$sql_func->update($query,1);
		unset($_SESSION["article_id"]);
		echo "<script>window.parent.location.reload();</script>";
		exit;
	}else{
		echo "<script>alert('���ⲻ��Ϊ�գ��������Ĳ���Ϊ��');window.history.back(-1);</script>";
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
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script src='<?php echo B_JS;?>jquery.MetaData.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MultiFile.js' type="text/javascript"></script>
<script>
	$(document).ready(function(){
		$(".example1").colorbox({width:"85%", height:"85%", iframe:true});
	});
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">���±��⣺<?php echo $info["title"];?></div>
</div>
<div class="bottom">
<form action="" method="post" name="form1" enctype="multipart/form-data">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">���⣺</td>
    <td align="left"><input name="title" type="text" class="input" value="<?php echo $info["title"];?>" /> <span class="green">(������0-256֮��)</span></td>
  </tr>
  
  <tr>
    <td align="right">ͼƬԤ����</td>
    <td align="left">
	<?php
	 if($info["preview"]!="#" and file_exists(UF.$info["preview"])){
	 	echo "<img src=\"".UF2.$info["preview"]."\" width=\"40\" height=\"30\">";
	 }else{
	 	echo "δ���û��ļ���ɾ����";
	 }
	?><br />
	<input name="newordel" type="radio" value="1" />�������ã�<br />
	<input name="file" type="file" class="multi" maxlength="1" accept="gif|jpg|png" /><span class="green">(�ļ���ʽΪJPG|PNG|GIF)</span><br />
	<input name="newordel" type="radio" value="2" />ɾ��Ԥ��ͼƬ
	<input name="preview" type="hidden" value="<?php echo $info["preview"];?>" />
	</td>
  </tr>

  <tr>
    <td align="right">�������ࣺ</td>
    <td align="left">
		<select name="category_id">
	  <?php
		$param="select `id`,`name`,`up_id` from `".$prefix."category` where `type`='2'";//3
		$param=$sql_func->mselect($param);
		for($i=0;$i<count($param);$i++){
			$param2=$param[$i]["up_id"];
			$param2="select `name`,`up_id` from `".$prefix."category` where `id`='$param2'";//2
			$param2=$sql_func->select($param2);
			$param3=$param2["up_id"];
			$param3="select `name` from `".$prefix."category` where `id`='$param3'";//1
			$param3=$sql_func->select($param3);
			if($param!=""){
				$param4=$param[$i]["name"];
			}
			if($param2!=""){
				$param4=$param2["name"]."��".$param4;
			}
			if($param3!=""){
				$param4=$param3["name"]."��".$param4;
			}
			if($param[$i]["id"]==$info["category_id"]){
				echo "<option value=\"".$param[$i]["id"]."\" selected=\"selected\">".$param4."</option>";
			}else{
				echo "<option value=\"".$param[$i]["id"]."\">".$param4."</option>";
			}
		}
		unset($param,$param2,$param3,$param4);
	  ?>
	</select>
	</td>
  </tr>
  <tr>
    <td align="right">��ʾ��ţ�</td>
    <td align="left"><input name="order" type="text" class="input2" value="<?php echo $info["order"];?>" /> <span class="green">(���������4λ��������Ĭ��Ϊ1)</span></td>
  </tr>
  <tr>
    <td align="right">״̬��</td>
    <td align="left">
		<input name="tag" type="radio" value="1" <?php if($info["tag"]==1){echo "checked=\"checked\"";}?> />��ʾ
		<input name="tag" type="radio" value="0" <?php if($info["tag"]==0){echo "checked=\"checked\"";}?>  />����
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center">
    <input type="button" class="example1 button" value="���ļ��������ѡ��" href="../module_fm/fm_getinfo.php" />&nbsp;&nbsp;
    <input type="button" class="example1 button" value="ͨ���ļ������ϴ����ļ�" href="../module_fm/fm_upload.php" />
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center"><?php $common_func->ck($info["content"]);?></td>
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