<?php
include("../x.php");
	if($_POST["Submit"]){
		$id=$_POST["id"];
		$bit_type=$_POST["bit_type"];
		if($id!=""){
			if($bit_type=="del"){
				if(!($_SESSION["auth"]["page"]&DEL)){
					exit("您无权访问本页！");
				}
				$id=implode(",",$id);
				$query="delete from `".$prefix."config` where `id` in ($id)";
				$sql_func->delete($query,3);
				echo "<script>alert('您刚才的批量删除操作已成功执行！');location.href='page_config_list.php';</script>";
				exit;
			}
		}else{
			exit;
		}
	}
?>