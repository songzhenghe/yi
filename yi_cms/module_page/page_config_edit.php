<?php 
include("../x.php");
if(!($_SESSION["auth"]["page"]&EDI)){
	exit("您无权访问本页！");
}
$config_id=$sql_func->inject_check(trim($_GET["config_id"]));
if($config_id!="" and $config_id>0){
	$query="select * from `".$prefix."config` where `id`='$config_id'";
	$info=$sql_func->select($query);
}else{
	exit("参数错误！");
}
if($_POST["Submit"]){
	$name=$common_func->enter_check($_POST["name"],"string",256);
	$title=$common_func->enter_check($_POST["title"],"string",300);
	$keywords=$common_func->enter_check($_POST["keywords"],"string",300);
	$description=$common_func->enter_check($_POST["description"],"string",300);
	$extends=$_POST["extends"];
	if($extends=='0'){
		$copyright=$common_func->_mysql_string(trim($_POST["copyright"]));//不继承
	}else{
		$copyright="#";
	}
	if($name!="" and $title!="" and $keywords!="" and $description!="" and $copyright!="" and $extends!=""){
		$query="update `".$prefix."config` set `name`='$name',`title`='$title',`keywords`='$keywords',`description`='$description',`copyright`='$copyright',`extends`='$extends' where `id`='$config_id'";
		$sql_func->update($query,1);
		echo "<script>window.parent.location.reload();</script>";
		exit;
	}else{
		echo "<script>alert('文件名称、页面标题、页面关键字、页面描述、页面版权均不能为空！');window.history.back(-1);</script>";
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
<script>
$(document).ready(function(){
	$(".example1").colorbox({width:"85%", height:"85%", iframe:true});
	
	var o;
	o=$("select[name=extends]");
	if(o.val()=='0'){
		$(".cop").show();
	}else{
		$(".cop").hide();
	}

	$("select[name=extends]").change(function(){
		if($(this).val()=='0'){
			$(".cop").show();
		}else{
			$(".cop").hide();
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
<div class="t_center">页面基本信息编辑</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">文件名称：</td>
    <td align="left"><input name="name" type="text" class="input" value="<?php echo $info["name"];?>" /> <span class="green">(0-256字符，如index.php)</span></td>
  </tr>
  <tr>
    <td align="right">页面标题：</td>
    <td align="left"><input name="title" type="text" class="input" value="<?php echo $info["title"];?>" /> <span class="green">(0-300字符)</span></td>
  </tr>
  <tr>
    <td align="right">页面关键字：</td>
    <td align="left"><input name="keywords" type="text" class="input" value="<?php echo $info["keywords"];?>" /> <span class="green">(0-300字符，多个关键字以逗号分隔)</span></td>
  </tr>
  <tr>
    <td align="right">页面描述：</td>
    <td align="left"><input name="description" type="text" class="input" value="<?php echo $info["description"];?>" /> <span class="green">(0-300字符)</span></td>
  </tr>
  <tr>
    <td align="right">版权继承：</td>
    <td align="left">
    <select name="extends">
      <option value="0" <?php if($info["extends"]==0){echo "selected='selected'";}?>>不继承</option>
    	<?php
    		$param="select * from `{$prefix}config` where `id`<>'{$info[id]}'";
			$param=$sql_func->mselect($param);
			for($i=0;$i<count($param);$i++){
				if($info["extends"]==$param[$i]['id']){
					echo "<option value='".$param[$i]['id']."' selected='selected'>".$param[$i]['name']."</option>";
				}else{
					echo "<option value='".$param[$i]['id']."' >".$param[$i]['name']."</option>";
				}
			}
		?>
    </select><span class="red">继承后下面手动输入的内容无效！</span>
    </td>
  </tr>
  <tr class="cop">
    <td colspan="2" align="center">
        <input type="button" class="example1 button" value="从文件浏览器中选择文件" href="../module_fm/fm_getinfo.php" />&nbsp;&nbsp;
        <input type="button" class="example1 button" value="通过文件管理上传新文件" href="../module_fm/fm_upload.php" />
    </td>
  </tr>
  <tr class="cop">
    <td align="right">页面版权：</td>
    <td align="left">
		<?php 
			$common_func->ck2($info["copyright"]);
		?>
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="提交" /></td>
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