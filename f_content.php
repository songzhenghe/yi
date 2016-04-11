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
    <p class="location">当前位置：flash播放页</p>
    <?php
    	$query="select * from `".$prefix."item` where `id`='$id' and `tag`=1";
		$info=$sql_func->select($query);
		if($info["pathinfo"]==1){
			$path=URL."userfiles/".$info["title"];
		}else{
			if(!is_int(strpos($info["title"],"http://")) and is_int(strpos($info["title"],"../"))){
				$path=substr($info["title"],3);
			}else{
				$path=$info["title"];
			}
		}
	?>
    <p class="article_header">
    	<strong><?php echo $info["alt"];?></strong><br />
        添加人：<?php echo $sql_func->id2name($prefix,$info["add_man"]);?>&nbsp;&nbsp;
		添加时间：<?php echo $info["add_time"];?>
    </p>
    <hr class="line" />
    <div class="interval">&nbsp;</div>
    <div id="article_content">
        <div align="center">
        <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="450" height="350" id="<?php echo $path;?>" align="middle">
        <param name="allowScriptAccess" value="sameDomain" />
        <param name="movie" value="<?php echo $path;?>" />
        <param name="quality" value="high" />
        <param name="bgcolor" value="#ffffff" />
        <embed src="<?php echo $path;?>" quality="high" bgcolor="#ffffff" width="450" height="350" name="<?php echo $path;?>" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />
        </object>
        </div><br /><br />
        <?php 
        	if($info["pic"]!="#" and file_exists(ROOT."userfiles/".$info["pic"])){
        		echo "<img src=\"".URL."userfiles/".$info["pic"]."\" width=\"200\" height=\"200\" />";
        	}else{
        		echo "预览图片未设置或已被删除！";
        	}
        ?>
        <br /><br />
        <?php 
			if($info["url"]!="#"){
		?>
        链接地址：<a href="<?php echo $info["url"];?>" target="_blank"><?php echo $info["url"];?></a>
        <?php 
			}
		?>
    </div>
    <p class="page">
    	<?php
        	$param="select `id`,`alt` from `".$prefix."item` where `id`<'$id' and `tag`=1 and `media_id`='$info[media_id]' order by `id` desc limit 1";
			$param=$sql_func->select($param);
			if($param!=""){
				echo "上一篇：<a href=\"?id=".$param["id"]."\" title=\"".$param["alt"]."\">".$common_func->substrs($param["alt"],44)."</a>&nbsp;&nbsp;&nbsp;&nbsp;";
			}else{
				echo "上一篇：没有了&nbsp;&nbsp;&nbsp;&nbsp;";	
			}
			$param="select `id`,`alt` from `".$prefix."item` where `id`>'$id' and `tag`=1 and `media_id`='$info[media_id]' order by `id` asc limit 1";
			$param=$sql_func->select($param);
			if($param!=""){
				echo "下一篇：<a href=\"?id=".$param["id"]."\" title=\"".$param["alt"]."\">".$common_func->substrs($param["alt"],44)."</a>";
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