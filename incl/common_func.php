<?php
include_once("permission.php");  
class common_func {////////
  //时间函数 调用 $var=$common_func->nowtime();
  function nowtime(){
	$time=date("Y-m-d H:i:s",time());
	return $time;
  }
  //时间函数
  
  //文件上传函数 调用 $var=$common_func->fileupload(上传路径,文件类型,文件大小,文件域名称);
  function fileupload($path,$type,$size,$fname=''){ 
	$size=$size*1048576;
	$fname=($fname=="")?"file":$fname;
    $filename=basename($_FILES[$fname]['name']);
	$filetype=strtolower(substr($filename,strrpos($filename,"."),strlen($filename)-strrpos($filename,".")));
	if(!in_array($filetype,$type)){
	  echo "<script>alert('文件类型错误，不能上传！');history.back(-1);</script>";
	  exit;
	}
	if ($_FILES[$fname]['size']>$size) {
	  echo "<script>alert('文件太大，不能上传！');history.back(-1);</script>";
	  exit;
	}
	$filename=time().rand(0,100000);
	$filename=$filename.$filetype; 
	if($path==""){
	  $savedir=$filename;
	}else{
	  $savedir=$path.$filename;
	}
	if(move_uploaded_file($_FILES[$fname]['tmp_name'],$savedir)){
	  return $filename;
	  exit;
    }else{
	  echo "<script>alert('错误，无法将附件写入服务器!');history.back(-1);</script>";
	  exit;
	}     
  } 
  //文件上传函数

  //字符串截取函数 调用 $var=$common_func->substrs(内容,长度);
  function substrs($content,$length) {
    $length=$length+4;
    if(strlen($content)>$length){
      $num=0;
      for($i=0;$i<$length-3;$i++) {
        if(ord($content[$i])>127)$num++;
      }
      $num%2==1 ? $content=substr($content,0,$length-4):$content=substr($content,0,$length-3);
      $content.=' ...';
      }
      return $content;
  }
  //字符串截取函数
  
  //字符转换1：向数据库中插入或更新时用 调用 $var=$common_func->str_to1(字符串);
  function str_to1($str){
    $str=str_replace(" ","&nbsp;",$str);  
    $str=str_replace("<","&lt;",$str);  
    $str=str_replace(">","&gt;",$str); 
    $str=nl2br($str);               
    return $str;
  }
  //字符转换1：向数据库中插入或更新时用
  
  //字符转换2：从数据库中读出显示在表单文本框中用 调用 $var=$common_func->str_to2(字符串);
  function str_to2($str){
    $str=str_replace("&nbsp;"," ",$str);  
    $str=str_replace("<br />","",$str);  
    return $str;
  }
  //字符转换2：从数据库中读出显示在表单文本框中用
  
  //限制登陆函数 调用 $common_func->restrict(session名字,登陆页地址);
  function restrict($session_name,$login_path){ //函数开始
	if ($_SESSION[$session_name]==""){
	  echo "<script>location.href='".$login_path."';</script>";
	  exit;
    }
  }
  //限制登陆函数
  
  //分页函数 调用 $common_func->pages();$total_num为总记录数，$page_id为当前页码，$add为链接地址(可选)，$pagesize为新闻条数，$type为分页类型
  function pages($total_num,$page_id,$add,$pagesize,$type=1){ 
	$total_page=ceil($total_num/$pagesize);	
	$up=$page_id-1;
	$down=$page_id+1;
		if($page_id==1){
			echo "&lt;&lt;首页&nbsp;&nbsp;";
		}else{
			echo "<a href=".$add."page_id=1>&lt;&lt;首页</a>&nbsp;&nbsp;";
		}
		if($up<1){
			$up=1;
			echo "<span style=\"color:grey;\">&lt;上一页</span>&nbsp;&nbsp;";
		}else {
			echo "<a href=".$add."page_id=".$up.">&lt;上一页</a>&nbsp;&nbsp;";
		}
		//
		if($type==1){
			echo "<select onchange=\"window.location='".$add."page_id='+this.value;\">";
			for($i=1;$i<=$total_page;$i++){
				if($i==$page_id){
					echo "<option value=\"".$i."\" selected=\"selected\">&nbsp;&nbsp;".$i."/".$total_page."&nbsp;&nbsp;</option>";
				}else{
					echo "<option value=\"".$i."\">&nbsp;&nbsp;".$i."/".$total_page."&nbsp;&nbsp;</option>";
				}
			}
			echo "</select>";
		}else if($type==2){
			$sub_size=10;
			$total_sub_page=ceil($total_page/$sub_size);
			for($i=1;$i<=$total_sub_page;$i++){
				echo "<div class=\"div_page_roll".$i."\" style=\"display:none\">";
				if(($i-1)>0){
					echo "<a href=\"###\" onclick=\"turnpage(".($i-1).")\">|&#60;&#60;</a>&nbsp;&nbsp;";
				}else{
					echo "<span style=\"color:grey;\">|&#60;&#60;</span>&nbsp;&nbsp;";
				}
				for($j=$sub_size*($i-1)+1;$j<=(($i*$sub_size)>$total_page?$total_page:($i*$sub_size));$j++){
					if($j==$page_id){
						echo "&nbsp;&nbsp;<span style=\"font-size:130%;\">".$j."</span>&nbsp;&nbsp;";
					}else{
						echo "&nbsp;&nbsp;<a href=\"".$add."page_id=".$j."\">[ ".$j." ]</a>&nbsp;&nbsp;";
					}
				}
				if(($i+1)<=$total_sub_page){
					echo "&nbsp;&nbsp;<a href=\"###\" onclick=\"turnpage(".($i+1).")\">&#62;&#62;|</a>";
				}else{
					echo "&nbsp;&nbsp;<span style=\"color:grey;\">&#62;&#62;|</span>";
				}
				echo "</div>";
			}
			echo "&nbsp;&nbsp;<span class=\"div_currpage\"></span>&nbsp;&nbsp;";
			echo "&nbsp;&nbsp;第<span style=\"color:red;font-weight:bold;\">".$page_id."</span>/<span style=\"font-weight:bold;\">".$total_page."</span>页&nbsp;&nbsp;";
			echo "<script>";
			echo "function getElementsByClassName(n) { ";
			echo "	var classElements = [],allElements = document.getElementsByTagName('*'); ";
			echo "	for (var i=0; i< allElements.length; i++ ) { ";
			echo "		if (allElements[i].className == n ) { ";
			echo "			classElements[classElements.length] = allElements[i]; ";
			echo "		} ";
			echo "	}"; 
			echo "	return classElements; ";
			echo "}";
			$sub_page_id=ceil($page_id/$sub_size);
			echo "var div_page_roll_value = getElementsByClassName('div_page_roll".$sub_page_id."')[0].innerHTML;";
			echo "var div_currpage = getElementsByClassName('div_currpage');";
			echo "for (var i=0; i<div_currpage.length; i++) {";
			echo "div_currpage[i].innerHTML=div_page_roll_value;";
			echo "}";
			echo "function turnpage(page){  ";
			echo "var div_page_roll_value = getElementsByClassName('div_page_roll'+page)[0].innerHTML;";
			echo "var div_currpage = getElementsByClassName('div_currpage');";
			echo "for (var i=0; i<div_currpage.length; i++) {";
			echo "div_currpage[i].innerHTML=div_page_roll_value;";
			echo "}";
			echo "}";
			echo "</script>";
		}
		//
		if($down>$total_page){
			$down=$total_page;
			echo "&nbsp;&nbsp;<span style=\"color:grey;\">下一页&gt;</span>&nbsp;";
		}else {
			echo "&nbsp;&nbsp;<a href=".$add."page_id=".$down.">下一页&gt;</a>&nbsp;";
		}
		if($page_id==$total_page){
			echo "&nbsp;&nbsp;尾页&gt;&gt;";
		}else{
			echo "&nbsp;&nbsp;<a href=".$add."page_id=$total_page>尾页&gt;&gt;</a>";
		}
		echo " 共<strong>".$total_num."</strong>条记录 每页显示<strong>".$pagesize."</strong>条";
		echo "&nbsp;&nbsp;跳至第<input type=\"text\" id=\"pagejump\" value=\"".(($page_id+1)>$total_page?$total_page:($page_id+1))."\" style=\"width:20px;text-align:center;\" />页
		&nbsp;<input type=\"button\" value=\"Go!\" onclick=\"location.href='".$add."page_id='+document.getElementById('pagejump').value\" style=\"cursor:pointer;\" />";
  } 
  //分页函数
  
  //ck 调用 $common_func->ck(初始值);
  function ck($value){
	include_once "../editor/ckeditor/ckeditor.php";            
	$CKEditor = new CKEditor();
	$CKEditor->config['width'] = 800;                                       
	$CKEditor->config['height'] = 400;
	$CKEditor->config['filebrowserLinkUploadUrl'] = '../editor/upload.php?type=file';
	$CKEditor->config['filebrowserImageUploadUrl'] = '../editor/upload.php?type=img';
	$CKEditor->config['filebrowserFlashUploadUrl'] = '../editor/upload.php?type=flash';
	$CKEditor->editor("content",$value,$config);    
  }
  //ck
  
  //ck2 调用 $common_func->ck2(初始值);
  function ck2($value){
	include_once "../editor/ckeditor/ckeditor.php";            
	$CKEditor = new CKEditor();
	$CKEditor->config['width'] = 700;                                    
	$CKEditor->config['height'] = 200;
	$CKEditor->config['filebrowserLinkUploadUrl'] = '';
	$CKEditor->config['filebrowserImageUploadUrl'] = '';
	$CKEditor->config['filebrowserFlashUploadUrl'] = '';
	$CKEditor->editor("copyright",$value,$config);    
  }
  //ck2
    
  //js弹框 调用方法$common_func->alert(消息,类型,跳转地址);
  function alert($msg,$type,$addr=''){
  	if($type==1){
		echo "<script>alert('".$msg."');</script>";
	}else if($type==2){
		echo "<script>alert('".$msg."');location.href='".$addr."';</script>";
	}else{
		echo "<script>location.href='".$addr."';</script>";
	}
  }
  //js弹框
  
  //图片缩放函数 调用$common_func->resizeimg(宽,高,路径,文件名,目标,文件名前缀);
	function resizeimg($w,$h,$path,$image,$dest,$pre){
	$img=getimagesize($path.$image);
	$width=$img[0];
	$height=$img[1];
	if($width>$w){
		$x=$w;
		$y=round($x*$height/$width);
	}else{
		$x=$width;
		$y=$height;
	}
	if($y>$h){
		$x=round($x-($y-$h)*$width/$height);
		$y=$h;
	}
	switch($img[2]){
		case 1:
		$im=@imagecreatefromgif($path.$image);
		break;
		case 2:
		$im=@imagecreatefromjpeg($path.$image);
		break;
		case 3:
		$im=@imagecreatefrompng($path.$image);
		break;
	}
	$newimg=imagecreatetruecolor($x,$y);
	imagecopyresized($newimg,$im,0,0,0,0,$x,$y,$width,$height);
	$filename=$dest.$pre.$image;
	switch($img[2]){
		case 1:
		imagegif($newimg,$filename);
		break;
		case 2:
		imagejpeg($newimg,$filename);
		break;
		case 3:
		imagepng($newimg,$filename);
		break;
	}
  }
  //图片缩放函数
  
  //特殊字符转义 调用$common_func->treat_char(字符);
  function treat_char($string){
	return str_replace('\'','',$string);
  }
  //特殊字符转义
  
  //魔术引号 调用$common_func->_mysql_string(内容);
  function _mysql_string($_string) {
		if (!GPC) {
			if (is_array($_string)) {
				foreach ($_string as $_key => $_value) {
					$_string[$_key] = $this->_mysql_string($_value);  
				}
			} else {
				$_string = mysql_real_escape_string($_string);
			}
		} 
		return $_string;
	}
  //魔术引号 
  
  //长度检测 调用$common_func->enter_check(内容,类型,长度,默认值);
  function enter_check($obj,$type,$length,$default=''){
  	$obj=trim($obj);
	$obj=str_replace("\"","&quot;",$obj);
	$obj=str_replace("\'","&acute;",$obj);
	$obj=str_replace("<","&lt;",$obj);
	$obj=str_replace(">","&gt;",$obj);
	if($type=="number"){
		if($obj<=0){
			$obj=1;
		}
		if(eregi("^[0-9]+$",$obj)==false and $default!=""){
			$obj=$default;
		}
	}
	if(strlen($obj)==0 and $default!=""){
		$obj=$default;
	}
	if(strlen($obj)>$length){
		$num=0;
		for($i=0;$i<$length;$i++) {
		if(ord($obj[$i])>127)$num++;
		}
		$num%2==1 ? $obj=substr($obj,0,$length-1):$obj=substr($obj,0,$length);
	}
	if (!GPC) {
		$obj = mysql_real_escape_string($obj);
	}
	return $obj;
  }
  //长度检测
  
  //文件是否存在判断
  function exist_check($path,$filename,$class='',$rel='',$title='',$width='12',$height='15'){
  	if($filename!=""){
		if(file_exists($path.$filename)){
			echo "<a href=\"".$path.$filename."\" class=\"".$class."\" rel=\"".$rel."\" title=\"".$title."\"><img src=\"".$path.$filename."\" alt=\"".$filename."\" width=\"".$width."\" height=\"".$height."\" /></a>";
		}else{
			echo "<img src=\"".B_IMG."no.png\">";
		}
	}else{
		echo "文件名为空！";
	}
  }
  //文件是否存在判断
  
	//utf8->GB2312  调用$common_func->GetGB2312String(字符);
	function GetGB2312String($name)
	{
	$tostr = "";
	for($i=0;$i<strlen($name);$i++)
	{
	   $curbin = ord(substr($name,$i,1));
	   if($curbin < 0x80)
	   {
		$tostr .= substr($name,$i,1);
	   }elseif($curbin < bindec("11000000")){
		$str = substr($name,$i,1);
		$tostr .= "&#".ord($str).";";
	   }elseif($curbin < bindec("11100000")){
		$str = substr($name,$i,2);
		$tostr .= "&#".$this->GetUnicodeChar($str).";";
		$i += 1;
	   }elseif($curbin < bindec("11110000")){
		$str = substr($name,$i,3);
		$gstr= iconv("UTF-8","GB2312",$str);
		if(!$gstr)
		{
		$tostr .= "&#".$this->GetUnicodeChar($str).";";
		}else{
		$tostr .= $gstr;
		}
	
		$i += 2;
	   }elseif($curbin < bindec("11111000")){
		$str = substr($name,$i,4);
		$tostr .= "&#".$this->GetUnicodeChar($str).";";
	   
		$i += 3;
	   }elseif($curbin < bindec("11111100")){
		$str = substr($name,$i,5);
		$tostr .= "&#".$this->GetUnicodeChar($str).";";
	   
		$i += 4;
	   }else{
		$str = substr($name,$i,6);
		$tostr .= "&#".$this->GetUnicodeChar($str).";";
	   
		$i += 5;
	   }
	}
	
	return $tostr;
	}//end function
	
	function GetUnicodeChar($str)
	{
	$temp = "";
	for($i=0;$i<strlen($str);$i++)
	{
	   $x = decbin(ord(substr($str,$i,1)));
	   if($i == 0)
	   {
		$s = strlen($str)+1;
		$temp .= substr($x,$s,8-$s);
	   }else{
		$temp .= substr($x,2,6);
	   }
	}
	return bindec($temp);
	}//end function
   //utf8->GB2312
  
  //获取网站url函数,兼容主站与分站 调用 $common_func->get_url([文件地址]);输出 echo $_SESSION["URL"];
  function get_url($src='../incl/url.php'){
	echo "<script src='".$src."'></script>";
  }
  //获取网站url函数,兼容主站与分站
  
  //信息写入文件函数,用于测试时使用 调用$common_func->tofile(内容);
  function tofile($content){
	$fp=fopen("a.txt","w+");
	fwrite($fp,$content);
	fclose($fp);
  }
  //信息写入文件函数,用于测试时使用 
  
  //文件类型展示函数 调用$common_func->ftype(扩展名);
  function ftype($extend){
	  switch($extend){
		case ".jpg":
		echo "<img src=\"".B_IMG."ftype/图片/JPG.png\" width=60 height=60>";
		break;
		case ".jpeg":
		echo "<img src=\"".B_IMG."ftype/图片/JPG.png\" width=60 height=60>";
		break;
		case ".png":
		echo "<img src=\"".B_IMG."ftype/图片/PNG.png\" width=60 height=60>";
		break;
		case ".gif":
		echo "<img src=\"".B_IMG."ftype/图片/GIF.png\" width=60 height=60>";
		break;
		case ".bmp":
		echo "<img src=\"".B_IMG."ftype/图片/BMP.png\" width=60 height=60>";
		break;
		case ".psd":
		echo "<img src=\"".B_IMG."ftype/图片/PSD.png\" width=60 height=60>";
		break;
		case ".rar":
		echo "<img src=\"".B_IMG."ftype/压缩/RAR.png\" width=60 height=60>";
		break;
		case ".zip":
		echo "<img src=\"".B_IMG."ftype/压缩/ZIP.png\" width=60 height=60>";
		break;
		case ".7z":
		echo "<img src=\"".B_IMG."ftype/压缩/7Z.png\" width=60 height=60>";
		break;
		case ".gz":
		echo "<img src=\"".B_IMG."ftype/压缩/GZ.png\" width=60 height=60>";
		break;
		case ".tar":
		echo "<img src=\"".B_IMG."ftype/压缩/TAR.png\" width=60 height=60>";
		break;
		case ".doc":
		echo "<img src=\"".B_IMG."ftype/文本/DOC.png\" width=60 height=60>";
		break;
		case ".xls":
		echo "<img src=\"".B_IMG."ftype/文本/XLS.png\" width=60 height=60>";
		break;
		case ".ppt":
		echo "<img src=\"".B_IMG."ftype/文本/PPT.png\" width=60 height=60>";
		break;
		case ".pdf":
		echo "<img src=\"".B_IMG."ftype/文本/PDF.png\" width=60 height=60>";
		break;
		case ".txt":
		echo "<img src=\"".B_IMG."ftype/文本/TXT.png\" width=60 height=60>";
		break;
		case ".swf":
		echo "<img src=\"".B_IMG."ftype/动画/SWF.png\" width=60 height=60>";
		break;
		case ".fla":
		echo "<img src=\"".B_IMG."ftype/动画/FLA.png\" width=60 height=60>";
		break;
		case ".flv":
		echo "<img src=\"".B_IMG."ftype/视频/FLV.png\" width=60 height=60>";
		break;
		case ".avi":
		echo "<img src=\"".B_IMG."ftype/视频/AVI.png\" width=60 height=60>";
		break;
		case ".mov":
		echo "<img src=\"".B_IMG."ftype/视频/MOV.png\" width=60 height=60>";
		break;
		case ".mp4":
		echo "<img src=\"".B_IMG."ftype/视频/MP4.png\" width=60 height=60>";
		break;
		case ".wmv":
		echo "<img src=\"".B_IMG."ftype/视频/WMV.png\" width=60 height=60>";
		break;
		case ".mp3":
		echo "<img src=\"".B_IMG."ftype/音频/MP3.png\" width=60 height=60>";
		break;
		case ".wma":
		echo "<img src=\"".B_IMG."ftype/音频/WMA.png\" width=60 height=60>";
		break;
		case ".wav":
		echo "<img src=\"".B_IMG."ftype/音频/WAV.png\" width=60 height=60>";
		break;
		default:
		echo "<img src=\"".B_IMG."ftype/OTHER.png\" width=60 height=60>";
	  }
  }
  //
    
}////////
//对类进行实例化
$common_func=new common_func;
?>