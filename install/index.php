<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<?php					
	function createtable($sql) {
		$type = strtoupper(preg_replace("/^\s*CREATE TABLE IF NOT EXISTS\s+.+\s+\(.+?\).*(ENGINE|TYPE)\s*=\s*([a-z]+?).*$/isU", "\\2", $sql));
		$type = in_array($type, array('MYISAM', 'InnoDB')) ? $type : 'InnoDB';
		return preg_replace("/^\s*(CREATE TABLE IF NOT EXISTS\s+.+\s+\(.+?\)).*$/isU", "\\1", $sql).
		(mysql_get_server_info() > '4.1' ? " ENGINE=$type DEFAULT CHARSET=gb2312" : " TYPE=$type");
	}                                       
	function runquery($sql,$db_prefix) {
			$tablenum=0;
			$recordnum=0;
			$sql = str_replace("\r", "\n", str_replace('`yi_', '`'.$db_prefix, $sql));
			$ret = array();
			$num = 0;
			foreach(explode(";\n", trim($sql)) as $query) {		
				$queries = explode("\n", trim($query));
				foreach($queries as $query) {
					$ret[$num] .= $query[0] == '#' ? '' : $query;		
				}
				$num++;
			}
			unset($sql);											
			foreach($ret as $query) {
				$query = trim($query);
				if($query) {
					if(substr($query, 0, 12) == 'CREATE TABLE') {		
						$name = preg_replace("/CREATE TABLE IF NOT EXISTS `([a-z0-9_-]+)` .*/is", "\\1", $query);
						echo '������: <strong>'.$name.'</strong>&nbsp;&nbsp;&nbsp;&nbsp;<font color="#0000EE">�ɹ�!</font><br />';
						mysql_query("SET CHARACTER SET GB2312");
						mysql_query(createtable($query));		
						$tablenum++;											
					} else {
						mysql_query("SET CHARACTER SET GB2312");
						mysql_query($query);
						$recordnum++;								
					}
				}
			}
			echo "������<strong>".$tablenum."</strong>�����ݱ�"."����<strong>".$recordnum."</strong>����¼��";
		}
		
		if($_POST["Submit"]){
			$servername=trim($_POST["servername"]);
			$username  =trim($_POST["username"]);
			$userpw    =trim($_POST["userpw"]);
			$dbname    =trim($_POST["dbname"]);
			$db_prefix =trim($_POST["db_prefix"]);
			if(strpos($db_prefix,".")!==false){
				echo "<script>alert('���ݱ�ǰ׺���Ϸ������������룡');location.href='index.php';</script>";
				exit;
			}
			if($servername!="" and $username!="" and $userpw!="" and $dbname!=""){
				if(!mysql_connect($servername,$username,$userpw)){
					echo "<script>alert('����������ʧ�ܣ������û��� �����Ƿ���ȷ��');location.href='index.php';</script>";
					exit;
				}
				if(!mysql_select_db($dbname)){
					echo "<script>alert('���ݿ�ѡ��ʧ�ܣ��������ݿ����Ƿ���ȷ��');location.href='index.php';</script>";
					exit;
				}
				mysql_query("SET CHARACTER SET GB2312");
				$sqlfile = 'install.sql';						
				if(!is_readable($sqlfile)) {
					echo "<script>alert('���ݿ��ļ������ڻ��߶�ȡʧ��');location.href='index.php';</script>";
					exit;						
				}
				$fp = fopen($sqlfile, 'rb');						
				$sql = fread($fp, 2048000);							
				fclose($fp); 				
				runquery($sql,$db_prefix);
				
				$string="<?php \n";
				$string.="include(\"permission.php\"); \n";
				$string.="\$host=\"".$servername."\"; \n";
				$string.="\$user=\"".$username."\"; \n";
				$string.="\$pwd=\"".$userpw."\"; \n";
				$string.="\$database=\"".$dbname."\"; \n";
				$string.="\$prefix=\"".$db_prefix."\"; \n";
				$string.="\$db_type=\"mysql\"; \n";
				$string.="?>";
				$fp=fopen("../incl/config.php","w");
				fwrite($fp,$string);
				fclose($fp);
				exit;
			}
		}
?>
<style>
table{
	font-size:12px;
	border-collapse:collapse;
	border:1px solid #336699;
}
a{
	color:#FF0099;
}
</style>
<?php
if($_GET["step"]==""){
?>
<form action="?step=2" method="post" name="form1">
<table width="50%" border="0" align="center" cellpadding="0" cellspacing="1">
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" bgcolor="#99CC66" scope="col">���ݿⰲװ����</th>
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
    <th height="25" align="center" valign="middle" scope="row">��ǰ׺</th>
    <td height="25" align="center" valign="middle"><input name="db_prefix" type="text" value="yi_" /></td>
  </tr>
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" scope="row">
      <input type="submit" name="Submit" value="�ύ" />
    </th>
  </tr>
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" scope="row">
	���ȴ���һ�����ݿ⣬Ȼ����ִ�б�����<a href="createdb.php" target="_self">�������Ȩ�޴������ݿ�������</a><br /><br />���ݿ�Ĭ�ϱ���GB2312 ���ݿ��ļ�Ϊ./install.sql    �Ƽ�ʹ��Ӣ����д���������
	</th>
  </tr>
</table>
</form>
<?php 
}
?>