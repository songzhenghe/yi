<?php 
include("../x.php");
if($_SESSION["super_admin"]==""){
	exit;
}
$group_id=$sql_func->inject_check(trim($_GET["group_id"]));
if($group_id!="" and $group_id>0){
	$query="select `name` from `".$prefix."group` where `id`='$group_id'";
	$info=$sql_func->select($query);
	if($info["name"]!="root"){
		
	}else{
		exit("�޿��ò�����");
	}
	$extra=" and `group_id`='$group_id'";
}
$query="select * from `".$prefix."user` where `type`='2'".$extra;
$info=$sql_func->mselect($query);
$id=$sql_func->inject_check($_GET["id"]);
if($id!="" and $id>0){
	$query="delete from `".$prefix."user` where `id`='$id'";
	$sql_func->delete($query,2,"user_list.php");
	exit;
}
if($_POST["Submit_1"]){
	$id=$_POST["id"];
	$user_name=$common_func->enter_check($_POST["user_name"],"string",20);
	if($user_name!="" and $id!=""){
		$query="select `id` from `".$prefix."user` where `user_name`='$user_name'";
		if($sql_func->num_rows($query)==0){
			$query="update `".$prefix."user` set `user_name`='$user_name' where `id`='$id'";
			$sql_func->update($query,2,"user_list.php");
			exit;
		}else{
			echo "<script>alert('�û����Ѵ��ڣ��������������ƣ�');location.href='user_list.php';</script>";
			exit;
		}
	}else{
		echo "<script>alert('�û�������Ϊ�գ�');location.href='user_list.php';</script>";
		exit;
	}
}
if($_POST["Submit_2"]){
	$id=$_POST["id"];
	$user_password=$common_func->enter_check($_POST["user_password"],"string",20);
	if($user_password!="" and $id!=""){
		define(ALL,"yi_cms");
		$user_password=md5($user_password.ALL);
		$query="update `".$prefix."user` set `user_password`='$user_password' where `id`='$id'";
		$sql_func->update($query,2,"user_list.php");
		exit;
	}else{
		echo "<script>alert('���벻��Ϊ�գ�');location.href='user_list.php';</script>";
		exit;
	}
}
if($_POST["Submit_3"]){
	$id=$_POST["id"];
	$tag=$_POST["tag"];
	if($id!="" and $tag!=""){
		$query="update `".$prefix."user` set `tag`='$tag' where `id`='$id'";
		$sql_func->update($query,2,"user_list.php");
		exit;
	}else{
		echo "<script>alert('״̬����Ϊ�գ�');location.href='user_list.php';</script>";
		exit;
	}
}
if($_POST["Submit_4"]){
	$id=$_POST["id"];
	$group_id=$_POST["group_id"];
	if($id!="" and $group_id!=""){
		$query="update `".$prefix."user` set `group_id`='$group_id' where `id`='$id'";
		$sql_func->update($query,2,"user_list.php");
		exit;
	}else{
		echo "<script>alert('�鲻��Ϊ�գ�');location.href='user_list.php';</script>";
		exit;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>���ݹ���ϵͳ</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">�û���Ϣ����</div>
</div>
<div class="bottom">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="9" align="center">
	<select name="group_id" onchange="javascript:location.href='user_list.php?group_id='+this.value;">
	  <option value="">==ѡ����==</option>
	  <?php 
	  	$parm="select `id`,`name` from `".$prefix."group` where `name`!='root'";
		$parm=$sql_func->mselect($parm);
		$sql_func->edit_select($parm,$group_id,"id","name");
	  ?>
	</select>
	</td>
  </tr>
	<?php 
		if(count($info)>0){
	?>
  <tr>
    <td align="center" class="orange">���</td>
    <td align="center" class="orange">�û���</td>
    <td align="center" class="orange">��</td>
    <td align="center" class="orange">����(����ʾ)</td>
    <td align="center" class="orange">״̬</td>
    <td align="center" class="orange">�ϴε�½ʱ��</td>
    <td align="center" class="orange">�ϴε�½IP</td>
    <td align="center" class="orange">��½����</td>
    <td align="center" class="orange">ɾ��</td>
  </tr>
  <?php 
		for($i=0;$i<count($info);$i++){
  ?>
  <form action="" method="post" name="myform-<?php echo $i;?>">
  <tr>
    <td align="center"><?php echo $i+1; ?><input name="id" type="hidden" value="<?php echo $info[$i]["id"];?>" /></td>
    <td align="center">
	<input name="user_name" type="text" class="input3" value="<?php echo $info[$i]["user_name"];?>" />
	<input name="Submit_1" type="submit" value="�޸�" />
	</td>
    <td align="center">
        <select name="group_id">
          <?php 
            $parm="select `id`,`name` from `".$prefix."group` where `name`!='root'";
            $parm=$sql_func->mselect($parm);
            $sql_func->edit_select($parm,$info[$i]["group_id"],"id","name");
			unset($parm);
          ?>
        </select>
        <input name="Submit_4" type="submit" value="�޸�" />
    </td>
    <td align="center">
	<input name="user_password" type="password" class="input3" value="" />
	<input name="Submit_2" type="submit" value="�޸�" />
	</td>
    <td align="center">
	<select name="tag">
	  <option value="1" <?php if($info[$i]["tag"]==1){echo "selected=\"selected\"";} ?>>��ʾ</option>
	  <option value="0" <?php if($info[$i]["tag"]==0){echo "selected=\"selected\"";} ?>>����</option>
	</select>
	<input name="Submit_3" type="submit" value="�޸�" />
	</td>
    <td align="center"><?php echo $info[$i]["login_time"];?></td>
    <td align="center"><?php echo $info[$i]["login_ip"];?></td>
    <td align="center"><?php echo $info[$i]["times"];?></td>
    <td align="center"><a href="?id=<?php echo $info[$i]["id"];?>" onclick="return confirm('ȷ��ɾ����');"><img src="<?php echo B_IMG;?>shanchu.gif" /></a></td>
  </tr>
  </form>
  <?php 
  		}
		}else{
  ?>
  <tr>
    <td colspan="10" align="center"><span class="red">�������û���Ϣ</span></td>
  </tr>
  <?php 
  		}
  ?>
</table>
</div>
</div>
</body>
</html>