<?php
include_once("permission.php"); 
if(!include_once(ROOT."adodb5/adodb.inc.php")){
	echo "adodb5包含失败！";
	exit;
}
class sql_func{////////
	public $conn;
	public $prefix;
	public $db_type;
	//连接函数 调用 $sql_func->myconnection(主机地址,用户名,密码,数据库名,数据库类型);
	function myconnection($host,$u_name,$u_pass,$db,$prefix,$db_type='mysql'){ 
		$this->conn=NewADOConnection($db_type);
		if(!$this->conn->Connect($host,$u_name,$u_pass,$db)){
		  echo "数据库连接错误！";
		  exit;
		}
		$this->prefix=$prefix;
		$this->db_type=$dy_type;//mysql oci8
		return $this->conn;
	}
	//连接函数
	
	//防注入函数 调用 $var=$sql_func->inject_check($_GET["id"]);
	function inject_check($sql_str) { 
		$check= eregi('select|insert|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile',$sql_str);     
		if($check){
		  echo "<script>alert('输入非法注入内容！');</script>";
		  exit;
		}else{
		  return intval($sql_str);
		}
	} 
	//防注入函数
	
	//insert 函数 调用 $sql_func->insert(sql语句,js提示类型[,跳转地址][,提示信息][,是否返加id]);
	function insert($query,$type,$addr='',$msg='',$rid=0){ 
		if($msg==""){
				$msg="数据插入成功！";
		}
		($addr=="")?($addr=$_SERVER['HTTP_REFERER']):"";
		if($this->conn->Execute($query)){
		  if($type==1){
			echo "<script>alert('".$msg."');</script>";
		  }else if($type==2){
			echo "<script>alert('".$msg."');window.location.href='".$addr."';</script>";
		  }else if($type==3){
		  
		  }else if($type==4){
			echo "<script>window.location.href='".$addr."';</script>";
		  }
		  if($rid==1){
		  	if($this->db_type=="oci8"){
				$tablename = preg_replace("/insert into(?:\s)*(?:\")?([a-z0-9_-]+)(?:\")?(?:\s)*.*/is","\\1",$query);
				$tablename=substr($tablename,strlen($this->prefix));
				$query="select "."seq_".$tablename.".currval from dual";
				$rs=$this->conn->Execute($query);
				return $rs->fields['CURRVAL'];//支持oracle,需创建序列和触发器,例如：seq_example tri_example
			}else{
				return $this->conn->Insert_ID();//仅支持部分数据库,带auto-increment功能的数据库,如PostgreSQL,MySQL和MSSQL 
			}
		  } 
		}else{
		  echo "<script>alert('数据插入失败！');</script>";
		  echo $query;
		  exit;
		}
	} 
	//insert 函数
	
	//update 函数 调用 $sql_func->update(sql语句,js提示类型[,跳转地址][,提示信息]);
	function update($query,$type,$addr='',$msg=''){ 
		if($msg==""){
				$msg="数据修改成功！";
		}
		($addr=="")?($addr=$_SERVER['HTTP_REFERER']):"";
		if($this->conn->Execute($query)){
		  if($type==1){
			echo "<script>alert('".$msg."');</script>";
		  }else if($type==2){
			echo "<script>alert('".$msg."');window.location.href='".$addr."';</script>";
		  }else if($type==3){
		  
		  }else if($type==4){
			echo "<script>window.location.href='".$addr."';</script>";
		  } 
		}else{
		  echo "<script>alert('数据修改失败！');</script>";
		  echo $query;
		  exit;
		}
	} 
	//update 函数
	
	//delete 函数 调用 $sql_func->delete(sql语句,js提示类型[,跳转地址][,提示信息]);
	function delete($query,$type,$addr='',$msg=''){
		if($msg==""){
				$msg="数据删除成功！";
		} 
		($addr=="")?($addr=$_SERVER['HTTP_REFERER']):"";
		if($this->conn->Execute($query)){
		  if($type==1){
			echo "<script>alert('".$msg."');</script>";
		  }else if($type==2){
			echo "<script>alert('".$msg."');window.location.href='".$addr."';</script>";
		  }else if($type==3){
		  
		  }else if($type==4){
			echo "<script>window.location.href='".$addr."';</script>";
		  }
		}else{
		  echo "<script>alert('数据删除失败！');</script>";
		  echo $query;
		  exit;
		}
	} 
	//delete 函数
	
	//select 函数 调用 $info=$sql_func->select(sql语句[,模式]);
	function select($query,$mode=1){
		switch($mode){
			case 1:
			$mode=ADODB_FETCH_ASSOC;
			break;
			case 2:
			$mode=ADODB_FETCH_NUM;
			break;
			default:
			$mode=ADODB_FETCH_BOTH;
		}
		$this->conn->SetFetchMode($mode);
		if($result=$this->conn->Execute($query)){
			$info=$result->fields;
			$result->Close();
			return $info;
		}else{
			echo "<script>alert('数据选择失败！');</script>";
			echo $query;
			exit;
		}
	}
	//select 函数

	//mselect 函数 调用 $info=$sql_func->mselect(sql语句[,模式]);
	function mselect($query,$mode=1){
		switch($mode){
			case 1:
			$mode=ADODB_FETCH_ASSOC;
			break;
			case 2:
			$mode=ADODB_FETCH_NUM;
			break;
			default:
			$mode=ADODB_FETCH_BOTH;
		}
		$this->conn->SetFetchMode($mode);		
		if($result=$this->conn->Execute($query)){
			while(!$result->EOF){
				$infodb[]=$result->fields;
				$result->MoveNext();
			}
			$result->Close();
			return $infodb;
		}else{
			echo "<script>alert('数据选择失败！');</script>";
			echo $query;
			exit;
		}
	}
	//mselect 函数
	
	 //记录总数查询函数 调用 $var=$sql_func->num_rows(sql语句);
	function num_rows($query){
		$result=$this->conn->Execute($query);
		return $result->RecordCount();
	}
	 //记录总数查询函数
	
	//内容规范函数 调用 $sql_func->dump(数组);
	function dump($array){
		echo "<pre>";
		print_r($array);
		echo "</pre>";
	}
	//内容规范函数
	
	//记录文章浏览次数 调用 $sql_func->visit(数据表前缀,文章id);
	function visit($obj,$prefix,$article_id){
		$ip=$_SERVER['REMOTE_ADDR'];
		$query="select `id` from `".$prefix."visit` where `ip`='$ip' and `article_id`='$article_id'";
		$info=$this->select($query);
		$time=$obj->nowtime();
		if(!$info){
			$query="insert into `".$prefix."visit` (`ip`,`time_at`,`article_id`) values ('$ip','$time','$article_id')";
			$this->conn->Execute($query);
			$query="update `".$prefix."article` set `views`=`views`+1 where `id`='$article_id'";
			$this->conn->Execute($query);
		}else{
			$query="select `time_at` from `".$prefix."visit` where `ip`='$ip' and `article_id`='$article_id'";
			$info=$this->select($query);
			if((strtotime($time)-strtotime($info["time_at"]))>120){//2 minutes
				$query="update `".$prefix."visit` set `time_at`='$time' where `ip`='$ip' and `article_id`='$article_id'";
				$this->conn->Execute($query);
				$query="update `".$prefix."article` set `views`=`views`+1 where `id`='$article_id'";
				$this->conn->Execute($query);
			}
		}
		$limit=1000;
		$query="select `id` from `".$prefix."visit`";
		$num=$this->num_rows($query);
		if($num>$limit){
			$query="select `id` from `".$prefix."visit` order by `id` desc limit ".$limit;
			$result=$this->conn->Execute($query);
			$result->Move($limit-1);
			$data=$result->fields;
			$query="delete from `".$prefix."visit` where `id`<'$data[id]'";
			$this->conn->Execute($query);
		}
	}
	//记录文章浏览次数
	
	//id转换成name 调用 $sql_func->id2name($prefix,$id);
	function id2name($prefix,$id){
	  $query="select `id`,`user_name` from `".$prefix."user` where `id`='$id'";
	  $info=$this->select($query);
	  echo $info["user_name"];
	}
	//id转换成name
	
	//下拉菜单编辑 调用 $sql_func->edit_select($array,"2","id","name");
	function edit_select($array,$selected,$id,$name){
		for($i=0;$i<count($array);$i++){
			if($array[$i][$id]==$selected){
				echo "<option value=\"".$array[$i][$id]."\" selected=\"selected\">".$array[$i][$name]."</option>\n";
			}else{
				echo "<option value=\"".$array[$i][$id]."\">".$array[$i][$name]."</option>\n";
			}
		}
	}
	//下拉菜单编辑
	
	//下拉菜单列表 调用 $sql_func->choose_select($array,"id","name");
	function choose_select($array,$id,$name){
		for($i=0;$i<count($array);$i++){
			echo "<option value=\"".$array[$i][$id]."\">".$array[$i][$name]."</option>\n";
		}
	}
	//下拉菜单列表

}////////
//对类进行实例化
$sql_func=new sql_func;
$conn=$sql_func->myconnection($host,$user,$pwd,$database,$prefix,$db_type); 
$conn->Execute("SET CHARACTER SET GB2312");
$conn->SetFetchMode(ADODB_FETCH_ASSOC);
//一些数据库配置
?>