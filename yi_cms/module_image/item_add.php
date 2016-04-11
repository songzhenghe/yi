<?php 
include("../x.php");
if(!($_SESSION["auth"]["picture"]&ADD)){
	exit("您无权访问本页！");
}
$step2=$_GET["step2"]?$_GET["step2"]:"1";
if($_POST["Submit_1"]){
	$media_id=$_POST["media_id"];
	if($media_id!=""){
		$_SESSION["media_id"]=$media_id;
		echo "<script>location.href='item_add.php?step2=2';</script>";
		exit;
	}else{
		echo "<script>alert('所属分类不能为空！');window.history.back(-1);</script>";
		exit;
	}
}
if($_POST["Submit_2"]){
	$next=$_POST["next"];
	if($next==1){
		$id=$_POST["id"];
		$alt=$_POST["alt"];
		$url=$_POST["url"];
		$tag=$_POST["tag"];
		$order=$_POST["order"];
		for($i=0;$i<count($id);$i++){
			$alt[$i]=$common_func->enter_check($alt[$i],"string",300,"#");
			$url[$i]=$common_func->enter_check($url[$i],"string",300,"#");
			$order[$i]=$common_func->enter_check($order[$i],"number",4,1);
			$query="update `".$prefix."item` set `alt`='$alt[$i]',`url`='$url[$i]',`tag`='$tag[$i]',`order`='$order[$i]' where `id`='$id[$i]'";
			$sql_func->update($query,3);
		}
		unset($_SESSION["media_id"]);
		echo "<script>alert('数据保存成功！');location.href='item_add.php?step2=1';</script>";
		exit;
	}else{
		echo "<script>alert('您还未上传任何文件！请至少上传一个!');window.history.back(-1);</script>";
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
<link rel="stylesheet" href="<?php echo B_CSS;?>uploadify.css" type="text/css" />
<script type="text/javascript" src="<?php echo B_JS;?>jquery.js"></script>
<script type="text/javascript" src="<?php echo B_JS;?>swfobject.js"></script>
<script type="text/javascript" src="<?php echo B_JS;?>jquery.uploadify.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$("#fileUploadgrowl").uploadify({
		'uploader': '<?php echo B_JS;?>uploadify.swf',
		'cancelImg': '<?php echo B_IMG;?>cancel.png',
		'script': 'action.php',
		'fileDesc': 'Image Files',
		'fileExt': '*.jpg;*.jpeg;*.png;*.gif',
		'multi': true,
		'auto': false,
		'sizeLimit': <?php echo SYS_UP_FILESIZE;?>,
		'scriptData': {'PHPSESSID':'<?php echo session_id();?>','media_id':'<?php echo $_SESSION["media_id"];?>','add_man':'<?php $array=explode("@",$_SESSION["identify"]);echo $array[3];?>'},
		onComplete: function (evt, queueID, fileObj, response, data) {
			if(response==""){
				alert("文件上传失败！");
			}else{
				listfiles(response);
				$("#next").attr('value','1');
			}
		}
	});
});
function listfiles(item_id){
	$.ajax({
		type:"POST",
		url:"listfiles.php",
		data:{'id':item_id},
		beforeSend:loading,
		success:Response,
		dataType:'json' 
	});
}
function loading(){
	$('#loading_img').show();
}
function Response(data){
	$('#loading_img').hide();
	$('#returnmsg').show();
	var con="<tr>\n<td align='center'>\n<img width='40' height='30' src='<?php echo UF2;?>"+data.pic+"' /><input type='hidden' name='id[]' value='"+data.id+"' />\n</td>\n<td align='center'>\n<input name='alt[]' type='text' value='"+data.alt+"' class='input' />\n</td>\n<td align='center'>\n<input name='url[]' type='text' value='#' class='input' />\n</td>\n<td align='center'>\n<select name='tag[]'><option value='1'>显示</option><option value='0'>隐藏</option></select>\n</td>\n<td align='center'>\n<input name='order[]' type='text' value='1' class='input2' />\n</td>\n</tr>\n";
	$('#returnmsg tr:last').after(con);
}
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">图片项目添加</div>
</div>
<div class="bottom">
<?php 
	if($step2==1){
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
    <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]];?> | 添加时间：系统自动记录 </td>
    </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit_1" type="submit" class="button" value="下一步" />&nbsp;&nbsp;<input name="Reset_1" type="reset" class="button" value="重置" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">项目信息添加分2步，第一步选择图片分类，第二步上传图片文件设置备注信息！<span class="red">文件格式为JPG|PNG|GIF</span><br />
	<a href="item_add-1.php">切换至普通添加</a>
</td>
  </tr>
</table>
</form>
<?php 
	}
	if($step2==2){
?>
<form action="" method="post" name="form2">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center" class="red">项目信息添加（2/2）</td>
  </tr>
  <tr>
    <td colspan="2" align="center">
	<fieldset style="border: 1px solid #CDCDCD; padding: 8px; padding-bottom:0px; margin: 8px 0" class="bold">
		<br /><br />
		<div id="fileUploadgrowl">You have a problem with your javascript</div><br /><br />
		<a href="javascript:$('#fileUploadgrowl').uploadifyUpload()">开始上传</a> |  <a href="javascript:$('#fileUploadgrowl').uploadifyClearQueue()">清除队列</a>
    	<p></p>
	</fieldset>
	<div id="loading_img" style="display:none;"><img width="32" height="32" src="<?php echo B_IMG;?>loading2.gif"/></div> 
	<table width="800" border="1" cellspacing="0" cellpadding="0" align="center" id="returnmsg" style="display:none;">
	  <tr>
		<td align="center" class="orange">图片</td>
		<td align="center" class="orange">备注(0-300字符,可选)</td>
		<td align="center" class="orange">链接(0-300字符,可选)</td>
		<td align="center" class="orange">状态</td>
		<td align="center" class="orange">显示序号(默认为1)</td>
	  </tr>
	  
	</table>
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit_2" type="submit" class="button" value="保存修改" />&nbsp;&nbsp;<input name="Reset_2" type="reset" class="button" value="重置" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">
	点击‘SELECT FILES’按钮在弹出的窗口中选择要上传的一个或多个文件！单击‘开始上传’文件便可上传至服务器！
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">项目信息添加分2步，第一步选择图片分类，第二步上传图片文件设置备注信息！<span class="red">文件格式为JPG|PNG|GIF</span></td>
  </tr>
</table>
<input name="next" id="next" type="hidden" value="" />
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