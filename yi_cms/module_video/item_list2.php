<?php 
include("../x.php");
if(!($_SESSION["auth"]["video"]&LIS)){
	exit("����Ȩ���ʱ�ҳ��");
}
$media_id=$sql_func->inject_check(trim($_GET["media_id"]));
if($media_id!="" and $media_id>0){
	$extra="where `media_id`='$media_id' and `type`='2' ";
}else{
	$extra="where `type`='2'";
}
$id=$sql_func->inject_check(trim($_GET["id"]));
$title=trim($_GET["title"]);
$pathinfo=trim($_GET["pathinfo"]);
$pic=trim($_GET["pic"]);
if($id!="" and $id>0 and $title!="" and $pathinfo!=""){
	if(!($_SESSION["auth"]["video"]&DEL)){
		exit("����Ȩ���ʱ�ҳ��");
	}
	if($pathinfo==1){
		@unlink(UF.$title);
	}
	if($pic!="#"){
		@unlink(UF.$pic);
	}
	$query="delete from `".$prefix."item` where `id`='$id'";
	$sql_func->delete($query,2,"item_list2.php?media_id=".$media_id);
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
		$(".example1").colorbox({width:"640px", height:"450px", iframe:true});
		$(".example2").colorbox({width:"950px", height:"480px", iframe:true});
		$(".example3").colorbox({width:"950px", height:"550px", iframe:true});
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
<div class="t_center">��Ƶ��Ŀ�б�</div>
</div>
<div class="bottom">
<form action="item_list2_bitop.php?media_id=<?php echo $media_id;?>" method="post" name="form1" onsubmit="return xcheckx()">
<table width="95%" border="1" align="center" cellpadding="0" cellspacing="0">
  <tr>
  	<td align="center" colspan="11" class="red">
	��ű��Ϊ��ɫ����ĿΪ������Ŀ������û�з��࣡
	</td>
  </tr>
  <tr>
    <td colspan="11" align="center">
	<select name="type" onchange="javascript:location.href='item_list2.php?media_id='+this.value;">
	  <option value="">ѡ��һ����Ƶ����</option>
	  <?php 
	  	$parm="select `id`,`name` from `".$prefix."media` where `type`='2'";
		$parm=$sql_func->mselect($parm);
		$sql_func->edit_select($parm,$media_id,"id","name");
	  ?>
	</select>
	</td>
  </tr>
  <?php 
  	$query="select * from `".$prefix."item`".$extra." order by `id` DESC";
	$total_num=$sql_func->num_rows($query);
  	if($total_num>0){
  ?>
  <tr>
    <td colspan="11" align="center">
	<?php 
		$page_id=$sql_func->inject_check(trim($_GET['page_id']));
		$page_id=($page_id=="")?"1":$page_id;
		$add="?media_id=".$media_id."&&";
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
    <td align="center" class="orange">Ԥ��</td>
    <td align="center" class="orange">��ע</td>
    <td align="center" class="orange">���ӵ�ַ</td>
    <td align="center" class="orange">��ʾ���</td>
    <td align="center" class="orange">״̬</td>
    <td align="center" class="orange">�����</td>
    <td align="center" class="orange">���ʱ��</td>
    <td align="center" class="orange">�༭</td>
    <td align="center" class="orange">ɾ��</td>
  </tr>
  <?php 
  	$info=$sql_func->mselect($query); 
		for($i=0;$i<count($info);$i++){
  ?>
  <tr>
    <td align="center"><input name="id[]" type="checkbox" value="<?php echo $info[$i]["id"];?>" /></td>
    <td align="center">
	<?php
	 $param=$info[$i]["media_id"];
     $param="select `id` from `".$prefix."media` where `id`='$param'";
	 $param=$sql_func->select($param);
	 if($param["id"]==""){
	 	echo "<div style=\"background:yellow;font-weight:bold;\">".($i+1)."</div>";
	 }else{
	 	echo ($i+1);
	 }
	 unset($param);
	?>
	</td>
    <td align="center">
	<a class="example1" href="flowplayer.php?item_id=<?php echo $info[$i]["id"];?>"><img src="<?php echo B_IMG;?>watch.gif" /></a>
	</td>
    <td align="center"><input type="text" name="alt" value="<?php echo $info[$i]["alt"];?>" class="tt input" title="<?php echo $info[$i]["alt"];?>" /></td>
    <td align="center"><input type="text" name="url"  value="<?php echo $info[$i]["url"];?>" class="input" title="<?php echo $info[$i]["url"];?>"/></td>
    <td align="center"><?php echo $info[$i]["order"];?></td>
    <td align="center"><?php echo ($info[$i]["tag"]==1)?"��ʾ":"<span class=\"red\">����</span>";?></td>
    <td align="center" class="green"><?php echo $sql_func->id2name($prefix,$info[$i]["add_man"]);?></td>
    <td align="center" class="green"><?php echo $info[$i]["add_time"];?></td>
    <td align="center"><a class="example2" href="item_edit2.php?item_id=<?php echo $info[$i]["id"];?>"><img src="<?php echo B_IMG;?>bianji.gif" /></a></td>
    <td align="center"><a href="?id=<?php echo $info[$i]["id"];?>&&media_id=<?php echo $media_id;?>&&title=<?php echo $info[$i]["title"];?>&&pathinfo=<?php echo $info[$i]["pathinfo"];?>&&pic=<?php echo $info[$i]["pic"];?>" onclick="return confirm('ȷ��ɾ����');"><img src="<?php echo B_IMG;?>shanchu.gif" /></a></td>
  </tr>
  <?php 
  	}
  }else{
  ?>
  <tr>
    <td colspan="11" align="center" class="red">
		ý����ĿΪ�գ�<a class="example3" href="item_add-2.php">����������Ŀ</a>
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