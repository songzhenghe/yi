<?php
include("../x.php");
	if($_POST["Submit"]){
		$type=$_GET["type"];
		$id=$_POST["id"];
		$bit_type=$_POST["bit_type"];
		if($id!=""){
			if($bit_type=="del"){
				if(!($_SESSION["auth"]["media"]&DEL)){
					exit("����Ȩ���ʱ�ҳ��");
				}
				$id=implode(",",$id);
				$query="delete from `".$prefix."media` where `id` in ($id)";
				$sql_func->delete($query,3);
				echo "<script>alert('���ղŵ�����ɾ�������ѳɹ�ִ�У�');location.href='media_list.php?type=".$type."';</script>";
				exit;
			}else if($bit_type=="edit"){
				if(!($_SESSION["auth"]["media"]&EDI)){
					exit("����Ȩ���ʱ�ҳ��");
				}
				$id=implode(",",$id);
				$tag=$_POST["tag"];
				$query="update `".$prefix."media` set `tag`='$tag' where `id` in ($id)";
				$sql_func->update($query,3);
				echo "<script>alert('���ղŵ��������²����ѳɹ�ִ�У�');location.href='media_list.php?type=".$type."';</script>";
				exit;
			}
		}else{
			exit;
		}
	}
?>