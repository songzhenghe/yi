<?php 
include("../x.php");
if(!($_SESSION["auth"]["article"]&LIS)){
	exit("您无权访问本页！");
}
if($_POST["Submit"]){
	$key=trim($_POST["key"]);
	if($key!=""){
		$query="select `id`,`title`,`add_man`,`add_time` from `".$prefix."article` where `title` like '%$key%'";
		$info=$sql_func->mselect($query);
		$tag=1;
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
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script>
	$(document).ready(function(){
		$(".example1").colorbox({width:"100%", height:"100%", iframe:true});
	});
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">文章检索</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" class="orange">输入需要检索文章的标题</td>
  </tr>
  <tr>
    <td align="center"><input name="key" type="text" class="input" /></td>
  </tr>
  <tr>
    <td align="center"><input name="Submit" type="submit" class="button" value="提交" /></td>
  </tr>
</table>
</form>
<?php 
	if(count($info)>0){
?>
<hr />
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center" class="orange">序号</td>
    <td align="center" class="orange">标题</td>
    <td align="center" class="orange">添加人</td>
    <td align="center" class="orange">添加时间</td>
  </tr>
  <?php 
  	for($i=0;$i<count($info);$i++){
  ?>
  <tr>
    <td align="center"><?php echo $i+1; ?></td>
    <td align="center">
	<a class="example1" href="article_list.php?article_id=<?php echo $info[$i]["id"];?>"><?php echo preg_replace("/($key)/i","<strong class=\"red\">\\1</strong>",$info[$i]["title"]);?></a>
	</td>
    <td align="center"><?php echo $sql_func->id2name($prefix,$info[$i]["add_man"]);?></td>
    <td align="center"><?php echo $info[$i]["add_time"];?></td>
  </tr>
  <?php 
  	}
  ?>
</table>
<?php 
	}else{
		if($tag==1){
			echo "<div align=\"center\"><span class=\"red\">没有找到相关内容！</span></div>";
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