<?php 
include("../x.php");
if(!($_SESSION["auth"]["page"]&LIS)){
	exit("����Ȩ���ʱ�ҳ��");
}
$id=$sql_func->inject_check(trim($_GET["id"]));
if($id!="" and $id>0){
	if(!($_SESSION["auth"]["page"]&DEL)){
		exit("����Ȩ���ʱ�ҳ��");
	}
	$query="delete from `".$prefix."config` where `id`='$id'";
	$sql_func->delete($query,2,"page_config_list.php");
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
		$(".example1").colorbox({width:"95%", height:"95%", iframe:true});
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
<div class="t_center">ҳ�������Ϣ�б�</div>
</div>
<div class="bottom">
<form action="page_config_list_bitop.php" method="post" name="form1" onsubmit="return xcheckx()">
<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0">
  <?php 
  	$query="select * from `".$prefix."config` order by `id` DESC";
	$total_num=$sql_func->num_rows($query);
  	if($total_num>0){
  ?>
  <tr>
    <td colspan="8" align="center">
		<?php 
			$page_id=$sql_func->inject_check(trim($_GET['page_id']));
			$page_id=($page_id=="")?"1":$page_id;
			$add="?";
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
    <td align="center" class="orange">�ļ�����</td>
    <td align="center" class="orange">ҳ�����</td>
    <td align="center" class="orange">ҳ��ؼ���</td>
    <td align="center" class="orange">ҳ������</td>
    <td align="center" class="orange">�༭</td>
    <td align="center" class="orange">ɾ��</td>
  </tr>
  <?php 
  	$info=$sql_func->mselect($query); 
		for($i=0;$i<count($info);$i++){
  ?>
  <tr>
    <td align="center"><input name="id[]" type="checkbox" value="<?php echo $info[$i]["id"];?>" /></td>
    <td align="center"><?php echo ($i+1);?></td>
    <td align="center"><?php echo $info[$i]["name"];?></td>
    <td align="center"><input type="text" name="title" value="<?php echo $info[$i]["title"];?>" class="tt input3" title="<?php echo $info[$i]["title"];?>"/></td>
    <td align="center"><input type="text" name="keywords" value="<?php echo $info[$i]["keywords"];?>" class="tt input" title="<?php echo $info[$i]["keywords"];?>"/></td>
    <td align="center"><input type="text" name="description" value="<?php echo $info[$i]["description"];?>" class="tt input" title="<?php echo $info[$i]["description"];?>"/></td>
    <td align="center"><a class="example1" href="page_config_edit.php?config_id=<?php echo $info[$i]["id"];?>"><img src="<?php echo B_IMG;?>bianji.gif" /></a></td>
    <td align="center"><a href="?id=<?php echo $info[$i]["id"];?>" onclick="return confirm('ȷ��ɾ����');"><img src="<?php echo B_IMG;?>shanchu.gif" /></a></td>
  </tr>
  <?php 
  	}
  }else{
  ?>
  <tr>
    <td colspan="8" align="center" class="red">�б�Ϊ�գ�<a class="example1" href="page_config_add.php">����������Ŀ</a></td>
  </tr>
  <?php 
  }
  ?>
  <tr>
    <td colspan="8" align="center">
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