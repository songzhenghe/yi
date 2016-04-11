<?php 
include("../x.php");
if($_SESSION["super_admin"]==""){
	exit;
}
$group_id=$sql_func->inject_check(trim($_GET["group_id"]));
if($group_id>0 and $group_id!=""){
	$query="select * from `".$prefix."group` where `id`='$group_id'";
	$info=$sql_func->select($query);
}else{
	exit("参数错误！");
}
if($info["name"]=="root"){
	exit("无可用操作！");
}
if($_POST["Submit"]){
	$privilege1=($_POST["privilege1"]=="")?array(0):$_POST["privilege1"];
	$privilege2=($_POST["privilege2"]=="")?array(0):$_POST["privilege2"];
	$privilege3=($_POST["privilege3"]=="")?array(0):$_POST["privilege3"];
	$privilege4=($_POST["privilege4"]=="")?array(0):$_POST["privilege4"];
	$privilege5=($_POST["privilege5"]=="")?array(0):$_POST["privilege5"];
	$privilege6=($_POST["privilege6"]=="")?array(0):$_POST["privilege6"];
	$privilege7=($_POST["privilege7"]=="")?array(0):$_POST["privilege7"];
	$privilege8=($_POST["privilege8"]=="")?array(0):$_POST["privilege8"];
	$privilege9=($_POST["privilege9"]=="")?array(0):$_POST["privilege9"];
	$privilege10=($_POST["privilege10"]=="")?array(0):$_POST["privilege10"];
	$privilege11=($_POST["privilege11"]=="")?array(0):$_POST["privilege11"];

	$privilege1=array_sum($privilege1);
	$privilege2=array_sum($privilege2);
	$privilege3=array_sum($privilege3);
	$privilege4=array_sum($privilege4);
	$privilege5=array_sum($privilege5);
	$privilege6=array_sum($privilege6);
	$privilege7=array_sum($privilege7);
	$privilege8=array_sum($privilege8);
	$privilege9=array_sum($privilege9);
	$privilege10=array_sum($privilege10);
	$privilege11=array_sum($privilege11);
	
	$query="update `".$prefix."group` set `menu`='$privilege1',`article`='$privilege2',`media`='$privilege3',`picture`='$privilege4',`video`='$privilege5',`sound`='$privilege6',`flash`='$privilege7',`link`='$privilege8',`page`='$privilege9',`class`='$privilege10',`fm`='$privilege11' where `id`='$group_id'";
	$sql_func->update($query,2,"group_edit.php?group_id=".$group_id,"组信息编辑成功！");
	exit;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>网站管理系统</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link href="<?php echo B_CSS;?>jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script language="JavaScript" type="text/javascript" src="<?php echo B_JS;?>jquery-ui-1.8.16.custom.min.js"></script>
<script>
$(document).ready(function(){
	$( "#tabs" ).tabs();
	//全选反选
	$('#checkall').toggle(function(){
		$("input[name^='privilege']").each(function() {
			this.checked = true;
		});
	},function(){
		$("input[name^='privilege']").each(function() {
			this.checked = false;
		});
	});
});
</script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">管理员组信息编辑</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center"><span class="blue"><?php echo $info["name"];?></span></td>
  </tr>
</table><br />
<div id="tabs">
<ul>
    <li><a href="#tabs-1">菜单权限</a></li>
    <li><a href="#tabs-2">文章权限</a></li>
    <li><a href="#tabs-3">媒体权限</a></li>
    <li><a href="#tabs-4">图片权限</a></li>
    <li><a href="#tabs-5">视频权限</a></li>
    <li><a href="#tabs-6">音频权限</a></li>
    <li><a href="#tabs-7">flash权限</a></li>
    <li><a href="#tabs-8">链接权限</a></li>
    <li><a href="#tabs-9">页面配置权限</a></li>
    <li><a href="#tabs-10">无限分类权限</a></li>
    <li><a href="#tabs-11">文件管理权限</a></li>
</ul>
<div id="tabs-1">
   <div class="center">
    <input type="checkbox" name="privilege1[]" value="4" <?php if($info["menu"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege1[]" value="8" <?php if($info["menu"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege1[]" value="2" <?php if($info["menu"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege1[]" value="1" <?php if($info["menu"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
   </div>
</div>
<div id="tabs-2">
    <div class="center">
    <input type="checkbox" name="privilege2[]" value="4" <?php if($info["article"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege2[]" value="8" <?php if($info["article"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege2[]" value="2" <?php if($info["article"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege2[]" value="1" <?php if($info["article"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-3">
    <div class="center">
    <input type="checkbox" name="privilege3[]" value="4" <?php if($info["media"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege3[]" value="8" <?php if($info["media"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege3[]" value="2" <?php if($info["media"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege3[]" value="1" <?php if($info["media"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-4">
    <div class="center">
    <input type="checkbox" name="privilege4[]" value="4" <?php if($info["picture"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege4[]" value="8" <?php if($info["picture"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege4[]" value="2" <?php if($info["picture"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege4[]" value="1" <?php if($info["picture"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-5">
    <div class="center">
    <input type="checkbox" name="privilege5[]" value="4" <?php if($info["video"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege5[]" value="8" <?php if($info["video"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege5[]" value="2" <?php if($info["video"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege5[]" value="1" <?php if($info["video"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-6">
    <div class="center">
    <input type="checkbox" name="privilege6[]" value="4" <?php if($info["sound"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege6[]" value="8" <?php if($info["sound"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege6[]" value="2" <?php if($info["sound"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege6[]" value="1" <?php if($info["sound"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-7">
    <div class="center">
    <input type="checkbox" name="privilege7[]" value="4" <?php if($info["flash"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege7[]" value="8" <?php if($info["flash"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege7[]" value="2" <?php if($info["flash"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege7[]" value="1" <?php if($info["flash"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-8">
    <div class="center">
    <input type="checkbox" name="privilege8[]" value="4" <?php if($info["link"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege8[]" value="8" <?php if($info["link"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege8[]" value="2" <?php if($info["link"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege8[]" value="1" <?php if($info["link"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-9">
    <div class="center">
    <input type="checkbox" name="privilege9[]" value="4" <?php if($info["page"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege9[]" value="8" <?php if($info["page"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege9[]" value="2" <?php if($info["page"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege9[]" value="1" <?php if($info["page"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-10">
    <div class="center">
    <input type="checkbox" name="privilege10[]" value="4" <?php if($info["class"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege10[]" value="8" <?php if($info["class"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege10[]" value="2" <?php if($info["class"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege10[]" value="1" <?php if($info["class"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
<div id="tabs-11">
    <div class="center">
    <input type="checkbox" name="privilege11[]" value="4" <?php if($info["fm"]&LIS){echo "checked=\"checked\"";}?>/> LIS(查看) <br />
    <input type="checkbox" name="privilege11[]" value="8" <?php if($info["fm"]&DEL){echo "checked=\"checked\"";}?>/> DEL(删除) <br />
    <input type="checkbox" name="privilege11[]" value="2" <?php if($info["fm"]&EDI){echo "checked=\"checked\"";}?>/> EDI(编辑) <br />
    <input type="checkbox" name="privilege11[]" value="1" <?php if($info["fm"]&ADD){echo "checked=\"checked\"";}?>/> ADD(添加) <br />
    </div>
</div>
</div><br />
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center"><span class="red">全部选择：<input name="checkall" id="checkall" type="button" value="√" /></span><br />
	<span class="green">查看权限是编辑和删除的基础！</span></td>
  </tr>
  <tr>
    <td align="center"><input name="Submit" type="submit" value="提交" class="button" /></td>
  </tr>
</table>
</form>
</div>
</div>
</body>
</html>