<?php
include("../x.php");
	if($_POST["Submit"]){
		$id=$_POST["id"];
		$bit_type=$_POST["bit_type"];
		if($id!=""){
			if($bit_type=="del"){
				if(!($_SESSION["auth"]["page"]&DEL)){
					exit("����Ȩ���ʱ�ҳ��");
				}
				$id=implode(",",$id);
				$query="delete from `".$prefix."config` where `id` in ($id)";
				$sql_func->delete($query,3);
				echo "<script>alert('���ղŵ�����ɾ�������ѳɹ�ִ�У�');location.href='page_config_list.php';</script>";
				exit;
			}
		}else{
			exit;
		}
	}
?>