<?php
include("../x.php");
	if($_POST["Submit"]){
		$type=$_GET["type"];
		$id=$_POST["id"];
		$bit_type=$_POST["bit_type"];
		if($id!=""){
			if($bit_type=="del"){
				if(!($_SESSION["auth"]["media"]&DEL)){
					exit("您无权访问本页！");
				}
				$id=implode(",",$id);
				$query="delete from `".$prefix."media` where `id` in ($id)";
				$sql_func->delete($query,3);
				echo "<script>alert('您刚才的批量删除操作已成功执行！');location.href='media_list.php?type=".$type."';</script>";
				exit;
			}else if($bit_type=="edit"){
				if(!($_SESSION["auth"]["media"]&EDI)){
					exit("您无权访问本页！");
				}
				$id=implode(",",$id);
				$tag=$_POST["tag"];
				$query="update `".$prefix."media` set `tag`='$tag' where `id` in ($id)";
				$sql_func->update($query,3);
				echo "<script>alert('您刚才的批量更新操作已成功执行！');location.href='media_list.php?type=".$type."';</script>";
				exit;
			}
		}else{
			exit;
		}
	}
?>