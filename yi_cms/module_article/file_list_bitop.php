<?php
include("../x.php");
	if($_POST["Submit"]){
		$article_id=$_GET["article_id"];
		$id=$_POST["id"];
		$bit_type=$_POST["bit_type"];
		if($id!=""){
			if($bit_type=="del"){
				if(!($_SESSION["auth"]["article"]&DEL)){
					exit("����Ȩ���ʱ�ҳ��");
				}
				for($k=0;$k<count($id);$k++){
					$query="select * from `".$prefix."file` where `id`='$id[$k]'";
					$info=$sql_func->mselect($query);
					for($i=0;$i<count($info);$i++){
						if($info[$i]["name"]!=""){
							@unlink(UF.$info[$i]["name"]);
						}
					}
					$query="delete from `".$prefix."file` where `id`='$id[$k]'";
					$sql_func->delete($query,3);
				}
				echo "<script>alert('���ղŵ�����ɾ�������ѳɹ�ִ�У�');location.href='file_list.php?article_id=".$article_id."';</script>";
				exit;
			}
		}else{
			exit;
		}
	}
?>