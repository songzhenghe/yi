<?php 
include("../x.php");
if(!($_SESSION["auth"]["page"]&ADD)){
	exit("����Ȩ���ʱ�ҳ��");
}
if($_POST["Submit"]){
	$name=$common_func->enter_check($_POST["name"],"string",256);
	$title=$common_func->enter_check($_POST["title"],"string",300);
	$keywords=$common_func->enter_check($_POST["keywords"],"string",300);
	$description=$common_func->enter_check($_POST["description"],"string",300);
	$extends=$_POST["extends"];
	if($extends=='0'){
		$copyright=$common_func->_mysql_string(trim($_POST["copyright"]));//���̳�
	}else{
		$copyright="#";
	}
	if($name!="" and $title!="" and $keywords!="" and $description!="" and $copyright!="" and $extends!=""){
		$query="select `id` from `".$prefix."config` where `name`='$name'";
		if($sql_func->num_rows($query)==0){
			$query="insert into `".$prefix."config` (`name`,`title`,`keywords`,`description`,`copyright`,`extends`) values ('$name','$title','$keywords','$description','$copyright','$extends')";
			$sql_func->insert($query,2,"page_config_add.php");
			exit;
		}else{
			echo "<script>alert('���ļ���ҳ�������Ϣ�����ã������ظ����ã�');window.history.back(-1);</script>";
			exit;
		}
	}else{
		echo "<script>alert('�ļ����ơ�ҳ����⡢ҳ��ؼ��֡�ҳ��������ҳ���Ȩ������Ϊ�գ�');location.href='page_config_add.php';</script>";
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
<link type="text/css" media="screen" rel="stylesheet" href="<?php echo B_CSS;?>colorbox.css" />
<script type="text/javascript" src="<?php echo B_JS;?>jquery.js"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script>
$(document).ready(function(){
	$(".example1").colorbox({width:"1000px", height:"600px", iframe:true});
	$("select[name=extends]").change(function(){
		if($(this).val()=='0'){
			$(".cop").show();
		}else{
			$(".cop").hide();
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
<div class="t_center">ҳ�������Ϣ���</div>
</div>
<div class="bottom">
<form action="" method="post" name="form1">
<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td align="right">�ļ����ƣ�</td>
    <td align="left"><input name="name" type="text" class="input" /> <span class="green">(0-256�ַ�����index.php)</span></td>
  </tr>
  <tr>
    <td align="right">ҳ����⣺</td>
    <td align="left"><input name="title" type="text" class="input" /> <span class="green">(0-300�ַ�)</span></td>
  </tr>
  <tr>
    <td align="right">ҳ��ؼ��֣�</td>
    <td align="left"><input name="keywords" type="text" class="input" /> <span class="green">(0-300�ַ�������ؼ����Զ��ŷָ�)</span></td>
  </tr>
  <tr>
    <td align="right">ҳ��������</td>
    <td align="left"><input name="description" type="text" class="input" /> <span class="green">(0-300�ַ�)</span></td>
  </tr>
  <tr>
    <td align="right">��Ȩ�̳У�</td>
    <td align="left">
    <select name="extends">
      <option value="0">���̳�</option>
    	<?php
    		$param="select * from `{$prefix}config`";
			$param=$sql_func->mselect($param);
			for($i=0;$i<count($param);$i++){
				echo "<option value='".$param[$i]['id']."'>".$param[$i]['name']."</option>";
			}
		?>
    </select><span class="red">�̳к������ֶ������������Ч��</span>
    </td>
  </tr>
  <tr class="cop">
    <td colspan="2" align="center">
        <input type="button" class="example1 button" value="���ļ��������ѡ���ļ�" href="../module_fm/fm_getinfo.php" />&nbsp;&nbsp;
        <input type="button" class="example1 button" value="ͨ���ļ������ϴ����ļ�" href="../module_fm/fm_upload.php" />
    </td>
  </tr>
  <tr class="cop">
    <td align="right">ҳ���Ȩ��</td>
    <td align="left">
		<?php 
			$common_func->ck2("");
		?>
	</td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="�ύ" /></td>
  </tr>
</table>
</form>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>