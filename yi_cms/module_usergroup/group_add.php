<?php 
include("../x.php");
if($_SESSION["super_admin"]==""){
	exit;
}
if($_POST["Submit"]){
	$name=$common_func->enter_check($_POST["name"],"string",25);
	
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
	
	if($name!=""){
		$query="select `id` from `".$prefix."group` where `name`='$name'";
		if($sql_func->num_rows($query)==0){
			$query="insert into `".$prefix."group` (`name`,`menu`,`article`,`media`,`picture`,`video`,`sound`,`flash`,`link`,`page`,`class`,`fm`) values ('$name','$privilege1','$privilege2','$privilege3','$privilege4','$privilege5','$privilege6','$privilege7','$privilege8','$privilege9','$privilege10','$privilege11')";
			$sql_func->insert($query,2,"group_add.php","����ӳɹ���");
			exit;
		}else{
			$common_func->alert("�����Ѵ��ڣ��������������ƣ�",2,"group_add.php");
			exit;	
		}
	}else{
		$common_func->alert("�����Ʋ���Ϊ�գ�",2,"group_add.php");
		exit;	
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>��վ����ϵͳ</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link href="<?php echo B_CSS;?>jquery-ui-1.8.16.custom.css" rel="stylesheet" type="text/css" />
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script language="JavaScript" type="text/javascript" src="<?php echo B_JS;?>jquery-ui-1.8.16.custom.min.js"></script>
<script>
$(document).ready(function(){
	$( "#tabs" ).tabs();
	//ȫѡ��ѡ
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
<div class="t_center">����Ա�����</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center">�����ƣ�<input name="name" type="text" class="input" maxlength="25" />(<span class="red">25���ַ�����</span>)</td>
  </tr>
</table><br />
<div id="tabs">
<ul>
    <li><a href="#tabs-1">�˵�Ȩ��</a></li>
    <li><a href="#tabs-2">����Ȩ��</a></li>
    <li><a href="#tabs-3">ý��Ȩ��</a></li>
    <li><a href="#tabs-4">ͼƬȨ��</a></li>
    <li><a href="#tabs-5">��ƵȨ��</a></li>
    <li><a href="#tabs-6">��ƵȨ��</a></li>
    <li><a href="#tabs-7">flashȨ��</a></li>
    <li><a href="#tabs-8">����Ȩ��</a></li>
    <li><a href="#tabs-9">ҳ������Ȩ��</a></li>
    <li><a href="#tabs-10">���޷���Ȩ��</a></li>
    <li><a href="#tabs-11">�ļ�����Ȩ��</a></li>
</ul>
<div id="tabs-1">
    <div class="center">
    <input type="checkbox" name="privilege1[]" value="4" checked="checked"/> LIS(�鿴) <br />
    <input type="checkbox" name="privilege1[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege1[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege1[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-2">
    <div class="center">
    <input type="checkbox" name="privilege2[]" value="4" checked="checked"/> LIS(�鿴) <br />
    <input type="checkbox" name="privilege2[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege2[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege2[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-3">
    <div class="center">
    <input type="checkbox" name="privilege3[]" value="4" checked="checked"/> LIS(�鿴) <br />
    <input type="checkbox" name="privilege3[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege3[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege3[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-4">
    <div class="center">
    <input type="checkbox" name="privilege4[]" value="4" checked="checked" /> LIS(�鿴) <br />
    <input type="checkbox" name="privilege4[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege4[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege4[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-5">
    <div class="center">
    <input type="checkbox" name="privilege5[]" value="4" checked="checked" /> LIS(�鿴) <br />
    <input type="checkbox" name="privilege5[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege5[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege5[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-6">
    <div class="center">
    <input type="checkbox" name="privilege6[]" value="4" checked="checked" /> LIS(�鿴) <br />
    <input type="checkbox" name="privilege6[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege6[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege6[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-7">
    <div class="center">
    <input type="checkbox" name="privilege7[]" value="4" checked="checked" /> LIS(�鿴) <br />
    <input type="checkbox" name="privilege7[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege7[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege7[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-8">
    <div class="center">
    <input type="checkbox" name="privilege8[]" value="4" checked="checked" /> LIS(�鿴) <br />
    <input type="checkbox" name="privilege8[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege8[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege8[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-9">
    <div class="center">
    <input type="checkbox" name="privilege9[]" value="4" checked="checked" /> LIS(�鿴) <br />
    <input type="checkbox" name="privilege9[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege9[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege9[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-10">
    <div class="center">
    <input type="checkbox" name="privilege10[]" value="4" checked="checked" /> LIS(�鿴) <br />
    <input type="checkbox" name="privilege10[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege10[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege10[]" value="1"/> ADD(���) <br />
    </div>
</div>
<div id="tabs-11">
    <div class="center">
    <input type="checkbox" name="privilege11[]" value="4" checked="checked" /> LIS(�鿴) <br />
    <input type="checkbox" name="privilege11[]" value="8"/> DEL(ɾ��) <br />
    <input type="checkbox" name="privilege11[]" value="2"/> EDI(�༭) <br />
    <input type="checkbox" name="privilege11[]" value="1"/> ADD(���) <br />
    </div>
</div>
</div><br />
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="center"><span class="red">ȫ��ѡ��<input name="checkall" id="checkall" type="button" value="��" /></span><br />
	<span class="green">�鿴Ȩ���Ǳ༭��ɾ���Ļ�����</span></td>
  </tr>
  <tr>
    <td align="center"><input name="Submit" type="submit" value="�ύ" class="button" /></td>
  </tr>
</table>
</form>
</div>
</div>
</body>
</html>