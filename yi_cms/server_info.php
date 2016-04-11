<?php
define(PERMISSION,"/");
include("../incl/define.php");
include(INCL."config.php");
include(INCL."common_func.php");
include(INCL."session.php");
include(INCL."sql_func.php");

/**
+------------------------------------------------------------------------------
* ��ȡ��������Ϣ��
+------------------------------------------------------------------------------
* @author: ����
* @version 1.0
* @lastupdate��2010-9-25
+------------------------------------------------------------------------------
*/
class ServerInfo
{//�ඨ�忪ʼ

    /**
     +----------------------------------------------------------
     * ��ȡ������ʱ��
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetServerTime()
    {
        return date('Y-m-d��H:i:s');
    }

    /**
     +----------------------------------------------------------
     * ��ȡ��������������
     * ���磺Apache/2.2.8 (Win32) PHP/5.2.6
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetServerSoftwares()
    {
        return $_SERVER['SERVER_SOFTWARE'];
    }

    /**
     +----------------------------------------------------------
     * ��ȡphp�汾��
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetPhpVersion()
    {
        return PHP_VERSION;
    }

    /**
     +----------------------------------------------------------
     * ��ȡMysql�汾��
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetMysqlVersion()
    {
        return mysql_get_server_info();
    }

    /**
     +----------------------------------------------------------
     * ��ȡHttp�汾��
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetHttpVersion()
    {
        return $_SERVER['SERVER_PROTOCOL'];
    }

    /**
     +----------------------------------------------------------
     * ��ȡ��վ��Ŀ¼
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetDocumentRoot()
    {
        return $_SERVER['DOCUMENT_ROOT'];
    }

    /**
     +----------------------------------------------------------
     * ��ȡPHP�ű����ִ��ʱ��
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetMaxExecutionTime()
    {
        return ini_get('max_execution_time').' Seconds';
    }

    /**
     +----------------------------------------------------------
     * ��ȡ�����������ļ��ϴ��Ĵ�С
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetServerFileUpload()
    {
        if (@ini_get('file_uploads')) {
            return '���� '.ini_get('upload_max_filesize');
        } else {
            return '<font color="red">��ֹ</font>';
        }
    }

    /**
     +----------------------------------------------------------
     * ��ȡȫ�ֱ��� register_globals��������Ϣ On/Off
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetRegisterGlobals()
    {
        return $this->GetPhpCfg('register_globals');
    }

    /**
     +----------------------------------------------------------
     * ��ȡ��ȫģʽ safe_mode��������Ϣ On/Off
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetSafeMode()
    {
        return $this->GetPhpCfg('safe_mode');
    }

    /**
     +----------------------------------------------------------
     * ��ȡGd��İ汾��
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetGdVersion()
    {
        if(function_exists('gd_info')){
            $GDArray = gd_info();
            $gd_version_number = $GDArray['GD Version'] ? '�汾��'.$GDArray['GD Version'] : '��֧��';
        }else{
            $gd_version_number = '��֧��';
        }
        return $gd_version_number;
    }

    /**
     +----------------------------------------------------------
     * ��ȡ�ڴ�ռ����
     +----------------------------------------------------------
     * @access public
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    public function GetMemoryUsage()
    {
        return $this->ConversionDataUnit(memory_get_usage());
    }

    /**
     +----------------------------------------------------------
     * �����ݵ�λ (�ֽ�)���л���
     +----------------------------------------------------------
     * @access private
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    private function ConversionDataUnit($size)
    {
        $kb = 1024;       // Kilobyte
        $mb = 1024 * $kb; // Megabyte
        $gb = 1024 * $mb; // Gigabyte
        $tb = 1024 * $gb; // Terabyte
        //round() �Ը�����������������
        if($size < $kb) {
            return $size.' Byte';
        }
        else if($size < $mb) {
            return round($size/$kb,2).' KB';
        }
        else if($size < $gb) {
            return round($size/$mb,2).' MB';
        }
        else if($size < $tb) {
            return round($size/$gb,2).' GB';
        }
        else {
            return round($size/$tb,2).' TB';
        }
    }

    /**
     +----------------------------------------------------------
     * ��ȡPHP�����ļ� (php.ini)��ֵ
     +----------------------------------------------------------
     * @param string $val ֵ
     * @access private
     +----------------------------------------------------------
     * @return string
     +----------------------------------------------------------
     */
    private function GetPhpCfg($val)
    {
        switch($result = get_cfg_var($val)) {
        case 0:
            return '�ر�';
            break;
        case 1:
            return '��';
            break;
        default:
            return $result;
            break;
        }
    }

}//�ඨ�����
date_default_timezone_set('PRC');
$ServerInfo = new ServerInfo();
$rs .= '������ʱ�䣺'.$ServerInfo->GetServerTime().'<br>';
$rs .= '�������������棺'.$ServerInfo->GetServerSoftwares().'<br>';
$rs .= 'PHP�汾��'.$ServerInfo->GetPhpVersion().'<br>';
$rs .= 'MYSQL�汾��'.$ServerInfo->GetMysqlVersion().'<br>';
$rs .= 'HTTP�汾��'.$ServerInfo->GetHttpVersion().'<br>';
$rs .= '��վ��Ŀ¼��'.$ServerInfo->GetDocumentRoot().'<br>';
$rs .= '���ִ��ʱ�䣺'.$ServerInfo->GetMaxExecutionTime().'<br>';
$rs .= '�ļ��ϴ���'.$ServerInfo->GetServerFileUpload().'<br>';
$rs .= 'ȫ�ֱ��� register_globals��'.$ServerInfo->GetRegisterGlobals().'<br>';
$rs .= '��ȫģʽ safe_mode��'.$ServerInfo->GetSafeMode().'<br>';
$rs .= 'ͼ�δ��� GD Library��'.$ServerInfo->GetGdVersion().'<br>';
$rs .= '�ڴ�ռ�ã�'.$ServerInfo->GetMemoryUsage().'<br>';
echo $rs;
include(INCL."close.php");
?>