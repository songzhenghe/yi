<?php 
include("../x.php");
if(!($_SESSION["auth"]["picture"]&ADD)){
	exit("您无权访问本页！");
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
		echo "<script>alert('所属分类、文件不能为空！');window.history.back(-1);</script>";
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
<script src='<?php echo B_JS;?>jquery.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MetaData.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MultiFile.js' type="text/javascript"></script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">图片项目添加</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1" enctype="multipart/form-data">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">项目信息添加</td>
  </tr>
  <tr>
    <td align="right">所属分类：</td>
    <td align="left">
	<select name="media_id">
	  <option value="">选择图片项目所属分类</option>
	  <?php 
	  	$param="select * from `".$prefix."media` where `tag`='1' and `type`='1'";
		$param=$sql_func->mselect($param);
		$sql_func->choose_select($param,"id","name");
		unset($param);
	  ?>
	</select>
	<span class="red">状态为‘隐藏’的图片分类在此没有显示</span>
	</td>
  </tr>
  <tr>
    <td align="right">文件：</td>
    <td align="left"><input name="file" type="file" class="multi" maxlength="1" accept="gif|jpg|png" /><span class="green">(文件格式为JPG|PNG|GIF)</span></td>
  </tr>
  <tr>
    <td align="right">备注：</td>
    <td align="left"><input name="alt" type="text" class="input" /><span class="green">(0-300字符,可选)</span></td>
  </tr>
  <tr>
    <td align="right">链接：</td>
    <td align="left"><input name="url" type="text" class="input" /><span class="green">(0-300字符,可选)</span></td>
  </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left"><input name="order" type="text" class="input2" /><span class="green">(正整数最大4位，不填则默认为1)</span></td>
  </tr>
  <tr>
    <td align="right">状态：</td>
    <td align="left"><input name="tag" type="radio" value="1" checked="checked" />显示 <input name="tag" type="radio" value="0" />隐藏</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]];?> | 添加时间：系统自动记录 </td>
    </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="重置" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">
        <a href="item_add.php">切换至高级添加</a>
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