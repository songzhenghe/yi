<?php 
include("../x.php");
if(!($_SESSION["auth"]["article"]&LIS)){
	exit("您无权访问本页！");
}
$article_id=$sql_func->inject_check(trim($_GET["article_id"]));
if($article_id!="" and $article_id>0){
	
}else{
	exit("参数错误！");
}
$id=$sql_func->inject_check(trim($_GET["id"]));
$name=trim($_GET["name"]);
if($id!="" and $id>0 and $name!=""){
	if(!($_SESSION["auth"]["article"]&DEL)){
		exit("您无权访问本页！");
	}
	@unlink(UF.$name);
	$query="delete from `".$prefix."file` where `id`='$id'";
	$sql_func->delete($query,2,"file_list.php?article_id=".$article_id);
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
		$("a[rel='example2']").colorbox({width:"400px", height:"300px"});
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
<div class="t_center">
<?php 
	$param="select `title` from `".$prefix."article` where `id`='$article_id'";
	$param=$sql_func->select($param);
	echo $param["title"];
	unset($param);
?>
 的附件列表</div>
</div>
<div class="bottom">
<form action="file_list_bitop.php?article_id=<?php echo $article_id;?>" method="post" name="form1" onsubmit="return xcheckx()">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
  	<td align="center" colspan="11" class="red">
	序号标记为黄色的附件已不存在！
	</td>
  </tr>
  <?php
  	$query="select * from `".$prefix."file` where `article_id`='$article_id'";
	$total_num=$sql_func->num_rows($query);
  	if($total_num>0){
  ?>
  <tr>
	  <td align="center" colspan="6">
	  	<?php
		$page_id=$sql_func->inject_check(trim($_GET['page_id']));
		$page_id=($page_id=="")?"1":$page_id;
		$add="?article_id=".$article_id."&&";
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
    <td align="center" class="orange">文件名</td>
    <td align="center" class="orange">添加人</td>
    <td align="center" class="orange">添加时间</td>
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
	 	if(!file_exists(UF.$info[$i]["name"])){
			echo "<div style=\"background:yellow;font-weight:bold;\">".($i+1)."</div>";
		}else{
			echo $i+1;
		}
	 }else{
	 	echo $i+1;
	 }
	?>
	</td>
    <td align="center"><a rel="example2" href="<?php if($info[$i]["name"]!=""){echo UF2.$info[$i]["name"];}else{echo "#";}?>"><?php echo $info[$i]["name"];?></a></td>
    <td align="center"><?php echo $sql_func->id2name($prefix,$info[$i]["add_man"]);?></td>
    <td align="center"><?php echo $info[$i]["add_time"];?></td>
    <td align="center"><a href="?article_id=<?php echo $article_id;?>&&id=<?php echo $info[$i]["id"];?>&&name=<?php echo $info[$i]["name"];?>" onclick="return confirm('确定删除？');"><img src="<?php echo B_IMG;?>shanchu.gif" /></a></td>
  </tr>
  <?php 
		}
	}else{
  ?>
  <tr>
  	<td align="center" colspan="6" class="red">
	该文章的附件列表为空！
	</td>
  </tr>
  <?php 
  }
  ?>
  <tr>
  	<td align="center" colspan="6">
	<?php
	if($total_num>0){ 
		$common_func->pages($total_num,$page_id,$add,$pagesize);
	}
	?>
	</td>
  </tr>
  <tr>
  	<td align="center" colspan="12">
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