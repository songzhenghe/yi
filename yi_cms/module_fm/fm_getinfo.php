<?php 
include("../x.php");
if(!($_SESSION["auth"]["fm"]&LIS)){
	exit("您无权访问本页！");
}
$ftype=$_GET["ftype"];
if($ftype!=""){
	$extra="where `extend`='$ftype'";
}else{
	$extra="";
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
<script>
	$(document).ready(function(){
		$(".example1").colorbox({width:"520px", height:"340px", iframe:true});
	});
	function getUrlParam(paramName){
	  var reParam = new RegExp('(?:[\?&]|&amp;)' + paramName + '=([^&]+)', 'i') ;
	  var match = window.location.search.match(reParam) ;
	  return (match && match.length > 1) ? match[1] : '' ;
	}

	function ReturnImg(reimg){
		var funcNum = getUrlParam('CKEditorFuncNum');
		var fileUrl = reimg;
		window.opener.CKEDITOR.tools.callFunction(funcNum, fileUrl);
		window.close();
	}
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">文件浏览器</div>
</div>
<div class="bottom">
<form name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
  	<td align="center" colspan="7" class="red">
	序号标记为黄色的附件已不存在！
	</td>
  </tr>
  <tr>
    <td colspan="7" align="center">
	<select name="type" onchange="javascript:location.href='fm_getinfo.php?ftype='+this.value;">
	  <option value="">选择一种文件类型</option>
	  <?php 
		foreach($upload_config["file_type"] as $value){
			$file_type[]=array("value"=>$value,"name"=>$value);
		}
		$sql_func->edit_select($file_type,$ftype,"value","name");
	  ?>
	</select>
	</td>
  </tr>
  <?php
  	$query="select * from `".$prefix."fm` ".$extra." order by `id` desc";
	$total_num=$sql_func->num_rows($query);
  	if($total_num>0){
  ?>
  <tr>
	  <td align="center" colspan="7">
	  	<?php
		$page_id=$sql_func->inject_check(trim($_GET['page_id']));
		$page_id=($page_id=="")?"1":$page_id;
		$add="?ftype=".$ftype."&&";
		$pagesize="10";
		$begin=($page_id-1)*$pagesize;
		$query=$query." limit $begin,$pagesize";
		$common_func->pages($total_num,$page_id,$add,$pagesize);
		?>
	  </td>
  </tr>
  <tr>
    <td align="center" class="orange">序号</td>
    <td align="center" class="orange">文件类型</td>
    <td align="center" class="orange">文件名</td>
    <td align="center" class="orange">备注</td>
    <td align="center" class="orange">路径</td>
    <td align="center" class="orange">添加人</td>
    <td align="center" class="orange">添加时间</td>
    </tr>
  
  <?php 
  	$info=$sql_func->mselect($query); 
		for($i=0;$i<count($info);$i++){
  ?>
  <tr>
    <td align="center">
	<?php
	 if($info[$i]["name"]!=""){
	 	if(!file_exists(ROOT.$upload_config["folder_name"]."/".$info[$i]["name"])){
			echo "<div style=\"background:yellow;font-weight:bold;\">".($i+1)."</div>";
		}else{
			echo $i+1;
		}
	 }else{
	 	echo $i+1;
	 }
	?>
	</td>
    <td align="center"><?php $common_func->ftype($info[$i]["extend"]);?></td>
    <td align="center"><input name="name[]" type="text" value="<?php echo $info[$i]["name"];?>" class="input" /></td>
    <td align="center"><input name="note[]" type="text" value="<?php echo $info[$i]["note"];?>" class="input" /></td>
    <td align="center"><input name="path[]" type="text" value="<?php echo $info[$i]["path"];?>" class="input" /> 
	<?php if(!empty($_GET['CKEditorFuncNum'])){?>
	<a href="#" onclick="ReturnImg('<?php echo $info[$i]["path"];?>')">插入编辑器</a>
	<?php }?>
    <embed width="62" height="24" align="center" flashvars="txt=<?php echo $info[$i]["path"];?>" src="<?php echo B_JS;?>Copy.swf" quality="high" wmode="transparent" allowscriptaccess="sameDomain" pluginspage="http://www.adobe.com/go/getflashplayer" type="application/x-shockwave-flash">
	</td>
    <td align="center"><?php echo $sql_func->id2name($prefix,$info[$i]["add_man"]);?></td>
    <td align="center"><?php echo $info[$i]["add_time"];?></td>
    </tr>
  <?php 
		}
	}else{
  ?>
  <tr>
  	<td align="center" colspan="7" class="red">
	列表为空！
	</td>
  </tr>
  <?php 
  }
  ?>
  <tr>
  	<td align="center" colspan="7">
	<?php
	if($total_num>0){ 
		$common_func->pages($total_num,$page_id,$add,$pagesize);
	}
	?>
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