<?php 
include("../x.php");
if(!($_SESSION["auth"]["menu"]&ADD)){
	exit("您无权访问本页！");
}
if($_POST["Submit_1"]){
	$rank="1";
	$type=$_POST["type"];
	$up_id="0";
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$array=explode("@",$_SESSION["identify"]);
	$add_man=$array[3];
	$add_time=$common_func->nowtime();
	$tag=$_POST["tag"];
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	$target=$_POST["target"];
	if($type!="" and $name!="" and $add_man!="" and $add_time!="" and $tag!=""){
		$query="select `id` from `".$prefix."category` where `name`='$name' and `rank`='1'";
		if($sql_func->num_rows($query)==0){
			$query="insert into `".$prefix."category` (`rank`,`type`,`up_id`,`name`,`add_man`,`add_time`,`tag`,`url`,`order`,`target`) values ('$rank','$type','$up_id','$name','$add_man','$add_time','$tag','$url','$order','$target')";
			$sql_func->insert($query,2,"menu_add.php");
			exit;
		}else{
			echo "<script>alert('此菜单项已存在，请输入其它名称！');location.href='menu_add.php';</script>";
			exit;
		}
	}else{
		echo "<script>alert('名称，类型，状态均不能为空！');location.href='menu_add.php';</script>";
		exit;
	}
}
if($_POST["Submit_2"]){
	$rank="2";
	$type=$_POST["type"];
	$up_id=$_POST["up_id"];
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$array=explode("@",$_SESSION["identify"]);
	$add_man=$array[3];
	$add_time=$common_func->nowtime();
	$tag=$_POST["tag"];
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	$target=$_POST["target"];
	if($type!="" and $up_id!="" and $name!="" and $add_man!="" and $add_time!="" and $tag!=""){
		$query="select `id` from `".$prefix."category` where `name`='$name' and `rank`='2'";
		if($sql_func->num_rows($query)==0){
			$query="insert into `".$prefix."category` (`rank`,`type`,`up_id`,`name`,`add_man`,`add_time`,`tag`,`url`,`order`,`target`) values ('$rank','$type','$up_id','$name','$add_man','$add_time','$tag','$url','$order','$target')";
			$sql_func->insert($query,2,"menu_add.php");
			exit;
		}else{
			echo "<script>alert('此菜单项已存在，请输入其它名称！');location.href='menu_add.php';</script>";
			exit;
		}
	}else{
		echo "<script>alert('名称，类型，父菜单均不能为空！');location.href='menu_add.php';</script>";
		exit;
	}
}
if($_POST["Submit_3"]){
	$rank="3";
	$type=$_POST["type"];
	$up_id=$_POST["up_id"];
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$array=explode("@",$_SESSION["identify"]);
	$add_man=$array[3];
	$add_time=$common_func->nowtime();
	$tag=$_POST["tag"];
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	$target=$_POST["target"];
	if($type!="" and $up_id!="" and $name!="" and $add_man!="" and $add_time!="" and $tag!=""){
		$query="select `id` from `".$prefix."category` where `name`='$name' and `rank`='3'";
		if($sql_func->num_rows($query)==0){
			$query="insert into `".$prefix."category` (`rank`,`type`,`up_id`,`name`,`add_man`,`add_time`,`tag`,`url`,`order`,`target`) values ('$rank','$type','$up_id','$name','$add_man','$add_time','$tag','$url','$order','$target')";
			$sql_func->insert($query,2,"menu_add.php");
			exit;
		}else{
			echo "<script>alert('此菜单项已存在，请输入其它名称！');location.href='menu_add.php';</script>";
			exit;
		}
	}else{
		echo "<script>alert('名称，类型，父菜单均不能为空！');location.href='menu_add.php';</script>";
		exit;
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>内容管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link href="<?php echo B_CSS;?>jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
<script language="JavaScript" type="text/javascript" src="<?php echo B_JS;?>jquery.js"></script>
<script language="JavaScript" type="text/javascript" src="<?php echo B_JS;?>jquery-ui-1.8.16.custom.min.js"></script>
<script>
	$(document).ready(function(){
		$( "#tabs" ).tabs();
		$(".addurl1").change(function(){
			if($(this).attr("value")=="3"){
				$("#url1").removeAttr("disabled");
			}else{
				$("#url1").attr("disabled","disabled");
			}
		});
		$(".addurl2").change(function(){
			if($(this).attr("value")=="3"){
				$("#url2").removeAttr("disabled");
			}else{
				$("#url2").attr("disabled","disabled");
			}
		});
		$(".addurl3").change(function(){
			if($(this).attr("value")=="3"){
				$("#url3").removeAttr("disabled");
			}else{
				$("#url3").attr("disabled","disabled");
			}
		});
	});
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">菜单添加</div>
</div>
<div class="bottom">
<div id="tabs">
<ul>
    <li><a href="#tabs-1">一级菜单项添加</a></li>
    <li><a href="#tabs-2">二级菜单项添加</a></li>
    <li><a href="#tabs-3">三级菜单项添加</a></li>
</ul>
<div id="tabs-1">
    <form action="" method="post" name="form1">
    <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="2" align="center" class="red">一级菜单项添加</td>
      </tr>
      <tr>
        <td align="right">名称：</td>
        <td align="left">
          <input name="name" type="text" value="" class="input" />
          <span class="green">(长度在0-20之间)</span>
        </td>
      </tr>
      <tr>
        <td align="right">显示序号：</td>
        <td align="left">
          <input name="order" type="text" value="" class="input2" /> 
          <span class="green">（正整数最大4位，不填则默认为1）</span>    </td>
      </tr>
      <tr>
        <td align="right">类型：</td>
        <td align="left">
          <select name="type" class="addurl1">
            <option value="1">有下级菜单</option>
            <option value="2">无下级菜单,跳至新闻页面</option>
            <option value="3">无下级菜单,跳至指定地址</option>
          </select>
        </td>
      </tr>
      <tr>
        <td align="right">URL地址：</td>
        <td align="left">
          <input name="url" id="url1" type="text" value="" class="input" disabled="disabled" /> 
          <span class="green">(长度在0-300之间，可选)</span>
        </td>
      </tr>
      <tr>
        <td align="right">状态：</td>
        <td align="left">
          <input name="tag" type="radio" value="1" checked="checked" />
         导航栏显示  
         <input  name="tag" type="radio" value="0" />
         导航栏隐藏
        </td>
      </tr>
      <tr>
        <td align="right">目标：</td>
        <td align="left">
          <input name="target" type="radio" value="1" checked="checked" />
         本窗口
         <input  name="target" type="radio" value="2" />
         新窗口
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]]; ?> | 添加时间：系统自动记录</td>
        </tr>
      <tr>
        <td colspan="2" align="center">
          <input name="Submit_1" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset_1" type="reset" class="button" value="重置" /></td>
      </tr>
    </table>
    </form>
</div>
<div id="tabs-2">
    <form action="" method="post" name="form2">
    <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="2" align="center" class="red">二级菜单项添加</td>
      </tr>
      <tr>
        <td align="right">名称：</td>
        <td align="left">
          <input name="name" type="text" value="" class="input" />
    <span class="green">(长度在0-20之间)</span>    </td>
      </tr>
      <tr>
        <td align="right">显示序号：</td>
        <td align="left">
          <input name="order" type="text" value="" class="input2" />
          <span class="green">（正整数最大4位，不填则默认为1）</span>    </td>
      </tr>
      <tr>
        <td align="right">类型：</td>
        <td align="left">
          <select name="type" class="addurl2">
            <option value="1">有下级菜单</option>
            <option value="2">无下级菜单,跳至新闻页面</option>
            <option value="3">无下级菜单,跳至指定地址</option>
          </select>
        </td>
      </tr>
      <tr>
        <td align="right">URL地址：</td>
        <td align="left">
          <input name="url" id="url2" type="text" value="" class="input" disabled="disabled" /> <span class="green">(长度在0-300之间，可选)</span>
        </td>
      </tr>
      <tr>
        <td align="right">父菜单：</td>
        <td align="left">
          <select name="up_id">
          <option value="">--------</option>
          <?php 
            $param="select `id`,`name` from `".$prefix."category` where `rank`='1' and `type`='1'";
            $param=$sql_func->mselect($param);
            $sql_func->choose_select($param,"id","name");
            unset($param);
          ?>
          </select>
        </td>
      </tr>
      <tr>
        <td align="right">状态：</td>
        <td align="left">
          <input name="tag" type="radio" value="1" checked="checked" />
         导航栏显示  
         <input  name="tag" type="radio" value="0" />
         导航栏隐藏
        </td>
      </tr>
      <tr>
        <td align="right">目标：</td>
        <td align="left">
          <input name="target" type="radio" value="1" checked="checked" />
         本窗口
         <input  name="target" type="radio" value="2" />
         新窗口
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]]; ?> | 添加时间：系统自动记录</td>
        </tr>
      <tr>
        <td colspan="2" align="center">
          <input name="Submit_2" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset_2" type="reset" class="button" value="重置" /></td>
      </tr>
    </table>
    </form>
</div>
<div id="tabs-3">
    <form action="" method="post" name="form3">
    <table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="2" align="center" class="red">三级菜单项添加</td>
      </tr>
      <tr>
        <td align="right">名称：</td>
        <td align="left">
          <input name="name" type="text" value="" class="input" />
    <span class="green">(长度在0-20之间)</span>    </td>
      </tr>
      <tr>
        <td align="right">显示序号：</td>
        <td align="left">
          <input name="order" type="text" value="" class="input2" />
          <span class="green">（正整数最大4位，不填则默认为1）</span>    </td>
      </tr>
      <tr>
        <td align="right">类型：</td>
        <td align="left">
          <select name="type" class="addurl3">
            <option value="2">跳至新闻页面</option>
            <option value="3">跳至指定地址</option>
          </select>
        </td>
      </tr>
      <tr>
        <td align="right">URL地址：</td>
        <td align="left">
          <input name="url" id="url3" type="text" value="" class="input" disabled="disabled" /> <span class="green">(长度在0-300之间，可选)</span>
        </td>
      </tr>
      <tr>
        <td align="right">父菜单：</td>
        <td align="left">
          <select name="up_id">
          <option value="">--------</option>
          <?php 
            $param="select `id`,`name`,`up_id` from `".$prefix."category` where `rank`='2' and `type`='1'";//2
            $param=$sql_func->mselect($param);
            for($i=0;$i<count($param);$i++){
                $param2=$param[$i]["up_id"];
                $param2="select `name` from `".$prefix."category` where `id`='$param2'";//1
                $param2=$sql_func->select($param2);
                if($param!=""){
                    $param3=$param[$i]["name"];
                }
                if($param2!=""){
                    $param3=$param2["name"]."◣".$param3;
                    echo "<option value=\"".$param[$i]["id"]."\">".$param3."</option>";
                }
            }
            unset($param,$param2,$param3);
          ?>
          </select>
        </td>
      </tr>
      <tr>
        <td align="right">状态：</td>
        <td align="left">
          <input name="tag" type="radio" value="1" checked="checked" />
         导航栏显示  
         <input  name="tag" type="radio" value="0" />
         导航栏隐藏
        </td>
      </tr>
      <tr>
        <td align="right">目标：</td>
        <td align="left">
          <input name="target" type="radio" value="1" checked="checked" />
         本窗口
         <input  name="target" type="radio" value="2" />
         新窗口
        </td>
      </tr>
      <tr>
        <td colspan="2" align="center" class="blue">添加人：<?php echo $_SESSION[$_SESSION["identify"]]; ?> | 添加时间：系统自动记录</td>
        </tr>
      <tr>
        <td colspan="2" align="center">
          <input name="Submit_3" type="submit" class="button" value="提交" />&nbsp;&nbsp;<input name="Reset_3" type="reset" class="button" value="重置" /></td>
      </tr>
    </table>
    </form>
</div>
</div>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>