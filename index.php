<?php 
include("x.php");
$counts_visits->record_visits();
$pageinfo=substr((__FILE__),strrpos((__FILE__),"\\")+1);
$pageinfo="select * from `".$prefix."config` where `name`='$pageinfo'";
$pageinfo=$sql_func->select($pageinfo);
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
    <div id="con-12">
        <div id="news-1">
            <h1>
			<?php 
                $param="select `name` from `".$prefix."category` where `id`=3";
                $param=$sql_func->select($param);
                echo $param["name"];
                unset($param);
            ?>
            <a href="news_list.php?cid=3">更多...</a>
            </h1>
            <ul>
            	<?php 
					$query="select * from `".$prefix."article` where `category_id`=3 and `tag`=1 order by `id` DESC limit 8";
					$info=$sql_func->mselect($query);
					$num=count($info);
					if($num>0){
						for($i=0;$i<$num;$i++){
				?>
                <li><em>[<?php echo substr($info[$i]["add_time"],0,10);?>]</em><a href="news_content.php?id=<?php echo $info[$i]["id"]?>" title="<?php echo $info[$i]["title"]?>"><?php echo $common_func->substrs($info[$i]["title"],44);?></a></li>
                <?php
						}
					}else{
						echo "新闻列表为空！";	
					}
				?>
            </ul>
        </div>
        <div id="news-2">
            <h1>
            <?php 
                $param="select `name` from `".$prefix."media` where `id`=1";
                $param=$sql_func->select($param);
                echo $param["name"];
                unset($param);
            ?>
            <a href="v_list.php?mid=1">更多...</a>
            </h1>
            <ul>
            	<?php 
					$query="select * from `".$prefix."item` where `media_id`=1 and `tag`=1 order by `id` DESC limit 8";
					$info=$sql_func->mselect($query);
					$num=count($info);
					if($num>0){
						for($i=0;$i<$num;$i++){
				?>
                <li><em>[<?php echo substr($info[$i]["add_time"],0,10);?>]</em><a href="v_content.php?id=<?php echo $info[$i]["id"];?>" title="<?php echo $info[$i]["alt"]?>"><?php echo $common_func->substrs($info[$i]["alt"],44);?></a></li>
                <?php
						}
					}else{
						echo "视频列表为空！";	
					}
				?>
            </ul>
        </div>
    </div>
    <div class="interval">&nbsp;</div>
    <div id="con-34">
        <div id="news-3">
            <h1>
            <?php 
                $param="select `name` from `".$prefix."media` where `id`=2";
                $param=$sql_func->select($param);
                echo $param["name"];
                unset($param);
            ?>
            <a href="s_list.php?mid=2">更多...</a>
            </h1>
            <ul>
            	<?php 
					$query="select * from `".$prefix."item` where `media_id`=2 and `tag`=1 order by `id` DESC limit 8";
					$info=$sql_func->mselect($query);
					$num=count($info);
					if($num>0){
						for($i=0;$i<$num;$i++){
				?>
                <li><em>[<?php echo substr($info[$i]["add_time"],0,10);?>]</em><a href="s_content.php?id=<?php echo $info[$i]["id"];?>" title="<?php echo $info[$i]["alt"]?>"><?php echo $common_func->substrs($info[$i]["alt"],44);?></a></li>
                <?php
						}
					}else{
						echo "音频列表为空！";	
					}
				?>
            </ul>
        </div>
        <div id="news-4">
            <h1>
            <?php 
                $param="select `name` from `".$prefix."media` where `id`=3";
                $param=$sql_func->select($param);
                echo $param["name"];
                unset($param);
            ?>
            <a href="f_list.php?mid=3">更多...</a>
            </h1>
            <ul>
            	<?php 
					$query="select * from `".$prefix."item` where `media_id`=3 and `tag`=1 order by `id` DESC limit 8";
					$info=$sql_func->mselect($query);
					$num=count($info);
					if($num>0){
						for($i=0;$i<$num;$i++){
				?>
                <li><em>[<?php echo substr($info[$i]["add_time"],0,10);?>]</em><a href="f_content.php?id=<?php echo $info[$i]["id"];?>" title="<?php echo $info[$i]["alt"]?>"><?php echo $common_func->substrs($info[$i]["alt"],44);?></a></li>
                <?php
						}
					}else{
						echo "flash列表为空！";	
					}
				?>
            </ul>
        </div>
    </div>
    <div class="interval">&nbsp;</div>
    <div id="news-5">
    	<h1>
            <?php 
                $param="select `name` from `".$prefix."media` where `id`=4";
                $param=$sql_func->select($param);
                echo $param["name"];
                unset($param);
            ?>
        </h1>
        <ul>
            <?php 
                $query="select * from `".$prefix."item` where `media_id`=4 and `tag`=1 order by `id` DESC limit 8";
                $info=$sql_func->mselect($query);
                $num=count($info);
                if($num>0){
                    for($i=0;$i<$num;$i++){
            ?>
            <li><a href="<?php echo $info[$i]["url"]?>" title="<?php echo $info[$i]["title"]?>" target="_blank"><?php echo $common_func->substrs($info[$i]["title"],44);?></a></li>
            <?php
                    }
                }else{
                    echo "友情链接列表为空！";	
                }
            ?>
        </ul>
    </div>
    <div class="interval">&nbsp;</div>
    <div id="copyright"><?php include("incl/copyright.php");?></div>
</div>
</body>
</html>
<?php 
	include(INCL."close.php");
?>