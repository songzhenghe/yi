<?php 
include("../x.php");
if(!($_SESSION["auth"]["picture"]&EDI)){
	exit("����Ȩ���ʱ�ҳ��");
}
$item_id=$sql_func->inject_check(trim($_GET["item_id"]));
if($item_id!="" and $item_id>0){
	$query="select `alt`,`url`,`tag`,`order` from `".$prefix."item` where `id`='$item_id'";
	$info=$sql_func->select($query);
}else{
	exit("��������");
}
if($_POST["Submit"]){
	$alt=$common_func->enter_check($_POST["alt"],"string",300,"#");
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($tag!=""){
		$query="update `".$prefix."item` set `alt`='$alt',`url`='$url',`tag`='$tag',`order`='$order' where `id`='$item_id'";
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
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">ͼƬ��Ŀ�༭</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">��ע��</td>
    <td align="left"><input name="alt" type="text" class="input" value="<?php echo $info["alt"];?>" /> <span class="green">(0-300�ַ�,��ѡ)</span></td>
  </tr>
  <tr>
    <td align="right">���ӵ�ַ��</td>
    <td align="left"><input name="url" type="text" class="input" value="<?php echo $info["url"];?>" /> <span class="green">(0-300�ַ�,��ѡ)</span></td>
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