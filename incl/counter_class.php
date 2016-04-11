<?php
include_once("permission.php"); 
/**
	 * ������ͳ����
	 *
	 * @author������
	 * @version��1.0
	 * @lastupdate��2010-8-11
	 *
	 */
/**
 +----------------------------------------------------------------------
    ʹ��ʵ����
 +----------------------------------------------------------------------
    $counts_visits = new counter('yi_counter',$conn);	ʵ��������
 +----------------------------------------------------------------------
    ��¼��������
    $counts_visits->record_visits();
 +----------------------------------------------------------------------
 	��ȡ�������ݣ�
 	$counts_visits->get_sum_visits();			��ȡ�ܷ�����
 	$counts_visits->get_sum_ip_visits(); 		��ȡ��IP������
 	$counts_visits->get_month_visits();			��ȡ���·�����
  	$counts_visits->get_month_ip_visits();		��ȡ����IP������
    $counts_visits->get_date_visits();			��ȡ���շ�����
    $counts_visits->get_date_ip_visits(); 		��ȡ����IP������
 +----------------------------------------------------------------------
    ������Ϊ�߼���ʾ,��������ʹ��
 +----------------------------------------------------------------------
 */
	class counts_visits{

		/*
		 * ��ȡ����
		 *
		 * @private String
		 */
			private $table;
			private $conn;


		/**
		 * ���캯��
		 *
		 * @access public
	 	 * @parameter string $table ����
		 * @return void
		 */
		public function __construct($table,$conn){
			$this->table = $table;
			$this->conn  = $conn;
		}

		/**
		 * ��ÿͻ�����ʵ��IP��ַ
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
		 * ��¼��������Ĭ��һ��IPÿ��ֻͳ��һ�Σ�
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
		 * ��ȡ�ܷ��������·��������շ������Ĺ��з���
		 *
		 * @access private
		 * @parameter string $condition  sql�������
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
		 * ��ȡIP�������Ĺ��з���
		 *
		 * @access private
		 * @parameter string $condition  sql�������
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
		 * ��ȡ�ܷ�����
		 *
		 * @access public
		 * @return integer
		 */
		public function get_sum_visits(){
			return $this->get_visits();
		}

		/**
		 * ��ȡ��IP������
		 *
		 * @access public
		 * @return integer
		 */
		public function get_sum_ip_visits(){
			return $this->get_ip_visits();
		}

		/**
		 * ��ȡ���·�����
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
		 * ��ȡ����IP������
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
		 * ��ȡ���շ�����
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
		 * ��ȡ����IP������
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