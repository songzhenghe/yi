<?php 
define(PERMISSION,"/");
include("../incl/define.php");
include(INCL."config.php");
include(INCL."common_func.php");
include(INCL."session.php");
include(INCL."sql_func.php");

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<title>内容管理系统</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link href="css/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="tt">
	<h3>快捷连接</h3>
	<div class="mainnav">
		<ul>
			<li><a href="../index.php" target="_blank"><img src="images/home.gif" alt="网站首页" />网站首页</a></li>
            <li><a href="counter.php" ><img src="images/share.png" alt="网站访问量统计" />网站访问量统计</a></li>
		</ul>
	</div>
    <div class="c"></div>
    <?php 
		if($_SESSION["super_admin"]!=""){
	?>
    <h3>特权操作</h3>
	<div class="mainnav">
		<ul>
        	<li><a href="module_backup/backup.php" ><img src="images/share.png" alt="数据备份与恢复" />数据管理</a></li>
			<li><a href="module_usergroup/user_add.php" ><img src="images/user.png" alt="用户添加" />用户添加</a></li>
			<li><a href="module_usergroup/user_list.php" ><img src="images/user.png" alt="用户管理" />用户管理</a></li>
			<li><a href="module_usergroup/group_add.php" ><img src="images/user.png" alt="组添加添加" />组添加</a></li>
            <li><a href="module_usergroup/group_list.php" ><img src="images/user.png" alt="组管理" />组管理</a></li>
		</ul>
	</div>
	<div class="c"></div>
    <?php 
		}
	?>
	<h2>网站概况</h2>
		<ul style="line-height:22px;padding:1em;">
			<li>服务器域名：<strong><?php echo $_SERVER['SERVER_NAME'];?></strong></li>
			<li>服务器操作系统：<strong><?php echo @getenv('OS');?></strong></li>
			<li>服务器解译引擎：<strong><?php echo $_SERVER['SERVER_SOFTWARE'];?></strong></li>
			<li>PHP版本：<strong><?php echo phpversion(); ?></strong></li>
			<li>数据库信息：<strong><?php echo mysql_get_server_info();?></strong></li>
			<li>文件最大上传大小：<strong><?php echo ini_get("upload_max_filesize");?></strong></li>
            <li><a href="server_info.php" >查看更多...</a></li>
		</ul>
	<div class="c"></div>
	<h3>温馨提示</h3>
		<ul style="line-height:22px;padding:1em;">
			<li>第一次使用网站后台，建议您更改初始密码 </li>
			<li>您可以将管理后台文件夹重命名，提高网站安全性 </li>
			<li>在公共场所使用网站后台后，请正确退出网站后台 （点击右上角安全退出链接退出）</li>
			<li>为了您更好的您用本系统，推荐使用谷歌浏览器、firefox、opera、safari、ie8内核浏览器！</li>
		</ul>
	<div class="c"></div>
	<h2>登陆信息</h2>
		<ul style="line-height:22px;padding:1em;">
			<li>用户姓名：<strong><?php echo $_SESSION[$_SESSION[identify]];?></strong></li>
			<li>上次登陆：<strong><?php $array=explode("@",$_SESSION["identify"]);echo $array[0];?></strong></li>
			<li>登陆地址：<strong><?php echo $array[1];?></strong></li>
			<li>登陆次数：<strong><?php echo $array[2];?></strong></li>
			<?php
				if($_SESSION["do"]==""){
					$login_time=$common_func->nowtime();
					$login_ip  =$_SERVER["REMOTE_ADDR"];
					$user_name =$_SESSION[$_SESSION[identify]];
					$query="update `".$prefix."user` set `login_time`='$login_time',`login_ip`='$login_ip',`times`=`times`+1 where `id`='$array[3]'";
					$sql_func->update($query,3);
					$_SESSION["do"]="do";
				}
			?>
		</ul>
	<div class="c"></div>
	<h2>联系我们</h2>
		<ul style="line-height:22px;padding:1em;">
			<li>联系人： xxx </li>
			<li>网　站： http://www.example.com </li>
			<li>M&nbsp;S&nbsp;N： xxx</li>
			<li>E-mail：xxx</li>
		</ul>
	<div class="c"></div> 
</div>
<div class="bottom">Powered by <b>xxx</b> &copy; 2010,<strong style='color: #FF9900'>www.example.com</strong></div>
</body>
</html>
<?php
	include(INCL."close.php");
?>