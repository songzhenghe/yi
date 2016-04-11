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
						echo '创建表: <strong>'.$name.'</strong>&nbsp;&nbsp;&nbsp;&nbsp;<font color="#0000EE">成功!</font><br />';
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
			echo "共创建<strong>".$tablenum."</strong>个数据表！"."插入<strong>".$recordnum."</strong>条记录！";
		}
		
		if($_POST["Submit"]){
			$servername=trim($_POST["servername"]);
			$username  =trim($_POST["username"]);
			$userpw    =trim($_POST["userpw"]);
			$dbname    =trim($_POST["dbname"]);
			$db_prefix =trim($_POST["db_prefix"]);
			if(strpos($db_prefix,".")!==false){
				echo "<script>alert('数据表前缀不合法！请重新输入！');location.href='index.php';</script>";
				exit;
			}
			if($servername!="" and $username!="" and $userpw!="" and $dbname!=""){
				if(!mysql_connect($servername,$username,$userpw)){
					echo "<script>alert('服务器连接失败！请检查用户名 密码是否正确！');location.href='index.php';</script>";
					exit;
				}
				if(!mysql_select_db($dbname)){
					echo "<script>alert('数据库选择失败！请检查数据库名是否正确！');location.href='index.php';</script>";
					exit;
				}
				mysql_query("SET CHARACTER SET GB2312");
				$sqlfile = 'install.sql';						
				if(!is_readable($sqlfile)) {
					echo "<script>alert('数据库文件不存在或者读取失败');location.href='index.php';</script>";
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
    <th height="25" colspan="2" align="center" valign="middle" bgcolor="#99CC66" scope="col">数据库安装程序</th>
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
    <th height="25" align="center" valign="middle" scope="row">表前缀</th>
    <td height="25" align="center" valign="middle"><input name="db_prefix" type="text" value="yi_" /></td>
  </tr>
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" scope="row">
      <input type="submit" name="Submit" value="提交" />
    </th>
  </tr>
  <tr>
    <th height="25" colspan="2" align="center" valign="middle" scope="row">
	请先创建一个数据库，然后再执行本程序！<a href="createdb.php" target="_self">如果您有权限创建数据库请点这里！</a><br /><br />数据库默认编码GB2312 数据库文件为./install.sql    推荐使用英文填写各项参数！
	</th>
  </tr>
</table>
</form>
<?php 
}
?>