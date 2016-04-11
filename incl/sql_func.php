<?php
include_once("permission.php"); 
if(!include_once(ROOT."adodb5/adodb.inc.php")){
	echo "adodb5����ʧ�ܣ�";
	exit;
}
class sql_func{////////
	public $conn;
	public $prefix;
	public $db_type;
	//���Ӻ��� ���� $sql_func->myconnection(������ַ,�û���,����,���ݿ���,���ݿ�����);
	function myconnection($host,$u_name,$u_pass,$db,$prefix,$db_type='mysql'){ 
		$this->conn=NewADOConnection($db_type);
		if(!$this->conn->Connect($host,$u_name,$u_pass,$db)){
		  echo "���ݿ����Ӵ���";
		  exit;
		}
		$this->prefix=$prefix;
		$this->db_type=$dy_type;//mysql oci8
		return $this->conn;
	}
	//���Ӻ���
	
	//��ע�뺯�� ���� $var=$sql_func->inject_check($_GET["id"]);
	function inject_check($sql_str) { 
		$check= eregi('select|insert|update|delete|\'|\/\*|\*|\.\.\/|\.\/|union|into|load_file|outfile',$sql_str);     
		if($check){
		  echo "<script>alert('����Ƿ�ע�����ݣ�');</script>";
		  exit;
		}else{
		  return intval($sql_str);
		}
	} 
	//��ע�뺯��
	
	//insert ���� ���� $sql_func->insert(sql���,js��ʾ����[,��ת��ַ][,��ʾ��Ϣ][,�Ƿ񷵼�id]);
	function insert($query,$type,$addr='',$msg='',$rid=0){ 
		if($msg==""){
				$msg="���ݲ���ɹ���";
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
				return $rs->fields['CURRVAL'];//֧��oracle,�贴�����кʹ�����,���磺seq_example tri_example
			}else{
				return $this->conn->Insert_ID();//��֧�ֲ������ݿ�,��auto-increment���ܵ����ݿ�,��PostgreSQL,MySQL��MSSQL 
			}
		  } 
		}else{
		  echo "<script>alert('���ݲ���ʧ�ܣ�');</script>";
		  echo $query;
		  exit;
		}
	} 
	//insert ����
	
	//update ���� ���� $sql_func->update(sql���,js��ʾ����[,��ת��ַ][,��ʾ��Ϣ]);
	function update($query,$type,$addr='',$msg=''){ 
		if($msg==""){
				$msg="�����޸ĳɹ���";
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
		  echo "<script>alert('�����޸�ʧ�ܣ�');</script>";
		  echo $query;
		  exit;
		}
	} 
	//update ����
	
	//delete ���� ���� $sql_func->delete(sql���,js��ʾ����[,��ת��ַ][,��ʾ��Ϣ]);
	function delete($query,$type,$addr='',$msg=''){
		if($msg==""){
				$msg="����ɾ���ɹ���";
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
		  echo "<script>alert('����ɾ��ʧ�ܣ�');</script>";
		  echo $query;
		  exit;
		}
	} 
	//delete ����
	
	//select ���� ���� $info=$sql_func->select(sql���[,ģʽ]);
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
			echo "<script>alert('����ѡ��ʧ�ܣ�');</script>";
			echo $query;
			exit;
		}
	}
	//select ����

	//mselect ���� ���� $info=$sql_func->mselect(sql���[,ģʽ]);
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
			echo "<script>alert('����ѡ��ʧ�ܣ�');</script>";
			echo $query;
			exit;
		}
	}
	//mselect ����
	
	 //��¼������ѯ���� ���� $var=$sql_func->num_rows(sql���);
	function num_rows($query){
		$result=$this->conn->Execute($query);
		return $result->RecordCount();
	}
	 //��¼������ѯ����
	
	//���ݹ淶���� ���� $sql_func->dump(����);
	function dump($array){
		echo "<pre>";
		print_r($array);
		echo "</pre>";
	}
	//���ݹ淶����
	
	//��¼����������� ���� $sql_func->visit(���ݱ�ǰ׺,����id);
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
	//��¼�����������
	
	//idת����name ���� $sql_func->id2name($prefix,$id);
	function id2name($prefix,$id){
	  $query="select `id`,`user_name` from `".$prefix."user` where `id`='$id'";
	  $info=$this->select($query);
	  echo $info["user_name"];
	}
	//idת����name
	
	//�����˵��༭ ���� $sql_func->edit_select($array,"2","id","name");
	function edit_select($array,$selected,$id,$name){
		for($i=0;$i<count($array);$i++){
			if($array[$i][$id]==$selected){
				echo "<option value=\"".$array[$i][$id]."\" selected=\"selected\">".$array[$i][$name]."</option>\n";
			}else{
				echo "<option value=\"".$array[$i][$id]."\">".$array[$i][$name]."</option>\n";
			}
		}
	}
	//�����˵��༭
	
	//�����˵��б� ���� $sql_func->choose_select($array,"id","name");
	function choose_select($array,$id,$name){
		for($i=0;$i<count($array);$i++){
			echo "<option value=\"".$array[$i][$id]."\">".$array[$i][$name]."</option>\n";
		}
	}
	//�����˵��б�

}////////
//�������ʵ����
$sql_func=new sql_func;
$conn=$sql_func->myconnection($host,$user,$pwd,$database,$prefix,$db_type); 
$conn->Execute("SET CHARACTER SET GB2312");
$conn->SetFetchMode(ADODB_FETCH_ASSOC);
//һЩ���ݿ�����
?>