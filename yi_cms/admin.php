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
<title>内容管理系统</title>
<link href="css/admin.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript">
$(document).ready(function(){
    //左边链接class切换
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
						   <a href="#"><strong><?php echo $_SESSION[$_SESSION[identify]];?></strong>欢迎您登陆</a>
					  </div>
				</div>
				<ul class="nav">
				  <li class="home">
				  	  <a href="admin.php">首页</a>
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">菜单管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>菜单管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_menu/menu_add.php" target="main">菜单添加</a></li>
                            <li><a href="module_menu/menu_list.php" target="main">菜单查看</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">文章管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                       <span style="display:none;">
                        <h1>文章管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_article/article_add.php" target="main">文章添加</a></li>
                            <li><a href="module_article/article_list.php" target="main">文章查看</a></li>
                            <li><a href="module_article/article_search.php" target="main">文章检索</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">媒体管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>媒体管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_media/media_add.php" target="main">媒体分类添加</a></li>
                            <li><a href="module_media/media_list.php" target="main">媒体分类列表</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">图片管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>图片管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_image/item_add-1.php" target="main">图片项目添加</a></li>
                            <li><a href="module_image/item_add.php" target="main">图片项目批量添加</a></li>
                            <li><a href="module_image/item_list.php" target="main">图片项目列表</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">视频管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>视频管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_video/item_add-2.php" target="main">视频项目添加</a></li>
                            <li><a href="module_video/item_add2.php" target="main">视频项目高级添加</a></li>
                            <li><a href="module_video/item_list2.php" target="main">视频项目列表</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">音频管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>音频管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_sound/item_add-3.php" target="main">音频项目添加</a></li>
                            <li><a href="module_sound/item_add3.php" target="main">音频项目高级添加</a></li>
                            <li><a href="module_sound/item_list3.php" target="main">音频项目列表</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">flash管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>flash管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_flash/item_add-4.php" target="main">flash项目添加</a></li>
                            <li><a href="module_flash/item_add4.php" target="main">flash项目高级添加</a></li>
                            <li><a href="module_flash/item_list4.php" target="main">flash项目列表</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">链接管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                       <span style="display:none;">
                        <h1>链接管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_link/item_add5.php" target="main">链接项目添加</a></li>
                            <li><a href="module_link/item_list5.php" target="main">链接项目列表</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">网站设置</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>网站设置</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_page/page_config_add.php" target="main">页面基本信息添加</a></li>
                            <li><a href="module_page/page_config_list.php" target="main">页面基本信息列表</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">分类管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>分类管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_class/endlessclass.php" target="main">无限分类管理</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li>
					  <a class="change" href="javascript:void(0);">上传管理</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>上传管理</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_fm/fm_upload.php" target="main">文件上传</a></li>
                            <li><a href="module_fm/fm_list.php" target="main">文件列表</a></li>
                            <li><a href="module_fm/fm_getinfo.php" target="main">文件浏览器</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				  <li class="more">
					  <a class="change" href="javascript:void(0);">安全设置</a>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
                        <span style="display:none;">
                        <h1>安全设置</h1>
                        <div class="cc"></div>
                        <ul>
                            <li><a href="module_safe/safe_edit.php" target="main">登陆信息修改</a></li>
                        </ul>
                        </span>
                        <!--xxxxxxxxxxxxxxxxxxxxxxxxx-->
				  </li>
				</ul>
				<div id="guide">
                    <div class="wei fl">
                    <!--<a href="admin.php">首页</a> &raquo; <a href="###" target="main">位置1</a> &raquo; <a href="###" target="main">位置2</a>-->
                    欢迎使用奕维建站系统！
                    </div>
                    <ul class="fr">
                        <li><a href="###" onclick="parent.main.location.reload();" title="刷新主页面">刷新</a></li>
                        <li><a href="###" onclick="parent.main.history.go(-1);" title="后退到前一页">后退</a></li>
                        <li><a href="logout.php" onclick="return confirm('确定退出吗？');" target="_self" title="退出网站管理系统">安全退出</a></li>
                    </ul>
                </div>
		</div>
	</td>
  </tr>
  <tr>
    <td valign="top" id="main-fl">
		<div id="left">
        <!--left在这里-->
		<div id="left">
        <h1>常用选项</h1>
        <div class="cc"></div>
        <ul>
            <li><a href="module_safe/safe_edit.php" target="main">登陆信息修改</a></li>
            <li><a href="logout.php" onclick="return confirm('确定退出吗？');" target="_self" title="退出网站管理系统">安全退出</a></li>
        </ul>
        </div>
        <!--left在这里-->
        </div>
	</td>
    <td>
		<iframe name="main" frameborder="0" width="100%" height="100%" scrolling="yes" src="default.php"></iframe>
	</td>
  </tr>
</table>
</body>
</html>