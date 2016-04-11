<?php
include_once("permission.php"); 
/**
	 * 访问量统计类
	 *
	 * @author：黄乐
	 * @version：1.0
	 * @lastupdate：2010-8-11
	 *
	 */
/**
 +----------------------------------------------------------------------
    使用实例：
 +----------------------------------------------------------------------
    $counts_visits = new counter('yi_counter',$conn);	实例化对象
 +----------------------------------------------------------------------
    记录访问数：
    $counts_visits->record_visits();
 +----------------------------------------------------------------------
 	获取访问数据：
 	$counts_visits->get_sum_visits();			获取总访问量
 	$counts_visits->get_sum_ip_visits(); 		获取总IP访问量
 	$counts_visits->get_month_visits();			获取当月访问量
  	$counts_visits->get_month_ip_visits();		获取当月IP访问量
    $counts_visits->get_date_visits();			获取当日访问量
    $counts_visits->get_date_ip_visits(); 		获取当日IP访问量
 +----------------------------------------------------------------------
    上述仅为逻辑演示,本类可灵活使用
 +----------------------------------------------------------------------
 */
	class counts_visits{

		/*
		 * 获取表名
		 *
		 * @private String
		 */
			private $table;
			private $conn;


		/**
		 * 构造函数
		 *
		 * @access public
	 	 * @parameter string $table 表名
		 * @return void
		 */
		public function __construct($table,$conn){
			$this->table = $table;
			$this->conn  = $conn;
		}

		/**
		 * 获得客户端真实的IP地址
		 *
		 * @access public
		 * @return void
		 */
		public function getip(){
			if(getenv("HTTP_CLIENT_IP") && strcasecmp(getenv("HTTP_CLIENT_IP"), "unknown")){
				$ip = getenv("HTTP_CLIENT_IP");
			}else if(getenv("HTTP_X_FORWARDED_FOR") && strcasecmp(getenv("HTTP_X_FORWARDED_FOR"), "unknown")){
				$ip = getenv("HTTP_X_FORWARDED_FOR");
			}else if(getenv("REMOTE_ADDR") && strcasecmp(getenv("REMOTE_ADDR"), "unknown")){
				$ip = getenv("REMOTE_ADDR");
			}else if(isset ($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], "unknown")){
				$ip = $_SERVER['REMOTE_ADDR'];
			}else{
				$ip = "unknown";
			}
			return ($ip);
		}

		/**
		 * 记录访问数（默认一个IP每天只统计一次）
		 *
		 * @access public
		 * @return void
		 */
		public function record_visits(){
			$year=date("Y");
			$month=date("m");
			$day=date("d");
			$ip = $this->getip();
			$result = $this->conn->Execute("select * from $this->table where ip = '$ip' and year='$year' and month='$month' and day='$day'");
		 	$row = $result->FetchRow();
		 	if(is_array($row)){
		 		if(!$_COOKIE['visits']){
					$this->conn->Execute("UPDATE $this->table SET `counts` = `counts`+1 WHERE `ip` = '$ip' and year='$year' and month='$month' and day='$day'");
		 		}
		 	}else{
		 		$this->conn->Execute("INSERT INTO $this->table(`ip`,`counts`,`year`,`month`,`day`)VALUES ('$ip','1','$year','$month','$day')");
		 		setcookie('visits',$ip,time()+3600*24);
		 	}
		}

		/*
		 * 获取总访问量、月访问量、日访问量的共有方法
		 *
		 * @access private
		 * @parameter string $condition  sql语句条件
		 * @return integer
		 */
		private function get_visits($condition = ''){
			if($condition == ''){
				$query = $this->conn->Execute("select sum(counts) as counts from $this->table");
			}else{
				$query = $this->conn->Execute("select sum(counts) as counts from $this->table where $condition");
			}
			$row = $query->FetchRow();
			return $row["counts"];
		}

		/*
		 * 获取IP访问量的共有方法
		 *
		 * @access private
		 * @parameter string $condition  sql语句条件
		 * @return integer
		 */
		private function get_ip_visits($condition = ''){
			if($condition == ''){
				$query = $this->conn->Execute("select * from $this->table");
			}else{
				$query = $this->conn->Execute("select * from $this->table where $condition");
			}
			while($row = $query->FetchRow()){
				$ip_visits_arr[] = $row['ip'];
			}
			$ip_visits = count($ip_visits_arr);
			return $ip_visits;
		}

		/**
		 * 获取总访问量
		 *
		 * @access public
		 * @return integer
		 */
		public function get_sum_visits(){
			return $this->get_visits();
		}

		/**
		 * 获取总IP访问量
		 *
		 * @access public
		 * @return integer
		 */
		public function get_sum_ip_visits(){
			return $this->get_ip_visits();
		}

		/**
		 * 获取当月访问量
		 *
		 * @access public
		 * @return integer
		 */
		public function get_month_visits(){
			$year=date("Y");
			$month=date("m");
			return $this->get_visits("`year`=".$year." and "."`month`=".$month);
		}

		/**
		 * 获取当月IP访问量
		 *
		 * @access public
		 * @return integer
		 */
		public function get_month_ip_visits(){
			$year=date("Y");
			$month=date("m");
			return $this->get_ip_visits("`year`=".$year." and "."`month`=".$month);
		}

		/**
		 * 获取当日访问量
		 *
		 * @access public
		 * @return integer
		 */
		public function get_date_visits(){
			$year=date("Y");
			$month=date("m");
			$day=date("d");
			return $this->get_visits("`year`=".$year." and "."`month`=".$month." and "."`day`=".$day);
		}

		/**
		 * 获取当日IP访问量
		 *
		 * @access public
		 * @return integer
		 */
		public function get_date_ip_visits(){
			$year=date("Y");
			$month=date("m");
			$day=date("d");
			return $this->get_ip_visits("`year`=".$year." and "."`month`=".$month." and "."`day`=".$day);
		}

	}
$counts_visits = new counts_visits($prefix.'counter',$conn);
?>