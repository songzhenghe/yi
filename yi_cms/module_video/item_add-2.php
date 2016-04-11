<?php 
include("../x.php");
if(!($_SESSION["auth"]["video"]&ADD)){
	exit("您无权访问本页！");
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
		echo "<script>alert('数据保存成功！');location.href='item_add-2.php';</script>";
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
<div class="t_center">视频项目添加</div>
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
	  <option value="">选择视频项目所属分类</option>
	  <?php 
	  	$param="select * from `".$prefix."media` where `tag`='1' and `type`='2'";
		$param=$sql_func->mselect($param);
		$sql_func->choose_select($param,"id","name");
		unset($param);
	  ?>
	</select>
	<span class="red">状态为‘隐藏’的视频分类在此没有显示</span>
	</td>
  </tr>
  <tr>
    <td align="right">类型：</td>
    <td align="left">
	<select name="type" class="type">
	  <option value="1">本地上传视频</option>
	  <option value="2">服务器存放地址</option>
    </select>
    </td>
  </tr>
  <tr>
    <td colspan="2" align="center">
	<div id="title1">
    	文件：<input name="file2" type="file" class="multi" maxlength="1" accept="flv" />
		<span class="green">(文件格式为FLV)</span>
	</div>
	<div id="title2" style="display:none;">
		服务器文件地址：<input name="title" type="text" value="" class="input" /> <span class="green">如：（/fm_files/video.flv）"/"代表网站根目录，支持http。</span><br />
        <input type="button" class="example1 button" value="从文件浏览器中选择" href="../module_fm/fm_getinfo.php" />&nbsp;&nbsp;
    	<input type="button" class="example1 button" value="通过文件管理上传新文件" href="../module_fm/fm_upload.php" />
	</div>
	</td>
  </tr>
  <tr>
    <td align="right">备注：</td>
    <td align="left"><input name="alt" type="text" class="input" value="" /> <span class="green">(0-300字符,可选)</span></td>
  </tr>
  <tr>
    <td align="right">链接地址：</td>
    <td align="left"><input name="url" type="text" class="input" value="" /> <span class="green">(0-300字符,可选)</span></td>
  </tr>
  <tr>
    <td align="right">预览图：</td>
    <td align="left"><input name="file" type="file" class="multi" maxlength="1" accept="jpg" /> <span class="green">(jpg图片大小不超过2M,可选)</span></td>
  </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left"><input name="order" type="text" class="input2" value="" /> <span class="green">（正整数最大4位，不填则默认为1）</span></td>
  </tr>
  <tr>
    <td align="right">状态：</td>
    <td align="left"><input type="radio" name="tag" value="1" checked="checked" />显示 <input type="radio" name="tag" value="2" />隐藏</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]];?> | 添加时间：系统自动记录 </td>
    </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="重置" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><a href="item_add2.php">切换至高级添加</a></td>
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