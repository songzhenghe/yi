<?php 
include("../x.php");
if($_SESSION["super_admin"]==""){
	exit;
}
$id=$sql_func->inject_check(trim($_GET["id"]));
if($id!="" and $id>0){
	$query="select `name` from `".$prefix."group` where `id`='$id'";
	$info=$sql_func->select($query);
	if($info["name"]=="root"){
		exit("无可用操作！");
	}
	$query="select `id` from `".$prefix."user` where `group_id`='$id'";
	if($sql_func->num_rows($query)==0){
		$query="delete from `".$prefix."group` where `id`='$id'";
		$sql_func->delete($query,2,"group_list.php");
		exit;
	}else{
		$common_func->alert("组成员不为空，此组无法删除！",2,"group_list.php");
		exit;	
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>网站管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link type="text/css" media="screen" rel="stylesheet" href="<?php echo B_CSS;?>colorbox.css" />
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script>
	$(document).ready(function(){
		$(".example1").colorbox({width:"85%", height:"85%", iframe:true});
	});
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">组列表</div>
</div>
<div class="bottom">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <?php 
  	$query="select * from `".$prefix."group` order by `id` ASC";
	$total_num=$sql_func->num_rows($query);
  	if($total_num>0){
  ?>
  <tr>
    <td colspan="5" align="center">
	<?php
		$page_id=$sql_func->inject_check(trim($_GET['page_id']));
		$page_id=($page_id=="")?"1":$page_id;
		$add="?";
		$pagesize="10";
		$begin=($page_id-1)*$pagesize;
		$query=$query." limit $begin,$pagesize";
		$common_func->pages($total_num,$page_id,$add,$pagesize);
	?>
	</td>
  </tr>
  <tr>
    <td align="center" class="orange">序号</td>
    <td align="center" class="orange">名称</td>
    <td align="center" class="orange">查看组成员</td>
    <td align="center" class="orange">编辑</td>
	<td align="center" class="orange">删除</td>
  </tr>
  <?php 
  $info=$sql_func->mselect($query); 
		for($i=0;$i<count($info);$i++){
  ?>
  <tr>
    <td align="center"><?php echo $i+1;?></td>
    <td align="center"><?php echo $info[$i]["name"];?></td>
    <td align="center">
        <a class="example1" href="user_list.php?group_id=<?php echo $info[$i]["id"];?>"><img src="<?php echo B_IMG;?>chakan.gif" /></a>
        (<?php 
			$param=$info[$i]["id"];
			$param="select `id` from `".$prefix."user` where `group_id`='$param'";
			echo $sql_func->num_rows($param);
			unset($param);
		?>)
    </td>
    <td align="center"><a class="example1" href="group_edit.php?group_id=<?php echo $info[$i]["id"];?>"><img src="<?php echo B_IMG;?>bianji.gif" /></a></td>
	<td align="center"><a href="?id=<?php echo $info[$i]["id"];?>" onclick="return confirm('确定删除？');"><img src="<?php echo B_IMG;?>shanchu.gif" /></a></td>
  </tr>
  <?php
  	}
  }else{
  ?>
  <tr>
    <td colspan="5" align="center" class="red">
	组列表为空！<a class="example1" href="group_add.php">点击添加新管理员组</a>
	</td>
  </tr>
  <?php 
  }
  ?>
  <tr>
    <td colspan="5" align="center">
	<?php
	if($total_num>0){ 
		$common_func->pages($total_num,$page_id,$add,$pagesize);
	}
	?>
	</td>
  </tr>
  <tr>
    <td colspan="5" align="center" class="red">
		root组为系统初始化组，您无法对其进行修改或删除！
	</td>
  </tr>
</table>
</div>
</div>
</body>
</html>