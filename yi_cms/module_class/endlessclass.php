<?php 
include("../x.php");
if(!($_SESSION["auth"]["class"]>0)){
	exit("您无权访问本页！");
}
$id=$sql_func->inject_check($_GET["id"]);
$f_id2=$sql_func->inject_check($_GET["f_id2"]);
$del_id=$sql_func->inject_check($_GET["del_id"]);
if($_POST["Submit"]){
	$f_id=$_POST["f_id"];
	$type=$_POST["type"];
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	$tag=$_POST["tag"];
	$url=$common_func->enter_check($_POST["url"],"string",300);
	if($name!="" and $url!=""){
		$query="select `id` from `".$prefix."endlessclass` where `name`='$name'";
		if($sql_func->num_rows($query)==0){
			$query="insert into `".$prefix."endlessclass` (`f_id`,`type`,`name`,`order`,`tag`,`url`) values ('$f_id','$type','$name','$order','$tag','$url')";
			$sql_func->insert($query,2,"endlessclass.php");
			exit;
		}else{
			$common_func->alert("分类名称名称己存在，请输入其它名称！",2,"endlessclass.php");
			exit;
		}
	}else{
		$common_func->alert("分类名称、URL不能为空！",2,"endlessclass.php?id=".$id."&&f_id2=".$f_id2);
		exit;
	}
}
if($_POST["Submit2"]){
	$f_id=$_POST["f_id"];
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	$tag=$_POST["tag"];
	$url=$common_func->enter_check($_POST["url"],"string",300);
	if($name!="" and $url!=""){
		$query="select `id` from `".$prefix."endlessclass` where `name`='$name'and `id`<>'$id'";
		if($sql_func->num_rows($query)==0){
			$query="update `".$prefix."endlessclass` set `f_id`='$f_id',`name`='$name',`order`='$order',`tag`='$tag',`url`='$url' where `id`='$id'";
			$sql_func->update($query,2,"endlessclass.php?id=".$id."&&f_id2=".$f_id2);
			exit;
		}else{
			$common_func->alert("分类名称名称己存在，请输入其它名称！",2,"endlessclass.php?id=".$id."&&f_id2=".$f_id2);
			exit;
		}
	}else{
		$common_func->alert("分类名称、URL不能为空！",2,"endlessclass.php?id=".$id."&&f_id2=".$f_id2);
		exit;
	}
}
if($del_id!="" and $del_id>0){
	$query="select `id` from `".$prefix."endlessclass` where `f_id`='$del_id'";
	if($sql_func->num_rows($query)==0){
		$query="delete from `".$prefix."endlessclass` where `id`='$del_id'";
		$sql_func->delete($query,2,"endlessclass.php");
		exit;
	}else{
		$common_func->alert("删除失败，原因可能是该分类下存在子分类或该分类下存在内容！",2,"endlessclass.php");
		exit;
	}
}
function endlessclasslist($obj,$prefix,$f_id,$kong,$id='',$f_id2='',$condition=''){
	$extra=($condition==1)?"and `id`<".$id:"";
	$param="select * from `".$prefix."endlessclass` where `tag`=1 and `f_id`='$f_id'".$extra." order by `order` ASC";
	$param=$obj->mselect($param);
	for($i=0;$i<count($param);$i++){
		$dis=($param[$i]["type"]==0)?"disabled=\"disabled\"":"";
		$sel=($param[$i]["id"]==$f_id2)?"selected=\"selected\"":"";
		echo "<option value=\"".$param[$i]["id"]."\"".$dis.$sel.">";
		for($j=0;$j<$kong;$j++){
			echo "&nbsp;&nbsp;";
		}
		$he=$kong;
		$kong++;
		echo "┗→".$param[$i]["name"];
		echo "</option>";
		endlessclasslist($obj,$prefix,$param[$i]["id"],$kong,$id,$f_id2,$condition);
		$kong=$he;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>内容管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<?php echo B_JS;?>option disabled.js"></script>
<script type="text/javascript" src="<?php echo B_JS;?>dtree.js"></script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">无限分类管理</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center"><span class="red">添加新分类</span></td>
  </tr>
  <tr>
    <td align="right">上级分类：</td>
    <td align="left">
        <select name="f_id">
          <option value="0">--顶级分类--</option>
          <?php 
		  	endlessclasslist($sql_func,$prefix,0,0);
		  ?>
        </select>
        <span class="green">（灰色的分类无法添加下级分类）</span>
    </td>
    </tr>
  <tr>
    <td align="right">类型：</td>
    <td align="left">
        <input name="type" type="radio" value="1" checked="checked" />有下级分类 <input type="radio" name="type" value="0" />无下级分类
    </td>
  </tr>
  <tr>
    <td align="right">分类名称：</td>
    <td align="left"><input name="name" type="text" class="input" maxlength="20" /> <span class="green">（长度在0-20之间）</span></td>
    </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left"><input name="order" type="text" class="input2" value="" maxlength="4" /> <span class="green">（正整数最大4位，不填则默认为1）</span></td>
    </tr>
  <tr>
    <td align="right">分类状态：</td>
    <td align="left">
    	<input name="tag" type="radio" value="1" checked="checked" />显示 <input type="radio" name="tag" value="0" />隐藏
    </td>
  </tr>
  <tr>
    <td align="right">URL:</td>
    <td align="left"><input name="url" type="text" class="input" maxlength="300" /> <span class="green">(长度在0-300之间)</span></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="提交" /></td>
  </tr>
</table>
</form>
<hr class="hr">
<div style="width:95%;background:#FFF5FA;margin:0px auto;border:1px solid #000;text-align:left;">
	<div class="dtree">
	<p><a href="javascript: d.openAll();">全部展开</a> | <a href="javascript: d.closeAll();">全部折叠</a></p>
	<?php 
		$param="select * from `".$prefix."endlessclass` order by `id` asc";
		$param=$sql_func->mselect($param);
		if(count($param)==0){
			echo "<span class='red'>菜单项为空！</span>";
		}else{
			echo "<script>\n";
			echo "d = new dTree('d');\n";
			echo "d.add(0,-1,'顶级分类');\n";
			for($i=0;$i<count($param);$i++){
				echo "d.add(".$param[$i]["id"].",".$param[$i]["f_id"].",'".$param[$i]["name"]."',"."'endlessclass.php?id=".$param[$i]["id"]."&&f_id2=".$param[$i]["f_id"]."','点击进行编辑');\n";
			}
			echo "document.write(d);\n";
			echo "</script>\n";
			unset($param);
		}
	?>
	</div>
</div>
<?php 
	if($id!="" and $id>0 and $f_id2!=="" and $f_id2>-1){
		$query="select * from `".$prefix."endlessclass` where `id`='$id'";
		$info=$sql_func->select($query);
?>
<hr class="hr">
<form action="" method="post" name="form2">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" align="center"><span class="red">分类信息编辑</span></td>
  </tr>
  <tr>
    <td align="right">上级分类：</td>
    <td align="left">
        <select name="f_id">
          <option value="0">--顶级分类--</option>
          <?php 
		  	endlessclasslist($sql_func,$prefix,0,0,$id,$f_id2,1);
		  ?>
        </select>
        <span class="green">（无法把上级分类修改为自己或比自己id大的分类，也不能修改为灰色的分类）</span>
    </td>
    </tr>
  <tr>
    <td align="right">类型：</td>
    <td align="left">
        <?php 
			if($info["type"]==1){
				echo "<span class=\"green\">有下级分类</span>";
			}else if($info["type"]==0){
				echo "<span class=\"red\">无下级分类</span>";
			}
		?>
    </td>
  </tr>
  <tr>
    <td align="right">分类名称：</td>
    <td align="left"><input name="name" type="text" class="input" maxlength="20" value="<?php echo $info["name"];?>" /> <span class="green">（长度在0-20之间）</span></td>
    </tr>
  <tr>
    <td align="right">显示序号：</td>
    <td align="left"><input name="order" type="text" class="input2" value="<?php echo $info["order"];?>" maxlength="4" /> <span class="green">（正整数最大4位，不填则默认为1）</td>
    </tr>
  <tr>
    <td align="right">分类状态：</td>
    <td align="left">
    	<input name="tag" type="radio" value="1" <?php if($info["tag"]==1){echo "checked=\"checked\"";}?> />显示
		<input name="tag" type="radio" value="0" <?php if($info["tag"]==0){echo "checked=\"checked\"";}?>  />隐藏
    </td>
  </tr>
  <tr>
    <td align="right">URL:</td>
    <td align="left"><input name="url" type="text" class="input" maxlength="300" value="<?php echo $info["url"];?>" /> <span class="green">(长度在0-300之间)</span></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit2" type="submit" class="button" value="提交" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><a href="?del_id=<?php echo $info["id"];?>" onclick="return confirm('确定删除？');">删除分类</a><span class="green">（该分类下无子分类及内容时可删除）</span></td>
  </tr>
</table>
</form>
<?php 
	}
?>
</div>
</div>
<script type="text/javascript">
	option_disabled();
</script>
</body>
</html>
<?php
	include(INCL."close.php");
?>