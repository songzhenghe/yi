/*
Copyright (c) 2003-2010, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    //config.filebrowserLinkUploadUrl='../editor/upload.php?type=file';
    //config.filebrowserImageUploadUrl = '../editor/upload.php?type=img';
    //config.filebrowserFlashUploadUrl = '../editor/upload.php?type=flash';
	config.filebrowserLinkBrowseUrl="../module_fm/fm_getinfo.php";
	config.filebrowserImageBrowseUrl = "../module_fm/fm_getinfo.php";
    config.filebrowserFlashBrowseUrl = "../module_fm/fm_getinfo.php";
	
	config.filebrowserWindowWidth ="80%";
	config.filebrowserWindowHeight ="40%";
	//config.filebrowserImageWindowWidth ="800";
    //config.filebrowserImageWindowHeight ="400";
	//config.filebrowserFlashWindowWidth ="800";
    //config.filebrowserFlashWindowHeight ="400";
	//config.filebrowserLinkWindowWidth ="800";
    //config.filebrowserLinkWindowHeight ="400";
	
	config.skin = 'office2003';
	config.font_names = '宋体;楷体_GB2312;新宋体;黑体;隶书;幼圆;微软雅黑;Arial; Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana;';
	//config.width=800;
	//config.height=200;
};
