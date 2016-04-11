<?php 
include("../x.php");
if(!($_SESSION["auth"]["menu"]&LIS)){
	exit("您无权访问本页！");
}
$category_id=$sql_func->inject_check(trim($_GET["category_id"]));
if($category_id!="" and $category_id>0){
	$query="select * from `".$prefix."category` where `id`='$category_id'";
	$info=$sql_func->select($query);
}
if($_POST["Submit"]){
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$tag=$_POST["tag"];
	$target=$_POST["target"];
	if($name!="" and $tag!=""){
		$query="update `".$prefix."category` set `name`='$name',`order`='$order',`url`='$url',`tag`='$tag',`target`='$target' where `id`='$category_id'";
		$sql_func->update($query,"2","menu_list.php?category_id=".$category_id);
		exit;
	}else{
		echo "<script>alert('名称，状态均不能为空！');location.history.back(-1);</script>";
		exit;
	}
}
$id=$sql_func->inject_check(trim($_GET["id"]));
if($id!="" and $id>0){
	if(!($_SESSION["auth"]["menu"]&DEL)){
		exit("您无权访问本页！");
	}
	$query="select `id` from `".$prefix."category` where `up_id`='$id'";//删除检测
	$num=$sql_func->num_rows($query);
	if($num>0){
		echo "<script>alert('参数传递异常，请不要违规操作！');location.href='menu_list.php';</script>";
		exit;
	}
	$query="delete from `".$prefix."category` where `id`='$id'";
	$sql_func->delete($query,2,"menu_list.php");
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
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script>
	$(document).ready(function(){
		$(".example1").colorbox({width:"950px", height:"550px", iframe:true});
	});
</script>
<script type="text/javascript" src="<?php echo B_JS;?>dtree.js"></script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">菜单查看</div>
</div>
<div class="bottom">
<div style="width:500px;background:#FFF5FA;margin:20px auto;border:1px solid #000;text-align:left;">
	<div class="dtree">
	<p><a href="javascript: d.openAll();">全部展开</a> | <a href="javascript: d.closeAll();">全部折叠</a></p>
	<?php 
		$param="select * from `".$prefix."category` order by `id` asc";
		$param=$sql_func->mselect($param);
		if(count($param)==0){
			echo "<span class='red'>菜单项为空！</span>";
		}else{
			echo "<script>\n";
			echo "d = new dTree('d');\n";
			echo "d.add(0,-1,'菜单列表');\n";
			for($i=0;$i<count($param);$i++){
				echo "d.add(".$param[$i]["id"].",".$param[$i]["up_id"].",'".$param[$i]["name"]."',"."'menu_list.php?category_id=".$param[$i]["id"]."','点击进行编辑');\n";
			}
			echo "document.write(d);\n";
			echo "</script>\n";
			unset($param);
		}
	?>
	</div>
</div>
<?php 
if(!($_SESSION["auth"]["menu"]&EDI)){
	exit("您无权访问本页！");
}else{
if($category_id!="" and $category_id>0){
?>
<form action="" method="post" name="form1">
<table width="95%" border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="2" align="center" class="red">菜单项编辑</td>
    </tr>
  <tr>
    <td align="right">ID：</td>
    <td align="left"><span class="bold"><?php echo $info["id"];?></span></td>
  </tr>
  <tr>
    <td align="right">名称：</td>
    <td align="left"><input name="name" type="text" class="input" value="<?php echo $info["name"];?>" /><span class="green">(长度在0-20之间)</span></td>
  </tr>
  <tr>
    <td align="right">级别：</td>
    <td align="left">
	<?php 
		if($info["rank"]==1){
			echo "一级菜单";
		}else if($info["rank"]==2){
			echo "二级菜单";
		}else if($info["rank"]==3){
			echo "三级菜单";
		}
	?>
	</td>
  </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left"><input name="order" type="text" class="input2" value="<?php echo $info["order"];?>" /><span class="green">（正整数最大4位）</span></td>
  </tr>
  <tr>
    <td align="right">类型：</td>
    <td align="left">
	<?php
		if($info["type"]==1){
			echo "有下级菜单";
		}else if($info["type"]==2){
			echo "无下级菜单,跳至新闻页面";
		}else if($info["type"]==3){
			echo "无下级菜单,跳至指定地址";
		}
	?>
    </td>
  </tr>
  <tr>
    <td align="right">URL地址：</td>
    <td align="left">
	<input name="url" type="text" class="input" value="<?php echo $info["url"];?>" <?php if($info["type"]!=3){echo "disabled=\"disabled\"";}?> /> <span class="green">(长度在0-300之间，可选)</span>
	</td>
  </tr>
  <tr>
    <td align="right">状态：</td>
    <td align="left">
	<input type="radio" name="tag" value="1" <?php if($info["tag"]==1){echo "checked=\"checked\"";}?> />
	导航显示
	<input type="radio" name="tag" value="0" <?php if($info["tag"]==0){echo "checked=\"checked\"";}?>/>
	导航隐藏</td>
  </tr>
  <tr>
    <td align="right">目标：</td>
    <td align="left">
	<input type="radio" name="target" value="1" <?php if($info["target"]==1){echo "checked=\"checked\"";}?> />
	本窗口
	<input type="radio" name="target" value="2" <?php if($info["target"]==2){echo "checked=\"checked\"";}?>/>
	新窗口</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">添加人：<?php echo $sql_func->id2name($prefix,$info["add_man"]);?> | 添加时间：<?php echo $info["add_time"];?></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="重置" /></td>
  </tr>
  <tr>
  <td colspan="2" align="right" class="red">
  	如果您想删除此菜单项，请确保它无任何子菜单项　　　　　　　　　　
  	<?php 
		$param="select `id` from `".$prefix."category` where `up_id`='$info[id]'";
		$param=$sql_func->num_rows($param);
		if($param==0){
	?>
	<a href="menu_list.php?id=<?php echo $info["id"];?>" onclick="return confirm('确定删除？');"><span class="red"># 删除 #</span></a>
	<?php 
		}else{
			echo "此菜单项有<span class=\"bold\">".$param."</span>个子菜单项，无法删除！";
		}
	?>
  </td>
  </tr>
  <?php 
  	if($info["type"]==2){
  ?>
  <tr>
  	<td colspan="2" align="center" class="green2">
	<?php 
		$param="select `id` from `".$prefix."article` where `category_id`='$category_id'";
		$param=$sql_func->num_rows($param);
		if($param>0){
			echo "<a class='example1' href='../module_article/article_list.php?category_id=".$category_id."'>查看此菜单的文章(".$param.")</a>";
		}else{
			echo "<span class='red'>此菜单下无文章！</span>";
		}
	?>
	</td>
  </tr>
  <?php 
  	}
  ?>
</table>
</form>
<?php 
}else{
?>
<table width="800" border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="2" align="center" class="green">请点击上边的菜单项列表选择需要编辑的菜单！</td>
  </tr>
</table>
<?php 
}
}
?>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>