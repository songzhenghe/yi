<?php 
include("../x.php");
if(!($_SESSION["auth"]["article"]&ADD)){
	exit("您无权访问本页！");
}
$step=$_GET["step"]?$_GET["step"]:"1";
if($_POST["Submit_1"]){
	$category_id=$_POST["category_id"];
	$preview='#';//文章预览图
	$title=$common_func->enter_check($_POST["title"],"string",256);
	$content="文章正文";
	$array=explode("@",$_SESSION["identify"]);
	$add_man=$array[3];
	$add_time=$common_func->nowtime();
	$views="0";
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($category_id!="" and $title!="" and $add_man!="" and $add_time!="" and $tag!=""){
		$query="select `id` from `".$prefix."article` where `category_id`='$category_id' and `title`='$title'";
		if($sql_func->num_rows($query)==0){
		    if($filename=$common_func->fileupload(UF,array(".jpg",".jpeg",".png",".gif"),SYS_UP_FILESIZE/1048576)){
				$preview=$filename;
			}
			$query="insert into `".$prefix."article` (`category_id`,`preview`,`title`,`content`,`add_man`,`add_time`,`views`,`tag`,`order`) values ('$category_id','$preview','$title','$content','$add_man','$add_time','$views','$tag','$order')";
			$_SESSION["article_id"]=$sql_func->insert($query,3,"","",1);
			echo "<script>location.href='article_add.php?step=2';</script>";
			exit;
		}else{
			echo "<script>alert('此文章已存在，请输入其它标题！');window.history.back(-1);</script>";
			exit;
		}
	}else{
		echo "<script>alert('所属分类不能为空！标题不能为空！');window.history.back(-1);</script>";
		exit;
	}
}
if($_POST["Submit_2"]){
	$content=$common_func->_mysql_string(trim($_POST["content"]));
	if($content!=""){
		$id=$_SESSION["article_id"];
		$query="update `".$prefix."article` set `content`='$content' where `id`='$id'";
		$sql_func->update($query,"3");
		unset($_SESSION["article_id"]);
		echo "<script>alert('文章添加成功！');location.href='article_add.php';</script>";
		exit;
	}else{
		echo "<script>alert('内容不能为空！');window.history.back(-1);</script>";
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
<link type="text/css" media="screen" rel="stylesheet" href="<?php echo B_CSS;?>colorbox.css" />
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script src='<?php echo B_JS;?>jquery.MetaData.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MultiFile.js' type="text/javascript"></script>
<script>
	$(document).ready(function(){
		$(".example1").colorbox({width:"1000px", height:"600px", iframe:true});
	});
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">文章添加</div>
</div>
<div class="bottom">
<?php 
	if($step==1){
?>
<form action="" method="post" name="form1"  enctype="multipart/form-data">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">文章信息 (1/2)</td>
    </tr>
  <tr>
    <td align="right">标题：</td>
    <td align="left"><input name="title" type="text" class="input" /> 
    <span class="green">(长度在0-256之间)</span></td>
  </tr>
  
  <tr>
    <td align="right">图片预览：</td>
    <td align="left"><input name="file" type="file" class="multi" maxlength="1" accept="gif|jpg|png" /><span class="green">(文件格式为JPG|PNG|GIF)（可选）</span></td>
  </tr>

  <tr>
    <td align="right">显示序号：</td>
    <td align="left"><input name="order" type="text" class="input2" /> <span class="green">(正整数最大4位，不填则默认为1)</span></td>
  </tr>
  <tr>
    <td align="right">所属分类：</td>
    <td align="left">
	<select name="category_id">
	  <option value="">选择文章所属分类（◣为下一级）</option>
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
				$param4=$param2["name"]."◣".$param4;
			}
			if($param3!=""){
				$param4=$param3["name"]."◣".$param4;
			}
			echo "<option value=\"".$param[$i]["id"]."\">".$param4."</option>";
		}
		unset($param,$param2,$param3,$param4);
	  ?>
	</select>
	</td>
  </tr>
  <tr>
    <td align="right">状态：</td>
    <td align="left"><input name="tag" type="radio" value="1" checked="checked" />显示 <input name="tag" type="radio" value="0" />隐藏</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]];?> |  添加时间：系统自动记录</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit_1" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset_1" type="reset" class="button" value="重置" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">文章添加分2步，第一步添加文章信息，第二步添加文章内容！</td>
  </tr>
</table>
</form>
<?php 
	}
	if($step==2){
?>
<form action="" method="post" name="form2">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" class="red">文章内容 (2/2)</td>
    </tr>
  <tr>
    <td align="center">
    <input type="button" class="example1 button" value="从文件浏览器中选择" href="../module_fm/fm_getinfo.php" />&nbsp;&nbsp;
    <input type="button" class="example1 button" value="通过文件管理上传新文件" href="../module_fm/fm_upload.php" />
    </td>
  </tr>
  <tr>
    <td align="center"><?php $common_func->ck("文章正文");?></td>
    </tr>
  <tr>
    <td align="center"><input name="Submit_2" type="submit" class="button" value="提交" /></td>
  </tr>
  <tr>
    <td align="center" class="green">文章添加分2步，第一步添加文章信息，第二步添加文章内容！</td>
  </tr>
</table>
</form>
<?php 
	}
?>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>