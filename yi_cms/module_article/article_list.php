<?php 
include("../x.php");
if(!($_SESSION["auth"]["article"]&LIS)){
	exit("您无权访问本页！");
}
$category_id=$sql_func->inject_check(trim($_GET["category_id"]));
$article_id=$sql_func->inject_check(trim($_GET["article_id"]));
if($category_id!="" and $category_id>0){
	$extra="where `category_id`='$category_id' ";
}else{
	$extra="";
}
if($article_id!="" and $article_id>0){
	if($extra!=""){
		$extra2="and `id`='$article_id' ";
	}else{
		$extra2="where `id`='$article_id' ";
	}
}else{
	$extra2="";
}
$id=$sql_func->inject_check(trim($_GET["id"]));
if($id!="" and $id>0){
	if(!($_SESSION["auth"]["article"]&DEL)){
		exit("您无权访问本页！");
	}
	$query="select `name` from `".$prefix."file` where `article_id`='$id'";
	$info=$sql_func->mselect($query);
	for($i=0;$i<count($info);$i++){
		@unlink(UF.$info[$i]["name"]);
	}
	$query="delete from `".$prefix."file` where `article_id`='$id'";
	$sql_func->delete($query,3);
	//先删预览图
	$query="select `preview` from `".$prefix."article` where `id`='$id'";
	$info=$sql_func->select($query);
	@unlink(UF.$info["preview"]);
	$query="delete from `".$prefix."article` where `id`='$id'";
	$sql_func->delete($query,2,"article_list.php?category_id=".$category_id);
	exit;
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
		$(".example1").colorbox({width:"95%", height:"95%", iframe:true});
		$("a[rel='example2']").colorbox({width:"500px", height:"400px"});
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
			}else if($(this).attr("value")=="edit"){
				$("#bit_area").html("状态：<input type=\"radio\" name=\"tag\" value=\"1\" checked=\"checked\" />显示 <input type=\"radio\" name=\"tag\" value=\"0\" />隐藏 <input type=\"submit\" name=\"Submit\" value=\"确定\" class=\"button\" />");
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
<div class="t_center">文章列表</div>
</div>
<div class="bottom">
<form action="article_bitop.php?category_id=<?php echo $category_id;?>" method="post" name="form1" onsubmit="return xcheckx()">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
  	<td align="center" colspan="11" class="red">
	序号标记为黄色的文章为孤立文章，即它没有分类！
	</td>
  </tr>
  <tr>
    <td align="center" colspan="11">
	<select name="category_id" onchange="javascript:location.href='article_list.php?article_id=<?php echo $article_id;?>&&category_id='+this.value;">
	  <option value="">==选择文章分类（默认为全部）==</option>
	  <?php
		$param="select `id`,`name`,`up_id` from `".$prefix."category` where `type`='2'";
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
			if($param[$i]["id"]==$category_id){
				echo "<option value=\"".$param[$i]["id"]."\" selected=\"selected\">".$param4."</option>";
			}else{
				echo "<option value=\"".$param[$i]["id"]."\">".$param4."</option>";
			}
		}
		unset($param,$param2,$param3,$param4);
	  ?>
	</select>
	</td>
  </tr>
  <?php
  	$query="select `id`,`category_id`,`preview`,`title`,`add_man`,`add_time`,`views`,`tag`,`order` from `".$prefix."article`".$extra.$extra2." order by `id` DESC";
	$total_num=$sql_func->num_rows($query);
  	if($total_num>0){
  ?>
  <tr>
	  <td align="center" colspan="11">
	  	<?php
		$page_id=$sql_func->inject_check(trim($_GET['page_id']));
		$page_id=($page_id=="")?"1":$page_id;
		$add="?category_id=".$category_id."&&";
		$pagesize="20";
		$begin=($page_id-1)*$pagesize;
		$query=$query." limit $begin,$pagesize";
		$common_func->pages($total_num,$page_id,$add,$pagesize);
		?>
	  </td>
  </tr>
  <tr>
    <td align="center" class="orange"><input name="checkall" id="checkall" type="button" value="√" /></td>
    <td align="center" class="orange">序号</td>
	<td align="center" class="orange">图</td>
    <td align="center" class="orange">标题</td>
    <td align="center" class="orange">显示序号</td>
    <td align="center" class="orange">状态</td>
    <td align="center" class="orange">浏览次数</td>
    <td align="center" class="orange">添加人</td>
    <td align="center" class="orange">添加时间</td>
    <td align="center" class="orange">查看附件</td>
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
	 $param=$info[$i]["category_id"];
     $param="select `id` from `".$prefix."category` where `id`='$param'";
	 $param=$sql_func->select($param);
	 if($param["id"]==""){
	 	echo "<div style=\"background:yellow;font-weight:bold;\">".($i+1)."</div>";
	 }else{
	 	echo ($i+1);
	 }
	 unset($param);
	?>
	</td>
	<td align="center">
	 <?php 
	 	if($info[$i]["preview"]!="#"){
			if(!file_exists(UF.$info[$i]["preview"])){
				echo "<img src=\"".B_IMG."no.png\">";
			}else{
				echo "<a href=\"".UF2.$info[$i]["preview"]."\" rel=\"example2\" title=\"".$info[$i]["title"]."\"><img width=\"40\" height=\"30\" src=\"".UF2.$info[$i]["preview"]."\" /></a>";
			}
		}else{
			echo "<img src=\"".B_IMG."no.png\">";
		}
	 ?>
	</td>
    <td align="center"><input name="title" type="text" value="<?php echo $info[$i]["title"];?>" class="tt input" title="<?php echo $info[$i]["title"];?>"/></td>
    <td align="center"><?php echo $info[$i]["order"];?></td>
    <td align="center"><?php echo ($info[$i]["tag"]==1)?"显示":"<span class=\"red\">隐藏</span>";?></td>
    <td align="center"><?php echo $info[$i]["views"];?></td>
    <td align="center" class="green"><?php echo $sql_func->id2name($prefix,$info[$i]["add_man"]);?></td>
    <td align="center" class="green"><?php echo $info[$i]["add_time"];?></td>
    <td align="center">
	<?php
	$param=$info[$i]["id"]; 
	$param="select `id` from `".$prefix."file` where `article_id`='$param'";
	$param=$sql_func->num_rows($param);
	if($param>0){
		echo "<a class=\"example1\" href=\"file_list.php?article_id=".$info[$i]["id"]."\"><img src=\"".B_IMG."fujian.gif\" /></a>(".$param.")";
	}else{
		echo "&nbsp;";
	}
	unset($param);
	?>
	</td>
    <td align="center"><a class="example1" href="article_edit.php?article_id=<?php echo $info[$i]["id"];?>"><img src="<?php echo B_IMG;?>bianji.gif" /></a></td>
    <td align="center"><a href="?id=<?php echo $info[$i]["id"];?>&&category_id=<?php echo $category_id;?>" onclick="return confirm('确定删除？');"><img src="<?php echo B_IMG;?>shanchu.gif" /></a></td>
  </tr>
  <?php 
		}
	}else{
	?>
  <tr>
  	<td align="center" colspan="11" class="red">
	该分类下无文章！<a class="example1" href="article_add.php">点击添加新文章</a>
	</td>
  </tr>
	<?php 
	}
  ?>
  <tr>
  	<td align="center" colspan="11">
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
		  <option value="edit">编辑</option>
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