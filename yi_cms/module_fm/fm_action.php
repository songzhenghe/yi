<?php
session_id($_POST["PHPSESSID"]);
include("../x.php");
$add_man=trim($_POST["add_man"]);
$add_man=$common_func->GetGB2312String($add_man);
if($add_man!=""){

}else{
	exit;
}

if (!empty($_FILES)) {
	if($_FILES['Filedata']['size']>0 and $_FILES['Filedata']['size']<=$upload_config["file_size"]){
		$filename=$common_func->treat_char(basename($_FILES['Filedata']['name']));
		$note=substr($filename,0,strrpos($filename,"."));
		$note=$common_func->GetGB2312String($note);
		$filetype=strtolower(substr($filename,strrpos($filename,"."),strlen($filename)-strrpos($filename,".")));
		if(in_array($filetype,$upload_config["file_type"])){
			$tempFile = $_FILES['Filedata']['tmp_name'];
			$filename=time().rand(0,100000).$filetype;
			$targetPath = ROOT.$upload_config["folder_name"]."/";
			$targetFile =  str_replace('//','/',$targetPath) .$filename;
			move_uploaded_file($tempFile,$targetFile);
	        $path=R_PATH.$upload_config["folder_name"]."/".$filename;
			$add_time=$common_func->nowtime();
			$query="insert into `".$prefix."fm` (`name`,`note`,`extend`,`path`,`add_man`,`add_time`) values ('$filename','$note','$filetype','$path','$add_man','$add_time')";
			echo $sql_func->insert($query,3,"","",1);
			include(INCL."close.php");
			exit;
		}else{
			exit;
		}
	}else{
		exit;
	}
}
?>