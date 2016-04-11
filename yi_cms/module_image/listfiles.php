<?php 
include("../x.php");
$conn->Execute("SET CHARACTER SET UTF8");
$id=$_POST["id"];
if($id!="" and $id>0){
	$query="select `id`,`alt`,`pic` from `".$prefix."item` where `id`='$id'";
	$info=$sql_func->select($query);
	echo json_encode($info);
	include(INCL."close.php");
	exit;
}else{
	exit("²ÎÊý´íÎó£¡");
}
?>
