<?php 
define(PERMISSION,"/");
include("../incl/define.php");
include(INCL."config.php");
include(INCL."common_func.php");
include(INCL."session.php");
include(INCL."sql_func.php");

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>���ݹ���ϵͳ</title>
<link href="css/admin.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    //�������class�л�
    function myleft(n){
        objli=$("#left ul li");
        obja=$("#left ul li a");
        for(var i=0;i<obja.length;i++){
            objli[i].className = '';
        }
        objli[n].className = 'one';
    }
    $("#left ul li a").live('click',function(){
        myleft($(this).parent().index());
    });
    $(".change").click(function(){
        $("#left").html($(this).next("span").html());
        $("#left ul li:eq(0)").addClass("one");
        parent.main.location.href=$("#left ul li:eq(0)").children("a").attr("href");
    });
});
</script>
</head>
<body>
<table width="100%" height="100%"  border="0" cellpadding="0" cellspacing="0">
  <tr>
    <td colspan="2" height="80">
		<div id="header">
				<div class="logo fl">
					  <div class="png">
						  <a href="javascript:void(0);"><img src="images/logo2.png" /></a>
					  </div>
					  <div class="lun">
						   <a href="#"><strong><?php echo $_SESSION[$_SESSION[identify]];?></strong>��ӭ����½</a>
					  </div>
				</div>
				<ul class="nav">
				  <li class="home">
				  	  <a href="admin.php">��ҳ</a>
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">�˵�����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>�˵�����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_menu/menu_add.php" target="main">�˵����</a></li>
                            <li><a href="module_menu/menu_list.php" target="main">�˵��鿴</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">���¹���</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                       <span style="display:none;">
                        <h1>���¹���</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_article/article_add.php" target="main">�������</a></li>
                            <li><a href="module_article/article_list.php" target="main">���²鿴</a></li>
                            <li><a href="module_article/article_search.php" target="main">���¼���</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">ý�����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>ý�����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_media/media_add.php" target="main">ý��������</a></li>
                            <li><a href="module_media/media_list.php" target="main">ý������б�</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">ͼƬ����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>ͼƬ����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_image/item_add-1.php" target="main">ͼƬ��Ŀ���</a></li>
                            <li><a href="module_image/item_add.php" target="main">ͼƬ��Ŀ�������</a></li>
                            <li><a href="module_image/item_list.php" target="main">ͼƬ��Ŀ�б�</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">��Ƶ����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>��Ƶ����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_video/item_add-2.php" target="main">��Ƶ��Ŀ���</a></li>
                            <li><a href="module_video/item_add2.php" target="main">��Ƶ��Ŀ�߼����</a></li>
                            <li><a href="module_video/item_list2.php" target="main">��Ƶ��Ŀ�б�</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">��Ƶ����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>��Ƶ����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_sound/item_add-3.php" target="main">��Ƶ��Ŀ���</a></li>
                            <li><a href="module_sound/item_add3.php" target="main">��Ƶ��Ŀ�߼����</a></li>
                            <li><a href="module_sound/item_list3.php" target="main">��Ƶ��Ŀ�б�</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">flash����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>flash����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_flash/item_add-4.php" target="main">flash��Ŀ���</a></li>
                            <li><a href="module_flash/item_add4.php" target="main">flash��Ŀ�߼����</a></li>
                            <li><a href="module_flash/item_list4.php" target="main">flash��Ŀ�б�</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">���ӹ���</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                       <span style="display:none;">
                        <h1>���ӹ���</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_link/item_add5.php" target="main">������Ŀ���</a></li>
                            <li><a href="module_link/item_list5.php" target="main">������Ŀ�б�</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">��վ����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>��վ����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_page/page_config_add.php" target="main">ҳ�������Ϣ���</a></li>
                            <li><a href="module_page/page_config_list.php" target="main">ҳ�������Ϣ�б�</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">�������</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>�������</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_class/endlessclass.php" target="main">���޷������</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">�ϴ�����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>�ϴ�����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_fm/fm_upload.php" target="main">�ļ��ϴ�</a></li>
                            <li><a href="module_fm/fm_list.php" target="main">�ļ��б�</a></li>
                            <li><a href="module_fm/fm_getinfo.php" target="main">�ļ������</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li class="more">
					  <a class="change" href="javascript:void(0);">��ȫ����</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>��ȫ����</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_safe/safe_edit.php" target="main">��½��Ϣ�޸�</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				</ul>
				<div id="guide">
                    <div class="wei fl">
                    <!--<a href="admin.php">��ҳ</a> &raquo; <a href="###" target="main">λ��1</a> &raquo; <a href="###" target="main">λ��2</a>-->
                    ��ӭʹ����ά��վϵͳ��
                    </div>
                    <ul class="fr">
                        <li><a href="###" onclick="parent.main.location.reload();" title="ˢ����ҳ��">ˢ��</a></li>
                        <li><a href="###" onclick="parent.main.history.go(-1);" title="���˵�ǰһҳ">����</a></li>
                        <li><a href="logout.php" onclick="return confirm('ȷ���˳���');" target="_self" title="�˳���վ����ϵͳ">��ȫ�˳�</a></li>
                    </ul>
                </div>
		</div>
	</td>
  </tr>
  <tr>
    <td valign="top" id="main-fl">
		<div id="left">
        <!--left������-->
		<div id="left">
        <h1>����ѡ��</h1>
        <div class="cc"></div>
        <ul>
            <li><a href="module_safe/safe_edit.php" target="main">��½��Ϣ�޸�</a></li>
            <li><a href="logout.php" onclick="return confirm('ȷ���˳���');" target="_self" title="�˳���վ����ϵͳ">��ȫ�˳�</a></li>
        </ul>
        </div>
        <!--left������-->
        </div>
	</td>
    <td>
		<iframe name="main" frameborder="0" width="100%" height="100%" scrolling="yes" src="default.php"></iframe>
	</td>
  </tr>
</table>
</body>
</html>