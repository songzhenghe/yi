<?php 
include("../x.php");
if(!($_SESSION["auth"]["video"]&ADD)){
	exit("您无权访问本页！");
}
$step3=$_GET["step3"]?$_GET["step3"]:"1";
if($_POST["Submit_1"]){
	$media_id=$_POST["media_id"];
	if($media_id!=""){
		$_SESSION["media_id"]=$media_id;
		echo "<script>location.href='item_add2.php?step3=2';</script>";
		exit;
	}else{
		echo "<script>alert('所属分类不能为空！');window.history.back(-1);</script>";
		exit;
	}
}
if($_POST["Submit_2"]){
	$item_id=$_POST["item_id"];
	$next=$_POST["next"];
	$title=$common_func->enter_check($_POST["title"],"string",300);
	$alt=$common_func->enter_check($_POST["alt"],"string",300,"#");
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$tag=$_POST["tag"];
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	if($item_id!="" and $next==1){
		if($_FILES["file"]["name"]!=""){
			$pic=$common_func->fileupload(UF,array(".jpg"),2);
		}else{
			$pic="#";
		}
		$query="update `".$prefix."item` set `alt`='$alt',`url`='$url',`pic`='$pic',`tag`='$tag',`order`='$order' where `id`='$item_id'";
		$sql_func->update($query,3);
		unset($_SESSION["media_id"]);
		echo "<script>alert('数据保存成功！');location.href='item_add2.php?step3=1';</script>";
		exit;
	}else if($title!=""){
		if($_FILES["file"]["name"]!=""){
			$pic=$common_func->fileupload(UF,array(".jpg"),2);
		}else{
			$pic="#";
		}
		$array=explode("@",$_SESSION["identify"]);
		$add_man=$array[3];
		$add_time=$common_func->nowtime();
		$query="insert into `".$prefix."item` (`media_id`,`title`,`alt`,`url`,`pic`,`add_man`,`add_time`,`tag`,`order`,`type`,`pathinfo`) values ('$_SESSION[media_id]','$title','$alt','$url','$pic','$add_man','$add_time','$tag','$order','2','2')";
		$sql_func->insert($query,3);
		unset($_SESSION["media_id"]);
		echo "<script>alert('数据保存成功！');location.href='item_add2.php?step3=1';</script>";
		exit;
	}else{
		echo "<script>alert('数据保存失败！');</script>";
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>内容管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="<?php echo B_CSS;?>uploadify.css" type="text/css" />
<link type="text/css" media="screen" rel="stylesheet" href="<?php echo B_CSS;?>colorbox.css" />
<script type="text/javascript" src="<?php echo B_JS;?>jquery.js"></script>
<script type="text/javascript" src="<?php echo B_JS;?>swfobject.js"></script>
<script type="text/javascript" src="<?php echo B_JS;?>jquery.uploadify.js"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script src='<?php echo B_JS;?>jquery.MetaData.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MultiFile.js' type="text/javascript"></script>
<script>
$(document).ready(function(){
	$(".example1").colorbox({width:"1000px", height:"600px", iframe:true});
	$(".type").change(function(){
		if($(this).attr("value")=="1"){
			$("#title1").show("fast");
			$("#title2").hide("fast");
			$("#title2 input[name='title']").attr("value","");
		}else{
			$("#title2").show("fast");
			$("#title1").hide("fast");
		}
	});
	
	$("#fileUploadgrowl").uploadify({
		'uploader': '<?php echo B_JS;?>uploadify.swf',
		'cancelImg': '<?php echo B_IMG;?>cancel.png',
		'script': 'action2.php',
		'fileDesc': 'flv format',
		'fileExt': '*.flv',
		'multi': false,
		'auto': false,
		'sizeLimit': <?php echo SYS_UP_FILESIZE;?>,
		'scriptData': {'PHPSESSID':'<?php echo session_id();?>','media_id':'<?php echo $_SESSION["media_id"];?>','add_man':'<?php $array=explode("@",$_SESSION["identify"]);echo $array[3];?>'},
		onComplete: function (evt, queueID, fileObj, response, data) {
			if(response==""){
				alert("文件上传失败！");
			}else{
				$("#next").attr('value','1');
				$("#item_id").attr('value',response);
				$(".type").attr("disabled","disabled");
			}
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
<?php 
	if($step3==1){
?>
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">项目信息添加（1/2）</td>
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
    <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]];?> | 添加时间：系统自动记录 </td>
    </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit_1" type="submit" class="button" value="下一步" />&nbsp;&nbsp;<input name="Reset_1" type="reset" class="button" value="重置" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">项目信息添加分2步，第一步选择视频分类，第二步上传视频文件设置备注信息！<span class="red">文件格式为FLV</span><br /><a href="item_add-2.php">切换至普通添加</a>
    </td>
  </tr>
</table>
</form>
<?php 
	}
	if($step3==2){
?>
<form action="" method="post" enctype="multipart/form-data" name="form2">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">项目信息添加（2/2）</td>
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
		<fieldset style="border: 1px solid #CDCDCD; padding: 8px; padding-bottom:0px; margin: 8px 0" class="bold">
		<br /><br />
		<div id="fileUploadgrowl">You have a problem with your javascript</div><br /><br />
		<a href="javascript:$('#fileUploadgrowl').uploadifyUpload()">开始上传</a> |  <a href="javascript:$('#fileUploadgrowl').uploadifyClearQueue()">清除队列</a>
    	<p></p>
		</fieldset>
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
    <td colspan="2" align="center">
	<input name="Submit_2" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset_2" type="reset" class="button" value="重置" />
	<input name="next" type="hidden" value="" id="next" />
	<input name="item_id" type="hidden" value="" id="item_id" />
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">项目信息添加分2步，第一步选择视频分类，第二步上传视频文件设置备注信息！<span class="red">文件格式为FLV</span></td>
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