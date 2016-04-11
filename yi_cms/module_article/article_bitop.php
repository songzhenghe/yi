<?php
include("../x.php");
	if($_POST["Submit"]){
		$category_id=$_GET["category_id"];
		$id=$_POST["id"];
		$bit_type=$_POST["bit_type"];
		if($id!=""){
			if($bit_type=="del"){
				if(!($_SESSION["auth"]["article"]&DEL)){
					exit("您无权访问本页！");
				}
				for($k=0;$k<count($id);$k++){
					$query="select `name` from `".$prefix."file` where `article_id`='$id[$k]'";
					$info=$sql_func->mselect($query);
					for($i=0;$i<count($info);$i++){
						@unlink(UF.$info[$i]["name"]);
					}
					$query="delete from `".$prefix."file` where `article_id`='$id[$k]'";
					$sql_func->delete($query,3);
					//先删预览图
					$query="select `preview` from `".$prefix."article` where `id`='$id[$k]'";
					$info=$sql_func->select($query);
					@unlink(UF.$info["preview"]);					
					$query="delete from `".$prefix."article` where `id`='$id[$k]'";
					$sql_func->delete($query,3);
				}
				echo "<script>alert('您刚才的批量删除操作已成功执行！');location.href='article_list.php?category_id=".$category_id."';</script>";
				exit;
			}else if($bit_type=="edit"){
				if(!($_SESSION["auth"]["article"]&EDI)){
					exit("您无权访问本页！");
				}
				$id=implode(",",$id);
				$tag=$_POST["tag"];
				$query="update `".$prefix."article` set `tag`='$tag' where `id` in ($id)";
				$sql_func->update($query,3);
				echo "<script>alert('您刚才的批量更新操作已成功执行！');location.href='article_list.php?category_id=".$category_id."';</script>";
				exit;
			}
		}else{
			exit;
		}
	}
?>