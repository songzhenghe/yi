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
<title>���ݹ���ϵͳ</title>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<link href="css/default.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="tt">
	<h3>�������</h3>
	<div class="mainnav">
		<ul>
			<li><a href="../index.php" target="_blank"><img src="images/home.gif" alt="��վ��ҳ" />��վ��ҳ</a></li>
            <li><a href="counter.php" ><img src="images/share.png" alt="��վ������ͳ��" />��վ������ͳ��</a></li>
		</ul>
	</div>
    <div class="c"></div>
    <?php 
		if($_SESSION["super_admin"]!=""){
	?>
    <h3>��Ȩ����</h3>
	<div class="mainnav">
		<ul>
        	<li><a href="module_backup/backup.php" ><img src="images/share.png" alt="���ݱ�����ָ�" />���ݹ���</a></li>
			<li><a href="module_usergroup/user_add.php" ><img src="images/user.png" alt="�û����" />�û����</a></li>
			<li><a href="module_usergroup/user_list.php" ><img src="images/user.png" alt="�û�����" />�û�����</a></li>
			<li><a href="module_usergroup/group_add.php" ><img src="images/user.png" alt="��������" />�����</a></li>
            <li><a href="module_usergroup/group_list.php" ><img src="images/user.png" alt="�����" />�����</a></li>
		</ul>
	</div>
	<div class="c"></div>
    <?php 
		}
	?>
	<h2>��վ�ſ�</h2>
		<ul style="line-height:22px;padding:1em;">
			<li>������������<strong><?php echo $_SERVER['SERVER_NAME'];?></strong></li>
			<li>����������ϵͳ��<strong><?php echo @getenv('OS');?></strong></li>
			<li>�������������棺<strong><?php echo $_SERVER['SERVER_SOFTWARE'];?></strong></li>
			<li>PHP�汾��<strong><?php echo phpversion(); ?></strong></li>
			<li>���ݿ���Ϣ��<strong><?php echo mysql_get_server_info();?></strong></li>
			<li>�ļ�����ϴ���С��<strong><?php echo ini_get("upload_max_filesize");?></strong></li>
            <li><a href="server_info.php" >�鿴����...</a></li>
		</ul>
	<div class="c"></div>
	<h3>��ܰ��ʾ</h3>
		<ul style="line-height:22px;padding:1em;">
			<li>��һ��ʹ����վ��̨�����������ĳ�ʼ���� </li>
			<li>�����Խ������̨�ļ����������������վ��ȫ�� </li>
			<li>�ڹ�������ʹ����վ��̨������ȷ�˳���վ��̨ ��������Ͻǰ�ȫ�˳������˳���</li>
			<li>Ϊ�������õ����ñ�ϵͳ���Ƽ�ʹ�ùȸ��������firefox��opera��safari��ie8�ں��������</li>
		</ul>
	<div class="c"></div>
	<h2>��½��Ϣ</h2>
		<ul style="line-height:22px;padding:1em;">
			<li>�û�������<strong><?php echo $_SESSION[$_SESSION[identify]];?></strong></li>
			<li>�ϴε�½��<strong><?php $array=explode("@",$_SESSION["identify"]);echo $array[0];?></strong></li>
			<li>��½��ַ��<strong><?php echo $array[1];?></strong></li>
			<li>��½������<strong><?php echo $array[2];?></strong></li>
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
	<h2>��ϵ����</h2>
		<ul style="line-height:22px;padding:1em;">
			<li>��ϵ�ˣ� xxx </li>
			<li>����վ�� http://www.example.com </li>
			<li>M&nbsp;S&nbsp;N�� xxx</li>
			<li>E-mail��xxx</li>
		</ul>
	<div class="c"></div> 
</div>
<div class="bottom">Powered by <b>xxx</b> &copy; 2010,<strong style='color: #FF9900'>www.example.com</strong></div>
</body>
</html>
<?php
	include(INCL."close.php");
?>