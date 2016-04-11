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
$id=$sql_func->inject_check(trim($_GET["id"]));
$name=trim($_GET["name"]);
if($id!="" and $id>0 and $name!=""){
	if(!($_SESSION["auth"]["fm"]&DEL)){
		exit("您无权访问本页！");
	}
	@unlink(ROOT.$upload_config["folder_name"]."/".$name);
	$query="delete from `".$prefix."fm` where `id`='$id'";
	$sql_func->delete($query,2,"fm_list.php?ftype=".$ftype);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>内容管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link type="text/css" media="screen" rel="stylesheet" href="<?php echo B_CSS;?>colorbox.css" />
<link href="<?php echo B_CSS;?>tooltip.css" rel="stylesheet" type="text/css" />
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script src="<?php echo B_JS;?>jquery.tools.min.js" type="text/javascript"></script>
<script>
	function xcheckx(){
		var a;
		a=$("input[name='id[]']");
		for(i=0;i<a.length;i++){
			if(a[i].checked){
				return confirm('您确定要执行此批量操作吗？');
			}
		}
		alert("对不起,你至少要选择一个!");
		return false;
	}
	$(document).ready(function(){
		$(".example1").colorbox({width:"520px", height:"340px", iframe:true});
		$(".tt").tooltip({tipClass:'tooltip1',effect: 'bouncy'});
		//全选反选
		$('#checkall').toggle(function(){
			$("input[name='id[]']").each(function() {
				this.checked = true;
			});
		},function(){
			$("input[name='id[]']").each(function() {
				this.checked = false;
			});
		});
		$("select[name='bit_type']").change(function(){
			if($(this).attr("value")=="del"){
				$("#bit_area").html("<input type=\"submit\" name=\"Submit\" value=\"确定\" class=\"button\" />");
			}else{
				$("#bit_area").html("");
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
<div class="t_center">文件管理--列表</div>
</div>
<div class="bottom">
<form action="fm_list_bitop.php?ftype=<?php echo $ftype;?>" method="post" name="form1" onsubmit="return xcheckx()">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
  	<td align="center" colspan="10" class="red">
	序号标记为黄色的附件已不存在！
	</td>
  </tr>
  <tr>
    <td colspan="10" align="center">
	<select name="type" onchange="javascript:location.href='fm_list.php?ftype='+this.value;">
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
	  <td align="center" colspan="10">
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
    <td align="center" class="orange"><input name="checkall" id="checkall" type="button" value="√" /></td>
    <td align="center" class="orange">序号</td>
    <td align="center" class="orange">文件类型</td>
    <td align="center" class="orange">文件名</td>
    <td align="center" class="orange">备注</td>
    <td align="center" class="orange">路径</td>
    <td align="center" class="orange">添加人</td>
    <td align="center" class="orange">添加时间</td>
    <td align="center" class="orange">编辑</td>
    <td align="center" class="orange">删除</td>
  </tr>
  
  <?php 
  	$info=$sql_func->mselect($query); 
		for($i=0;$i<count($info);$i++){
  ?>
  <tr>
    <td align="center"><input name="id[]" type="checkbox" value="<?php echo $info[$i]["id"];?>" /></td>
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
    <td align="center"><input name="name[]" type="text" value="<?php echo $info[$i]["name"];?>" class="tt input" title="<?php echo $info[$i]["name"];?>" /></td>
    <td align="center"><input name="note[]" type="text" value="<?php echo $info[$i]["note"];?>" class="tt input" title="<?php echo $info[$i]["note"];?>" /></td>
    <td align="center"><input name="path[]" type="text" value="<?php echo $info[$i]["path"];?>" class="tt input" title="<?php echo $info[$i]["path"];?>" />
    <embed width="62" height="24" align="center" flashvars="txt=<?php echo $info[$i]["path"];?>" src="<?php echo B_JS;?>Copy.swf" quality="high" wmode="transparent" allowscriptaccess="sameDomain" pluginspage="http://www.adobe.com/go/getflashplayer" type="application/x-shockwave-flash">
	</td>
    <td align="center"><?php echo $sql_func->id2name($prefix,$info[$i]["add_man"]);?></td>
    <td align="center"><?php echo $info[$i]["add_time"];?></td>
    <td align="center"><a href="fm_edit.php?id=<?php echo $info[$i]["id"];?>" class="example1"><img src="<?php echo B_IMG;?>bianji.gif" /></a></td>
    <td align="center"><a href="?id=<?php echo $info[$i]["id"];?>&&name=<?php echo $info[$i]["name"];?>" onclick="return confirm('确定删除？');"><img src="<?php echo B_IMG;?>shanchu.gif" /></a></td>
  </tr>
  <?php 
		}
	}else{
  ?>
  <tr>
  	<td align="center" colspan="10" class="red">
	列表为空！
	</td>
  </tr>
  <?php 
  }
  ?>
  <tr>
  	<td align="center" colspan="10">
	<?php
	if($total_num>0){ 
		$common_func->pages($total_num,$page_id,$add,$pagesize);
	}
	?>
	</td>
  </tr>
  <tr>
  	<td align="center" colspan="11">
		<select name="bit_type">
		  <option value="">=批量操作=</option>
		  <option value="del">删除</option>
		</select>
        <span id="bit_area"></span>
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