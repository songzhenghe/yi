<?php
define(PERMISSION,"/");
include("../incl/define.php");
include(INCL."config.php");
include(INCL."common_func.php");
include(INCL."session.php");
include(INCL."sql_func.php");

include(INCL."counter_class.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>���ݹ���ϵͳ</title>
<link href="css/content.css" rel="stylesheet" type="text/css" />
</head>
<body>
<div class="container">
<div class="top">
<div class="t_left"></div>
<div class="t_right"></div>
<div class="t_center">��վ������ͳ��</div>
</div>
<div class="bottom">
<table width="95%" border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td width="31%" align="right">�ܷ�������</td>
    <td width="69%" align="center"><?php echo $counts_visits->get_sum_visits(); ?></td>
  </tr>
  <tr>
    <td align="right">��IP��������</td>
    <td align="center"><?php echo $counts_visits->get_sum_ip_visits();?></td>
  </tr>
  <tr>
    <td align="right">���·�������</td>
    <td align="center"><?php echo $counts_visits->get_month_visits();?></td>
  </tr>
  <tr>
    <td align="right">����IP��������</td>
    <td align="center"><?php echo $counts_visits->get_month_ip_visits();?></td>
  </tr>
  <tr>
    <td align="right">���շ�������</td>
    <td align="center"><?php echo $counts_visits->get_date_visits();?></td>
  </tr>
  <tr>
    <td align="right">����IP��������</td>
    <td align="center"><?php echo $counts_visits->get_date_ip_visits();?></td>
  </tr>
</table>
</div>
</div>
</body>
</html>
<?php
	include(INCL."close.php");
?>