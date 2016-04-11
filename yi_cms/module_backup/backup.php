<?php 
include("../x.php");
if($_SESSION["super_admin"]==""){
	exit;
}
//获取表的名称
$query="show tables from `".$database."`";
$num=$sql_func->num_rows($query);
if($num<1){
	exit("数据库中没有数据表！程序无法继续运行！");
}
$tables=$sql_func->mselect($query,2);
//导出数据库
function dump_table($sql_func,$table, $fp){
	$query="show create table `{$table}`";
	$row=$sql_func->select($query);
	fwrite($fp,$row['Create Table'].';');
    $query="SELECT * FROM `{$table}`";
	$result=$sql_func->conn->Execute($query);
	$comma="\n";
    while (!$result->EOF) {
        fwrite($fp, $comma.get_insert_sql($table, $result->fields));
		$comma="";
		$result->MoveNext();
    }
	$result->Close();
}
//导出表数据
function get_insert_sql($table, $row){
    $sql = "INSERT INTO `{$table}` VALUES (";
    $values = array();
    foreach ($row as $value) {
        $values[] = "'" . $value . "'";
    }
    $sql .= implode(', ', $values) . ");\n";
    return $sql;
}
//开始备份工作
if($_POST["Submit_1"]){
	$time="生成时间：".date("Y-m-d H-i-s",time());
	$tablenames=$_POST["tablename"];
	if(count($tablenames)>0){
		$dot="";
		$tablenamex="包含数据表：（以@@分隔）";
		foreach ($tablenames as $tablename) {
			$tablenamex.=$dot.$tablename;
			$dot="@@";
		}
		$filename ="data/".$time."_data.sql";
		$fp = fopen($filename, 'w');
		fwrite($fp,"##".$time.";\n"."##".$tablenamex.";\n");
		foreach($tablenames as $tablename){
			dump_table($sql_func,$tablename, $fp);
		}
		fclose($fp);
		//开始下载
		header('Pragma: no-cache');
		header('Expires: 0');
		header('Content-Encoding: none');
		header('Content-Transfer-Encoding: binary');
		header('Content-type: text/plain');
		header('Content-Disposition: attachment; filename='.$filename);
		header('Content-Length: '.filesize($filename));
		$fp = fopen($filename, 'rb');
		fpassthru($fp);
		fclose($fp);
		unlink($filename);
		exit;
	}else{
		echo "<script>alert('请您至少选择一个数据表！');location.href='backup.php';</script>";
		exit;
	}
}
//开始还原工作
if($_POST["Submit_2"]){
	if($_FILES["file"]["name"]!=""){
		$filename=$common_func->fileupload("data/",array(".sql"),1000);
		$fp=fopen("data/".$filename,"r");
		$contents=fread($fp,filesize("data/".$filename));
		fclose($fp);
		$contents=explode(";",$contents);
		$tables=explode("@@",substr($contents[1],26));
		for($i=0;$i<count($tables);$i++){
			$conn->Execute("drop table `".$tables[$i]."`");
		}
		for($i=0;$i<(count($contents)-2);$i++){
			$conn->Execute($contents[$i+2]);
		}
		@unlink("data/".$filename);
		echo "<script>alert('数据恢复成功！');location.href='backup.php';</script>";
		exit;
	}else{
		echo "<script>alert('请选择数据文件！');location.href='backup.php';</script>";
		exit;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>内容管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link href="<?php echo B_CSS;?>jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
<script src='<?php echo B_JS;?>jquery.js' type="text/javascript"></script>
<script language="JavaScript" type="text/javascript" src="<?php echo B_JS;?>jquery-ui-1.8.16.custom.min.js"></script>
<script src='<?php echo B_JS;?>jquery.MetaData.js' type="text/javascript"></script>
<script src='<?php echo B_JS;?>jquery.MultiFile.js' type="text/javascript"></script>
<script>
	$(document).ready(function(){
		$( "#tabs" ).tabs();
	});
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">数据备份、恢复管理</div>
</div>
<div class="bottom">
<div id="tabs">
<ul>
    <li><a href="#tabs-1">备份</a></li>
    <li><a href="#tabs-2">还原</a></li>
</ul>
<div id="tabs-1">
<form action="" method="post" name="form1">
<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="3" align="center">数据库中的所有数据表</td>
  </tr>
  <?php 
  	$i=1;
  	foreach($tables as $table){
  ?>
  <tr>
    <td align="center"><?php echo $i; ?></td>
	<td align="center"><input name="tablename[]" type="checkbox" value="<?php echo $table[0];?>" checked="checked" /></td>
	<td align="center" class="bold"><?php echo $table[0]; ?></td>
  </tr>
  <?php 
 	$i++;
    }
  ?>
  <tr>
    <td height="30" align="center" colspan="3" class="red">所有数据将被以文件形式进行下载</td>
  </tr>
  <tr>
    <td height="30" align="center" colspan="3"><input name="Submit_1" type="submit" class="button" value="数据备份" /></td>
  </tr>
</table>
</form>
</div>
<div id="tabs-2">
<form action="" method="post" enctype="multipart/form-data" name="form2">
<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right" class="bold">请选择数据文件：</td>
    <td align="left"><input type="file" name="file" class="multi" maxlength="1" accept="sql" /></td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="red">数据文件扩展名为：sql,恢复过程可能较长，请耐心等待！</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit_2" type="submit" class="button" value="数据恢复" /></td>
    </tr>
</table>
</form>
</div>
</div>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>