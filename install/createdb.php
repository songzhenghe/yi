<?php 
	if($_POST["Submit"]){
		$servername=trim($_POST["servername"]);
		$username  =trim($_POST["username"]);
		$userpw    =trim($_POST["userpw"]);
		$dbname    =trim($_POST["dbname"]);
		if($servername!="" and $username!="" and $userpw!="" and $dbname!=""){
			if(!mysql_connect($servername,$username,$userpw)){
					echo "<script>alert('服务器连接失败！请检查用户名 密码是否正确！');</script>";
					exit;
			}
			if(!mysql_select_db("mysql")){
				echo "<script>alert('mysql数据库选择失败！');</script>";
				exit;
			}
			mysql_query("SET CHARACTER SET GB2312");
			if(mysql_query("CREATE DATABASE `".$dbname."` DEFAULT CHARACTER SET gb2312 COLLATE gb2312_chinese_ci")){
				echo "<script>alert('数据库创建成功！');location.href='index.php';</script>";
				exit;
			}
		}
	}
?>
<style>
table{
	font-size:12px;
	border-collapse:collapse;
	border:1px solid #336699;
}
</style>
<form action="" method="post" name="form1">
<table width="50%" border="0" align="center" cellpadding="0" cellspacing="1">
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" bgcolor="#99CC66" scope="col">创建新的数据库</th>
  </tr>
  <tr>
    <th width="30%" height="25" align="center" valign="middle" scope="row">主机</th>
    <td width="70%" height="25" align="center" valign="middle">
      <input name="servername" type="text" value="localhost" />
	</td>
  </tr>
  <tr>
    <th width="30%" height="25" align="center" valign="middle" scope="row">用户名</th>
    <td width="70%" height="25" align="center" valign="middle"><input name="username" type="text" /></td>
  </tr>
  <tr>
    <th width="30%" height="25" align="center" valign="middle" scope="row">密码</th>
    <td width="70%" height="25" align="center" valign="middle"><input name="userpw" type="password" /></td>
  </tr>
  <tr>
    <th width="30%" height="25" align="center" valign="middle" scope="row">数据库名</th>
    <td width="70%" height="25" align="center" valign="middle"><input name="dbname" type="text" /></td>
  </tr>
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" scope="row">
      <input type="submit" name="Submit" value="提交" />
    </th>
  </tr>
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" scope="row">数据库默认编码GB2312 数据库文件为./install.sql 推荐使用英文填写各项参数！</th>
  </tr>
</table>
</form>