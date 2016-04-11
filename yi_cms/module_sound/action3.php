<?php
session_id($_POST["PHPSESSID"]);
include("../x.php");
$media_id=$sql_func->inject_check(trim($_POST["media_id"]));
$add_man=trim($_POST["add_man"]);
$add_man=$common_func->GetGB2312String($add_man);
if($media_id!="" and $media_id>0 and $add_man!=""){

}else{
	exit;
}
if (!empty($_FILES)) {
	if($_FILES['Filedata']['size']>0 and $_FILES['Filedata']['size']<=SYS_UP_FILESIZE){
		$filename=basename($_FILES['Filedata']['name']);
		$filetype=strtolower(substr($filename,strrpos($filename,"."),strlen($filename)-strrpos($filename,".")));
		if(in_array($filetype,array(".mp3"))){
			$tempFile = $_FILES['Filedata']['tmp_name'];
			$filename=time().rand(0,100000).$filetype;
			$targetPath = UF;
			$targetFile =  str_replace('//','/',$targetPath) .$filename;
			move_uploaded_file($tempFile,$targetFile);
			$title=$filename;
			$alt="#";
			$url="#";
			$pic="#";
			$add_time=$common_func->nowtime();
			$tag='1';
			$order="1";
			$query="insert into `".$prefix."item` (`media_id`,`title`,`alt`,`url`,`pic`,`add_man`,`add_time`,`tag`,`order`,`type`,`pathinfo`) values ('$media_id','$title','$alt','$url','$pic','$add_man','$add_time','$tag','$order','3','1')";
			echo $sql_func->insert($query,3,"","",1);
			include(INCL."close.php");
			exit;
		}else{
			//echo "file extension is wrong!";
			exit;
		}
	}else{
		//echo "file size too big!";
		exit;
	}
}
?>