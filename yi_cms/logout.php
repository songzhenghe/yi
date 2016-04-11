<?php
define(PERMISSION,"/");
include("../incl/define.php");
include(INCL."config.php");
include(INCL."common_func.php");
include(INCL."session.php");
include(INCL."sql_func.php");

unset($_SESSION[$_SESSION[identify]],$_SESSION["identify"],$_SESSION["do"],$_SESSION["super_admin"],$_SESSION["auth"]);
echo "<script>window.parent.location.href='login.php';</script>";
exit;
?>