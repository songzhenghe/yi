<?php 
include("../x.php");
if(!($_SESSION["auth"]["menu"]&LIS)){
	exit("����Ȩ���ʱ�ҳ��");
}
$category_id=$sql_func->inject_check(trim($_GET["category_id"]));
if($category_id!="" and $category_id>0){
	$query="select * from `".$prefix."category` where `id`='$category_id'";
	$info=$sql_func->select($query);
}
if($_POST["Submit"]){
	$name=$common_func->enter_check($_POST["name"],"string",20);
	$order=$common_func->enter_check($_POST["order"],"number",4,1);
	$url=$common_func->enter_check($_POST["url"],"string",300,"#");
	$tag=$_POST["tag"];
	$target=$_POST["target"];
	if($name!="" and $tag!=""){
		$query="update `".$prefix."category` set `name`='$name',`order`='$order',`url`='$url',`tag`='$tag',`target`='$target' where `id`='$category_id'";
		$sql_func->update($query,"2","menu_list.php?category_id=".$category_id);
		exit;
	}else{
		echo "<script>alert('���ƣ�״̬������Ϊ�գ�');location.history.back(-1);</script>";
		exit;
	}
}
$id=$sql_func->inject_check(trim($_GET["id"]));
if($id!="" and $id>0){
	if(!($_SESSION["auth"]["menu"]&DEL)){
		exit("����Ȩ���ʱ�ҳ��");
	}
	$query="select `id` from `".$prefix."category` where `up_id`='$id'";//ɾ�����
	$num=$sql_func->num_rows($query);
	if($num>0){
		echo "<script>alert('���������쳣���벻ҪΥ�������');location.href='menu_list.php';</script>";
		exit;
	}
	$query="delete from `".$prefix."category` where `id`='$id'";
	$sql_func->delete($query,2,"menu_list.php");
	exit;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>���ݹ���ϵͳ</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link type="text/css" media="screen" rel="stylesheet" href="<?php echo B_CSS;?>colorbox.css" />
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script>
	$(document).ready(function(){
		$(".example1").colorbox({width:"950px", height:"550px", iframe:true});
	});
</script>
<script type="text/javascript" src="<?php echo B_JS;?>dtree.js"></script>
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">�˵��鿴</div>
</div>
<div class="bottom">
<div style="width:500px;background:#FFF5FA;margin:20px auto;border:1px solid #000;text-align:left;">
	<div class="dtree">
	<p><a href="javascript: d.openAll();">ȫ��չ��</a> | <a href="javascript: d.closeAll();">ȫ���۵�</a></p>
	<?php 
		$param="select * from `".$prefix."category` order by `id` asc";
		$param=$sql_func->mselect($param);
		if(count($param)==0){
			echo "<span class='red'>�˵���Ϊ�գ�</span>";
		}else{
			echo "<script>\n";
			echo "d = new dTree('d');\n";
			echo "d.add(0,-1,'�˵��б�');\n";
			for($i=0;$i<count($param);$i++){
				echo "d.add(".$param[$i]["id"].",".$param[$i]["up_id"].",'".$param[$i]["name"]."',"."'menu_list.php?category_id=".$param[$i]["id"]."','������б༭');\n";
			}
			echo "document.write(d);\n";
			echo "</script>\n";
			unset($param);
		}
	?>
	</div>
</div>
<?php 
if(!($_SESSION["auth"]["menu"]&EDI)){
	exit("����Ȩ���ʱ�ҳ��");
}else{
if($category_id!="" and $category_id>0){
?>
<form action="" method="post" name="form1">
<table width="95%" border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="2" align="center" class="red">�˵���༭</td>
    </tr>
  <tr>
    <td align="right">ID��</td>
    <td align="left"><span class="bold"><?php echo $info["id"];?></span></td>
  </tr>
  <tr>
    <td align="right">���ƣ�</td>
    <td align="left"><input name="name" type="text" class="input" value="<?php echo $info["name"];?>" /><span class="green">(������0-20֮��)</span></td>
  </tr>
  <tr>
    <td align="right">����</td>
    <td align="left">
	<?php 
		if($info["rank"]==1){
			echo "һ���˵�";
		}else if($info["rank"]==2){
			echo "�����˵�";
		}else if($info["rank"]==3){
			echo "�����˵�";
		}
	?>
	</td>
  </tr>
  <tr>
    <td align="right">��ʾ��ţ�</td>
    <td align="left"><input name="order" type="text" class="input2" value="<?php echo $info["order"];?>" /><span class="green">�����������4λ��</span></td>
  </tr>
  <tr>
    <td align="right">���ͣ�</td>
    <td align="left">
	<?php
		if($info["type"]==1){
			echo "���¼��˵�";
		}else if($info["type"]==2){
			echo "���¼��˵�,��������ҳ��";
		}else if($info["type"]==3){
			echo "���¼��˵�,����ָ����ַ";
		}
	?>
    </td>
  </tr>
  <tr>
    <td align="right">URL��ַ��</td>
    <td align="left">
	<input name="url" type="text" class="input" value="<?php echo $info["url"];?>" <?php if($info["type"]!=3){echo "disabled=\"disabled\"";}?> /> <span class="green">(������0-300֮�䣬��ѡ)</span>
	</td>
  </tr>
  <tr>
    <td align="right">״̬��</td>
    <td align="left">
	<input type="radio" name="tag" value="1" <?php if($info["tag"]==1){echo "checked=\"checked\"";}?> />
	������ʾ
	<input type="radio" name="tag" value="0" <?php if($info["tag"]==0){echo "checked=\"checked\"";}?>/>
	��������</td>
  </tr>
  <tr>
    <td align="right">Ŀ�꣺</td>
    <td align="left">
	<input type="radio" name="target" value="1" <?php if($info["target"]==1){echo "checked=\"checked\"";}?> />
	������
	<input type="radio" name="target" value="2" <?php if($info["target"]==2){echo "checked=\"checked\"";}?>/>
	�´���</td>
  </tr>
  <tr>
    <td colspan="2" align="center" class="blue">����ˣ�<?php echo $sql_func->id2name($prefix,$info["add_man"]);?> | ���ʱ�䣺<?php echo $info["add_time"];?></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><input name="Submit" type="submit" class="button" value="�ύ" />&nbsp;&nbsp;<input name="Reset" type="reset" class="button" value="����" /></td>
  </tr>
  <tr>
  <td colspan="2" align="right" class="red">
  	�������ɾ���˲˵����ȷ�������κ��Ӳ˵��������������������
  	<?php 
		$param="select `id` from `".$prefix."category` where `up_id`='$info[id]'";
		$param=$sql_func->num_rows($param);
		if($param==0){
	?>
	<a href="menu_list.php?id=<?php echo $info["id"];?>" onclick="return confirm('ȷ��ɾ����');"><span class="red"># ɾ�� #</span></a>
	<?php 
		}else{
			echo "�˲˵�����<span class=\"bold\">".$param."</span>���Ӳ˵���޷�ɾ����";
		}
	?>
  </td>
  </tr>
  <?php 
  	if($info["type"]==2){
  ?>
  <tr>
  	<td colspan="2" align="center" class="green2">
	<?php 
		$param="select `id` from `".$prefix."article` where `category_id`='$category_id'";
		$param=$sql_func->num_rows($param);
		if($param>0){
			echo "<a class='example1' href='../module_article/article_list.php?category_id=".$category_id."'>�鿴�˲˵�������(".$param.")</a>";
		}else{
			echo "<span class='red'>�˲˵��������£�</span>";
		}
	?>
	</td>
  </tr>
  <?php 
  	}
  ?>
</table>
</form>
<?php 
}else{
?>
<table width="800" border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td colspan="2" align="center" class="green">�����ϱߵĲ˵����б�ѡ����Ҫ�༭�Ĳ˵���</td>
  </tr>
</table>
<?php 
}
}
?>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>