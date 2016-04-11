<?php
include("../x.php");
	if($_POST["Submit"]){
		$ftype=$_GET["ftype"];
		$id=$_POST["id"];
		$bit_type=$_POST["bit_type"];
		if($id!=""){
			if($bit_type=="del"){
				if(!($_SESSION["auth"]["fm"]&DEL)){
					exit("您无权访问本页！");
				}
				for($k=0;$k<count($id);$k++){
					$query="select * from `".$prefix."fm` where `id`='$id[$k]'";
					$info=$sql_func->mselect($query);
					for($i=0;$i<count($info);$i++){
						if($info[$i]["name"]!=""){
							@unlink(ROOT.$upload_config["folder_name"]."/".$info[$i]["name"]);
						}
					}
					$query="delete from `".$prefix."fm` where `id`='$id[$k]'";
					$sql_func->delete($query,3);
				}
				echo "<script>alert('您刚才的批量删除操作已成功执行！');location.href='fm_list.php?ftype=".$ftype."';</script>";
				exit;
			}
		}else{
			exit;
		}
	}
?>