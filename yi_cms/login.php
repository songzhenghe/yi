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
			$msg="用户名不存在！";
			$step=false;
		}
		define(ALL,"yi_cms");
		if($info["user_password"]!=md5($user_password.ALL)){
			$msg.="密码错误！";
			$step=false;
		}
		if($_SESSION["code"]!=$code){
			$msg.="验证码错误！";
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
		echo "<script>alert('用户名，密码，验证码均不能为空！');location.href='login.php';</script>";
		exit;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>管理员登陆</title>
<link href="css/login.css" rel="stylesheet" type="text/css" />
<link href="css/png_fix.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	function myCheck()
	{
	   for(var i=0;i<document.form1.elements.length-1;i++)
	   {
		  if(document.form1.elements[i].value=="")
		  {
			 alert("请将账号、密码、验证码全部填写完之后再提交！");
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
            <th>账　号:</th>
            <td>
				<div class="logo-icon">
					<div class="pw"></div>
					<input name="user_name" type="text" class="input pw2" value="" maxlength="20" />
				</div>
			</td>
          </tr>
          <tr>
            <th>密　码:</th>
            <td>
				<div class="logo-icon">
					<div class="pwpd"></div>
					<input name="user_password" type="password" class="input pwpd2" value="" maxlength="20" />
              	</div>
			</td>
          </tr>
		  <tr>
            <th>验证码:</th>
            <td>
				<div class="logo-icon">
					<div class="yan"></div>
					<input name="code" type="text" class="input yan2" value="" maxlength="6" />
              	</div>
				&nbsp;&nbsp;&nbsp;<img src="images/code.php" style="cursor:pointer;" title="看不清楚可以点击更换！" onclick="this.src='images/code.php?'+Math.random();"/>
			</td>
          </tr>
          <tr>
            <th></th>
            <td>
				<input name="submit" type="submit" style="margin-left:1.5em;margin-top:.5em;width:80px;height:30px;" value="登陆"/>
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
