<?php
define(PERMISSION,"/");
include("../incl/define.php");
include(INCL."config.php");
include(INCL."common_func.php");
include(INCL."sql_func.php");

if($_POST["submit"]){
	$user_name    =trim($_POST["user_name"]);
	$user_password=trim($_POST["user_password"]);
	$code         =trim($_POST["code"]);
	if($user_name!="" and $user_password!="" and $code!=""){
		$msg="";
		$query="select * from `".$prefix."user` where `user_name`='$user_name' and `tag`=1";
		$info =$sql_func->select($query);
		if($info==""){
			$msg="�û��������ڣ�";
			$step=false;
		}
		define(ALL,"yi_cms");
		if($info["user_password"]!=md5($user_password.ALL)){
			$msg.="�������";
			$step=false;
		}
		if($_SESSION["code"]!=$code){
			$msg.="��֤�����";
			$step=false;
		}
		if($msg!="" and $step==false){
			echo "<script>alert('".$msg."');location.href='login.php';</script>";
			exit;
		}else{
			if($info["type"]==1){
				$_SESSION["super_admin"]=$info["user_name"];
			}
		    $_SESSION["identify"]=$info["login_time"]."@".$info["login_ip"]."@".$info["times"]."@".$info["id"];
		    $_SESSION[$_SESSION[identify]]=$info["user_name"];
			$query="select * from `".$prefix."group` where `id`='$info[group_id]'";
			$_SESSION["auth"]=$sql_func->select($query);
		    echo "<script>window.location.href='admin.php';</script>";
			exit;
		}	
	}else{
		echo "<script>alert('�û��������룬��֤�������Ϊ�գ�');location.href='login.php';</script>";
		exit;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>����Ա��½</title>
<link href="css/login.css" rel="stylesheet" type="text/css" />
<link href="css/png_fix.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	function myCheck()
	{
	   for(var i=0;i<document.form1.elements.length-1;i++)
	   {
		  if(document.form1.elements[i].value=="")
		  {
			 alert("�뽫�˺š����롢��֤��ȫ����д��֮�����ύ��");
			 document.form1.elements[i].focus();
			 return false;
		  }
	   }
	   return true;
	}
</script>
</head>
<body>
<div id="main">
  <div id="wrap">
    <div class="logo">
      <div id="logo" class="png"></div>
    </div>
  </div>
  <div id="wrapb"></div>
  <div id="wrapc">
    <div class="login">
      <form action="" method="post" name="form1" onsubmit="return myCheck()">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <th>�ˡ���:</th>
            <td>
				<div class="logo-icon">
					<div class="pw"></div>
					<input name="user_name" type="text" class="input pw2" value="" maxlength="20" />
				</div>
			</td>
          </tr>
          <tr>
            <th>�ܡ���:</th>
            <td>
				<div class="logo-icon">
					<div class="pwpd"></div>
					<input name="user_password" type="password" class="input pwpd2" value="" maxlength="20" />
              	</div>
			</td>
          </tr>
		  <tr>
            <th>��֤��:</th>
            <td>
				<div class="logo-icon">
					<div class="yan"></div>
					<input name="code" type="text" class="input yan2" value="" maxlength="6" />
              	</div>
				&nbsp;&nbsp;&nbsp;<img src="images/code.php" style="cursor:pointer;" title="����������Ե��������" onclick="this.src='images/code.php?'+Math.random();"/>
			</td>
          </tr>
          <tr>
            <th></th>
            <td>
				<input name="submit" type="submit" style="margin-left:1.5em;margin-top:.5em;width:80px;height:30px;" value="��½"/>
			</td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</div>
<div class="bottom">www.example.com</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>
