<?php 
include("../x.php");
if(!($_SESSION["auth"]["media"]&LIS)){
	exit("����Ȩ���ʱ�ҳ��");
}
$type=$sql_func->inject_check(trim($_GET["type"]));
if($type!="" and $type>0){
	$extra="where `type`='$type' ";
}else{
	$extra="";
}
$id=$sql_func->inject_check(trim($_GET["id"]));
if($id!="" and $id>0){
	if(!($_SESSION["auth"]["media"]&DEL)){
		exit("����Ȩ���ʱ�ҳ��");
	}
	$query="delete from `".$prefix."media` where `id`='$id'";
	$sql_func->delete($query,2,"media_list.php?type=".$type);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>���ݹ���ϵͳ</title>
<link href="<?php echo B_CSS;?>content.css" rel="stylesheet" type="text/css" />
<link type="text/css" media="screen" rel="stylesheet" href="<?php echo B_CSS;?>colorbox.css" />
<link href="<?php echo B_CSS;?>tooltip.css" rel="stylesheet" type="text/css" />
<script src="<?php echo B_JS;?>jquery.js" type="text/javascript"></script>
<script src="<?php echo B_JS;?>jquery.colorbox.js"></script>
<script src="<?php echo B_JS;?>jquery.tools.min.js" type="text/javascript"></script>
<script>
	function xcheckx(){
		var a;
		a=$("input[name='id[]']");
		for(i=0;i<a.length;i++){
			if(a[i].checked){
				return confirm('��ȷ��Ҫִ�д�����������');
			}
		}
		alert("�Բ���,������Ҫѡ��һ��!");
		return false;
	}
	$(document).ready(function(){
		$(".example1").colorbox({width:"950px", height:"300px", iframe:true});
		$(".example2").colorbox({width:"950px", height:"550px", iframe:true});
		$(".tt").tooltip({tipClass:'tooltip1',effect: 'bouncy'});
		//ȫѡ��ѡ
		$('#checkall').toggle(function(){
			$("input[name='id[]']").each(function() {
				this.checked = true;
			});
		},function(){
			$("input[name='id[]']").each(function() {
				this.checked = false;
			});
		});
		$("select[name='bit_type']").change(function(){
			if($(this).attr("value")=="del"){
				$("#bit_area").html("<input type=\"submit\" name=\"Submit\" value=\"ȷ��\" class=\"button\" />");
			}else if($(this).attr("value")=="edit"){
				$("#bit_area").html("״̬��<input type=\"radio\" name=\"tag\" value=\"1\" checked=\"checked\" />��ʾ <input type=\"radio\" name=\"tag\" value=\"0\" />���� <input type=\"submit\" name=\"Submit\" value=\"ȷ��\" class=\"button\" />");
			}else{
				$("#bit_area").html("");
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
<div class="t_center">ý������б�</div>
</div>
<div class="bottom">
<form action="media_bitop.php?type=<?php echo $type;?>" method="post" name="form1" onsubmit="return xcheckx()">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="11" align="center">
	<select name="type" onchange="javascript:location.href='media_list.php?type='+this.value;">
	  <option value="">ѡ��һ��ý������</option>
	  <option value="1" <?php if($type==1){echo "selected=\"selected\"";}?>>ͼƬ</option>
	  <option value="2" <?php if($type==2){echo "selected=\"selected\"";}?>>flv��Ƶ</option>
	  <option value="3" <?php if($type==3){echo "selected=\"selected\"";}?>>mp3��Ƶ</option>
	  <option value="4" <?php if($type==4){echo "selected=\"selected\"";}?>>flash���</option>
	  <option value="5" <?php if($type==5){echo "selected=\"selected\"";}?>>��������</option>
	</select>
	</td>
  </tr>
  <?php 
  	$query="select * from `".$prefix."media`".$extra." order by `id` DESC";
	$total_num=$sql_func->num_rows($query);
  	if($total_num>0){
  ?>
  <tr>
    <td colspan="11" align="center">
	<?php
		$page_id=$sql_func->inject_check(trim($_GET['page_id']));
		$page_id=($page_id=="")?"1":$page_id;
		$add="?type=".$type."&&";
		$pagesize="10";
		$begin=($page_id-1)*$pagesize;
		$query=$query." limit $begin,$pagesize";
		$common_func->pages($total_num,$page_id,$add,$pagesize);
	?>
	</td>
  </tr>
  <tr>
    <td align="center" class="orange"><input name="checkall" id="checkall" type="button" value="��" /></td>
    <td align="center" class="orange">���</td>
    <td align="center" class="orange">����</td>
    <td align="center" class="orange">λ��</td>
    <td align="center" class="orange">��ʾ���</td>
    <td align="center" class="orange">״̬</td>
    <td align="center" class="orange">�����</td>
    <td align="center" class="orange">���ʱ��</td>
	<td align="center" class="orange">�鿴����Ŀ</td>
    <td align="center" class="orange">�༭</td>
	<td align="center" class="orange">ɾ��</td>
  </tr>
  <?php 
  $info=$sql_func->mselect($query); 
		for($i=0;$i<count($info);$i++){
  ?>
  <tr>
    <td align="center"><input name="id[]" type="checkbox" value="<?php echo $info[$i]["id"];?>" /></td>
    <td align="center"><?php echo $i+1;?></td>
    <td align="center"><input name="name" type="text" value="<?php echo $info[$i]["name"];?>" class="tt input" title="<?php echo $info[$i]["name"];?>" /></td>
    <td align="center"><?php echo $info[$i]["position"];?></td>
    <td align="center"><?php echo $info[$i]["order"];?></td>
    <td align="center"><?php echo ($info[$i]["tag"]==1)?"��ʾ":"<span class=\"red\">����</span>";?></td>
    <td align="center" class="green"><?php echo $sql_func->id2name($prefix,$info[$i]["add_man"]);?></td>
    <td align="center" class="green"><?php echo $info[$i]["add_time"];?></td>
	<td align="center">
	<?php 
		switch($info[$i]["type"]){
			case "1":
			$faddr="../module_image/item_list.php";
			break;
			case "2":
			$faddr="../module_video/item_list2.php";
			break;
			case "3":
			$faddr="../module_sound/item_list3.php";
			break;
			case "4":
			$faddr="../module_flash/item_list4.php";
			break;
			case "5":
			$faddr="../module_link/item_list5.php";
			break;
		}
		$param=$info[$i]["id"];
		$param="select `id` from `".$prefix."item` where `media_id`='$param'";
		$param=$sql_func->num_rows($param);
		if($param>0){
			echo "<a class=\"example2\" href=\"".$faddr."?media_id=".$info[$i]["id"]."\"><img src=\"".B_IMG."chakan.gif\"></a>(".$param.")";
		}else{
			echo "&nbsp;";
		}
		unset($param);
	?>
	</td>
    <td align="center"><a class="example1" href="media_edit.php?media_id=<?php echo $info[$i]["id"];?>"><img src="<?php echo B_IMG;?>bianji.gif" /></a></td>
	<td align="center"><a href="?id=<?php echo $info[$i]["id"];?>&&type=<?php echo $type;?>" onclick="return confirm('ȷ��ɾ����');"><img src="<?php echo B_IMG;?>shanchu.gif" /></a></td>
  </tr>
  <?php
  	}
  }else{
  ?>
  <tr>
    <td colspan="11" align="center" class="red">
	����Ϊ�գ�<a class="example2" href="media_add.php">�������·���</a>
	</td>
  </tr>
  <?php 
  }
  ?>
  <tr>
    <td colspan="11" align="center">
	<?php
	if($total_num>0){ 
		$common_func->pages($total_num,$page_id,$add,$pagesize);
	}
	?>
	</td>
  </tr>
  <tr>
  	<td align="center" colspan="11">
		<select name="bit_type">
		  <option value="">=��������=</option>
		  <option value="del">ɾ��</option>
		  <option value="edit">�༭</option>
		</select>
        <span id="bit_area"></span>
	</td>
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