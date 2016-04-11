<?php 
include("x.php");
$counts_visits->record_visits();
$pageinfo=substr((__FILE__),strrpos((__FILE__),"\\")+1);
$pageinfo="select * from `".$prefix."config` where `name`='$pageinfo'";
$pageinfo=$sql_func->select($pageinfo);
$mid=$sql_func->inject_check(trim($_GET["mid"]));
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
    <p class="location">当前位置：flash列表页</p>
	<?php
		$query="select * from `".$prefix."item` where `media_id`='$mid' and `tag`=1 order by `id` DESC";
		$total_num=$sql_func->num_rows($query);
		$page_id=$sql_func->inject_check(trim($_GET['page_id']));
		$page_id=($page_id=="")?"1":$page_id;
		$add="?mid=".$mid."&&";
		$pagesize="20";
		$begin=($page_id-1)*$pagesize;
		$query=$query." limit $begin,$pagesize";
    ?>
    <p class="page"><?php if($total_num>0){ $common_func->pages($total_num,$page_id,$add,$pagesize);}?></p>
    <div id="content">
        <h1>
		<?php 
			$param="select `name` from `".$prefix."media` where `id`='$mid'";
			$param=$sql_func->select($param);
			echo $param["name"];
			unset($param);
		?>
        </h1>
        <ul>
        <?php
			if($total_num>0){
			$info=$sql_func->mselect($query); 
				for($i=0;$i<count($info);$i++){
		?>
                <li><em>[<?php echo $sql_func->id2name($prefix,$info[$i]["add_man"]);?>&nbsp;&nbsp;<?php echo substr($info[$i]["add_time"],0,10);?>]</em><a href="f_content.php?id=<?php echo $info[$i]["id"];?>" title="<?php echo $info[$i]["alt"]?>"><?php echo $common_func->substrs($info[$i]["alt"],70);?></a></li>
		<?php 
           		}
        ?>
		  <?php
            }else{
                echo "flash列表为空！";	
            }
          ?>
        </ul>
    </div>
    <p class="page"><?php if($total_num>0){ $common_func->pages($total_num,$page_id,$add,$pagesize);}?></p>
    <div class="interval">&nbsp;</div>
    <div id="copyright"><?php include("incl/copyright.php");?></div>
</div>
</body>
</html>
<?php 
	include(INCL."close.php");
?>