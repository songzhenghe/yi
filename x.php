<?php
define(PERMISSION,"/");
//���ϵͳ��װ���
if(file_exists("./incl/config.php")&&is_dir("./install")){
    echo "����ϵͳ�Ѿ���װ��ϡ�������δɾ��installĿ¼��������ɾ����Ŀ¼���޸����ơ�";
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