<?php 
include("../x.php");
if(!($_SESSION["auth"]["fm"]&ADD)){
	exit("您无权访问本页！");
}
$array=explode("@",$_SESSION["identify"]);
$add_man=$array[3];

$sizeLimit=$upload_config["file_size"];

foreach($upload_config["file_type"] as $value){
	$fileExt[]="*".$value;
}
$fileExt=implode(";",$fileExt);
if($_POST["Submit"]){
	$next=$_POST["next"];
	if($next==1){
		$id=$_POST["id"];
		$note=$_POST["note"];
		for($i=0;$i<count($id);$i++){
			$note[$i]=$common_func->enter_check($note[$i],"string",300,"#");
			$query="update `".$prefix."fm` set `note`='$note[$i]' where `id`='$id[$i]'";
			$sql_func->update($query,3);
		}
		echo "<script>alert('数据保存成功！');location.href='fm_upload.php';</script>";
		exit;
	}else{
		echo "<script>alert('您还未上传任何文件！请至少上传一个!');location.href='fm_upload.php';</script>";
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
		'script': 'fm_action.php',
		'fileDesc': 'limited file type',
		'fileExt': '<?php echo $fileExt;?>',
		'multi': true,
		'auto': false,
		'sizeLimit': <?php echo $sizeLimit;?>,
		'scriptData': {'PHPSESSID':'<?php echo session_id();?>','add_man':'<?php echo $add_man;?>'},
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
		url:"fm_listfiles.php",
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
	var con="<tr><td align='center'><input type='hidden' name='id[]' value='"+data.id+"' />"+data.name+"</td><td align='center'><input name='note[]' type='text' value='"+data.note+"' class='input' /></td></tr>";
	$('#returnmsg tr:last').after(con);
}
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">文件管理--上传</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
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
		<td align="center" class="orange">新文件名</td>
		<td align="center" class="orange">备注(0-300字符,可选)</td>
	  </tr>
	</table>
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="保存修改" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green">
	点击'Choose Files...'按钮在弹出的窗口中选择要上传的一个或多个文件！单击'开始上传'文件便可上传至服务器！
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="green"><span class="red">文件格式为：<?php echo implode("|",$upload_config["file_type"]);?></span></td>
  </tr>
</table>
<input name="next" id="next" type="hidden" value="" />
</form>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>