<?php 
include("x.php");
$counts_visits->record_visits();
$pageinfo=substr((__FILE__),strrpos((__FILE__),"\\")+1);
$pageinfo="select * from `".$prefix."config` where `name`='$pageinfo'";
$pageinfo=$sql_func->select($pageinfo);
$id=$sql_func->inject_check(trim($_GET["id"]));
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<?php echo "<title>".$pageinfo["title"]."</title>\n";?>
<?php echo "<meta name=\"keywords\" content=\"".$pageinfo["keywords"]."\" />\n";?>
<?php echo "<meta name=\"description\" content=\"".$pageinfo["description"]."\" />\n";?>
<link href="css/main.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" rev="stylesheet" href="css/menu.css" type="text/css" />
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/menu.js"></script>
</head>
<body>
<div id="container">
    <div id="banner"><?php include("incl/banner.php")?></div>
    <div id="menu"><?php include("incl/menu.php");?></div>
    <div class="interval">&nbsp;</div>
    <p class="location">当前位置：新闻内容页</p>
    <?php
    	$query="select * from `".$prefix."article` where `id`='$id' and `tag`=1";
		$info=$sql_func->select($query);
	?>
    <p class="article_header">
    	<strong><?php echo $info["title"];?></strong><br />
        添加人：<?php echo $sql_func->id2name($prefix,$info["add_man"]);?>&nbsp;&nbsp;
		添加时间：<?php echo $info["add_time"];?>&nbsp;&nbsp;
		浏览次数：<?php echo $info["views"];?>
        <?php $sql_func->visit($common_func,$prefix,$id);?>
    </p>
    <hr class="line" />
    <div class="interval">&nbsp;</div>
    <div id="article_content"><?php echo $info["content"];?></div>
    <p class="page">
    	<?php
        	$param="select `id`,`title` from `".$prefix."article` where `id`<'$id' and `tag`=1 and `category_id`='$info[category_id]' order by `id` desc limit 1";
			$param=$sql_func->select($param);
			if($param!=""){
				echo "上一篇：<a href=\"?id=".$param["id"]."\" title=\"".$param["title"]."\">".$common_func->substrs($param["title"],44)."</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			}else{
				echo "上一篇：没有了&nbsp;&nbsp;&nbsp;&nbsp;";	
			}
			$param="select `id`,`title` from `".$prefix."article` where `id`>'$id' and `tag`=1 and `category_id`='$info[category_id]' order by `id` asc limit 1";
			$param=$sql_func->select($param);
			if($param!=""){
				echo "下一篇：<a href=\"?id=".$param["id"]."\" title=\"".$param["title"]."\">".$common_func->substrs($param["title"],44)."</a>";
			}else{
				echo "下一篇：没有了";	
			}
			unset($param);
		?>
    </p>
    <div class="interval">&nbsp;</div>
    <div id="copyright"><?php include("incl/copyright.php");?></div>
</div>
</body>
</html>
<?php 
	include(INCL."close.php");
?>