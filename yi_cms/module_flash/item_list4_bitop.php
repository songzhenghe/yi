<?php
include("../x.php");
	if($_POST["Submit"]){
		$media_id=$_GET["media_id"];
		$id=$_POST["id"];
		$bit_type=$_POST["bit_type"];
		if($id!=""){
			if($bit_type=="del"){
				if(!($_SESSION["auth"]["flash"]&DEL)){
					exit("����Ȩ���ʱ�ҳ��");
				}
				for($k=0;$k<count($id);$k++){
					$query="select * from `".$prefix."item` where `id`='$id[$k]'";
					$info=$sql_func->mselect($query);
					for($i=0;$i<count($info);$i++){
						if($info[$i]["pathinfo"]==1){
							@unlink(UF.$info[$i]["title"]);
						}
						if($info[$i]["pic"]!="#"){
							@unlink(UF.$info[$i]["pic"]);
						}
					}
					$query="delete from `".$prefix."item` where `id`='$id[$k]'";
					$sql_func->delete($query,3);
				}
				echo "<script>alert('���ղŵ�����ɾ�������ѳɹ�ִ�У�');location.href='item_list4.php?media_id=".$media_id."';</script>";
				exit;
			}else if($bit_type=="edit"){
				if(!($_SESSION["auth"]["flash"]&EDI)){
					exit("����Ȩ���ʱ�ҳ��");
				}
				$id=implode(",",$id);
				$tag=$_POST["tag"];
				$query="update `".$prefix."item` set `tag`='$tag' where `id` in ($id)";
				$sql_func->update($query,3);
				echo "<script>alert('���ղŵ��������²����ѳɹ�ִ�У�');location.href='item_list4.php?media_id=".$media_id."';</script>";
				exit;
			}
		}else{
			exit;
		}
	}
?>