<?php
define(PERMISSION,"/");
//检测系统安装情况
if(file_exists("./incl/config.php")&&is_dir("./install")){
    echo "您的系统已经安装完毕。但是尚未删除install目录，请立即删除此目录或修改名称。";
    exit;
}else if(!file_exists("./incl/config.php")){
    header("location:install/index.php");
    exit;
}
include("incl/define.php");
include(INCL."config.php");
include(INCL."common_func.php");
include(INCL."sql_func.php");
include(INCL."counter_class.php");
?>