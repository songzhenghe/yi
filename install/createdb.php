<?php 
	if($_POST["Submit"]){
		$servername=trim($_POST["servername"]);
		$username  =trim($_POST["username"]);
		$userpw    =trim($_POST["userpw"]);
		$dbname    =trim($_POST["dbname"]);
		if($servername!="" and $username!="" and $userpw!="" and $dbname!=""){
			if(!mysql_connect($servername,$username,$userpw)){
					echo "<script>alert('����������ʧ�ܣ������û��� �����Ƿ���ȷ��');</script>";
					exit;
			}
			if(!mysql_select_db("mysql")){
				echo "<script>alert('mysql���ݿ�ѡ��ʧ�ܣ�');</script>";
				exit;
			}
			mysql_query("SET CHARACTER SET GB2312");
			if(mysql_query("CREATE DATABASE `".$dbname."` DEFAULT CHARACTER SET gb2312 COLLATE gb2312_chinese_ci")){
				echo "<script>alert('���ݿⴴ���ɹ���');location.href='index.php';</script>";
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
    <th height="25" colspan="2" align="center" valign="middle" bgcolor="#99CC66" scope="col">�����µ����ݿ�</th>
  </tr>
  <tr>
    <th width="30%" height="25" align="center" valign="middle" scope="row">����</th>
    <td width="70%" height="25" align="center" valign="middle">
      <input name="servername" type="text" value="localhost" />
	</td>
  </tr>
  <tr>
    <th width="30%" height="25" align="center" valign="middle" scope="row">�û���</th>
    <td width="70%" height="25" align="center" valign="middle"><input name="username" type="text" /></td>
  </tr>
  <tr>
    <th width="30%" height="25" align="center" valign="middle" scope="row">����</th>
    <td width="70%" height="25" align="center" valign="middle"><input name="userpw" type="password" /></td>
  </tr>
  <tr>
    <th width="30%" height="25" align="center" valign="middle" scope="row">���ݿ���</th>
    <td width="70%" height="25" align="center" valign="middle"><input name="dbname" type="text" /></td>
  </tr>
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" scope="row">
      <input type="submit" name="Submit" value="�ύ" />
    </th>
  </tr>
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" scope="row">���ݿ�Ĭ�ϱ���GB2312 ���ݿ��ļ�Ϊ./install.sql �Ƽ�ʹ��Ӣ����д���������</th>
  </tr>
</table>
</form>