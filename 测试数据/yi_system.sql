-- phpMyAdmin SQL Dump
-- version 3.1.5-rc1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2011 年 10 月 02 日 12:35
-- 服务器版本: 5.0.18
-- PHP 版本: 5.2.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `yi_system`
--
CREATE DATABASE `yi_system` DEFAULT CHARACTER SET gb2312 COLLATE gb2312_chinese_ci;
USE `yi_system`;

-- --------------------------------------------------------

--
-- 表的结构 `yi_article`
--

CREATE TABLE IF NOT EXISTS `yi_article` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `category_id` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `content` mediumtext NOT NULL,
  `add_man` varchar(20) NOT NULL,
  `add_time` datetime NOT NULL,
  `views` int(11) NOT NULL,
  `tag` int(1) NOT NULL,
  `order` int(4) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=5 ;

--
-- 导出表中的数据 `yi_article`
--

INSERT INTO `yi_article` (`id`, `category_id`, `title`, `content`, `add_man`, `add_time`, `views`, `tag`, `order`) VALUES
(1, 3, '第一条新闻', '<p>\r\n	新闻正文内容</p>\r\n<p>\r\n	<img alt="" src="/yi_system/userfiles/20110615_0640558568.jpg" style="width: 400px; height: 250px" /></p>', '1', '2011-06-15 14:40:14', 2, 1, 1),
(2, 3, 'MySQL数据类型概述', '<p style="text-align: center">\r\n	MySQL的数据类型</p>\r\n<div style="text-align:left">\r\n<p >\r\n	整数和实数(whole number and real number)<br />\r\n	整数类型:tiny int,smallint,medium int,int。分别占用1，2，3，4字节，表示范围为-2^（N-1）~2^（N-1）-1,加上unsigned标志范围增加一半。<br />\r\n	注意指定这些类型只是影响存储空间而已，MySQL在内部使用64bit的BigInt进行计算。<br />\r\n	浮点数类型<br />\r\n	float,double,decimal<br />\r\n	float占4字节，dobule占8字节，decimal用于精确的浮点数计算（如financial data等），CPU不提供直接支持，而是由mysql server自己计算。</p>\r\n<p>\r\n	String类型<br />\r\n	char和varchar<br />\r\n	varchar变长类型，如果存储列的字符串长度不一，并且最大的字符串的长度比平均长度大很多，<br />\r\n	则选用varchar比较节省空间。<br />\r\n	varchar除了存储串外，还需要1到N个字节存储串的长度，如果列的长度&lt;=255，实际占用的长度是N+1。<br />\r\n	比如varchar(10)最多占用11字节。<br />\r\n	varchar列在更新时可能会导致分片，从而影响了存取性能，如果使用定长的char则没有这个担忧。<br />\r\n	但是在存储UTF-8这类复杂的字符集时，往往使用varchar，因为每个字符使用变长的字节进行存储。</p>\r\n<p>\r\n	当某一列的所有字符串差不多一样长时，或者当串的长度很短时,首选char类型。</p>\r\n<p>\r\n	char和varchar的尾部空格<br />\r\n	在mysql5.0以及更新版本中保留了varchar的尾部空格，而使用char存储就没有尾部空格。<br />\r\n	建立表格测试如下：</p>\r\n<p>\r\n	mysql&gt; create table char_test( char_col char(10));<br />\r\n	Query OK, 0 rows affected (0.05 sec)</p>\r\n<p>\r\n	mysql&gt; show create table char_test\\G<br />\r\n	*************************** 1. row ***************************<br />\r\n	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Table: char_test<br />\r\n	Create Table: CREATE TABLE `char_test` (<br />\r\n	`char_col` char(10) DEFAULT NULL<br />\r\n	) ENGINE=MyISAM DEFAULT CHARSET=latin1<br />\r\n	1 row in set (0.00 sec)</p>\r\n<p>\r\n	mysql&gt; insert into char_test(char_col) values<br />\r\n	&nbsp;&nbsp;&nbsp; -&gt; (&#39;string1&#39;),(&#39; string2&#39;),(&#39;string3 &#39;);<br />\r\n	Query OK, 3 rows affected (0.00 sec)<br />\r\n	Records: 3 Duplicates: 0 Warnings: 0</p>\r\n<p>\r\n	mysql&gt; select concat(&quot;&#39;&quot;,char_col,&quot;&#39;&quot;) from char_test;<br />\r\n	+--------------------------+<br />\r\n	| concat(&quot;&#39;&quot;,char_col,&quot;&#39;&quot;) |<br />\r\n	+--------------------------+<br />\r\n	| &#39;string1&#39;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />\r\n	| &#39; string2&#39;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />\r\n	| &#39;string3&#39;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />\r\n	+--------------------------+<br />\r\n	存储时指定了尾部空格，但取出来的时候截断了。</p>\r\n<p>\r\n	<br />\r\n	mysql&gt; create table varchar_test(varchar_col varchar(10));<br />\r\n	Query OK, 0 rows affected (0.03 sec)</p>\r\n<p>\r\n	mysql&gt; insert into varchar_test(varchar_col) values(&#39;string1&#39;),(&#39; string2&#39;),(&#39;string3 &#39;);<br />\r\n	Query OK, 3 rows affected (0.00 sec)<br />\r\n	Records: 3 Duplicates: 0 Warnings: 0</p>\r\n<p>\r\n	mysql&gt; select concat(&quot;&#39;&quot;,varchar_col,&quot;&#39;&quot;) from varchar_test;<br />\r\n	+-----------------------------+<br />\r\n	| concat(&quot;&#39;&quot;,varchar_col,&quot;&#39;&quot;) |<br />\r\n	+-----------------------------+<br />\r\n	| &#39;string1&#39;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />\r\n	| &#39; string2&#39;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />\r\n	| &#39;string3 &#39;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />\r\n	+-----------------------------+<br />\r\n	3 rows in set (0.00 sec)</p>\r\n<p>\r\n	使用varchar存储时则保留了尾部空格。</p>\r\n<p>\r\n	binary、varbinary：char和varchar的兄弟类型，用于存储二进制串，结尾用\\0进行padding，取数时并不去掉尾部空格(trailing space)。</p>\r\n<p>\r\n	BLOB和TEXT类型<br />\r\n	用于存储大量的数据，分别用于二进制类型和字符类型。<br />\r\n	TEXT<br />\r\n	TINYTEXT,SMALLTEXT,TEXT,MEDIUMTEXT,LONGTEXT.<br />\r\n	TEXT是SMALLTEXT的同义词。<br />\r\n	BLOB<br />\r\n	TINYBLOB,SMALLBLOB,BLOB,MEDIUMBLOB,LONGBLOB.<br />\r\n	BLOB是SMALLBLOB的同义词。</p>\r\n<p>\r\n	对BLOB和TEXT的排序操作，并不是使用整个string，而是只用最前面的max_sort_length个字节进行排序，如果只需要对少于max_sort_length进行排序，可以使用order by substring(column,length).</p>\r\n<p>\r\n	MySQL不能索引这类数据类型的完整长度（只能索引部分，对索引的长度有限制），也无法使用这些数据的索引进行排序？</p>\r\n<p>\r\n	怎样避免磁盘临时表的创建？How to Avoid On-Disk Temporary Tables<br />\r\n	由于Memory存储引擎并不支持BLOB和TEXT类型，带有BLOB或TEXT的查询并且需要隐式临时表将不能在内存创建，而只能使用磁盘上的MyISAM临时表。这个会严重影响操作效率。</p>\r\n<p>\r\n	最佳解决方案是尽量避免使用BLOB和TEXT类型，除非你真的需要使用。<br />\r\n	需要排序时，可以使用order by substring(column,length)来将数据转成字符类型，而字符类型是可以用于内存临时表的，但是substring的长度也不能太大，如果太大导致临时表的大小超过了max_heap_size或者tmp_table_size，则MySQL同样也会将表转成磁盘上的临时MyISAM表。<br />\r\n	当使用explain查看query的执行计划时，如果Extra列显示&ldquo;Using temporary&rdquo;，则该查询使用了隐式的临时表。</p>\r\n<p>\r\n	时间类型Date and Time Types<br />\r\n	将日期和时间一起显示的两种类型DATETIME,TIMESTAMP<br />\r\n	DATETIME<br />\r\n	表示范围很广，从1001年-9999年，精度是1s。内部存储长度8字节，将日期和时间聚合成一个整型数值表示，<br />\r\n	格式为YYYYMMDDHHMMSS,与时区无关。<br />\r\n	TIMESTAMP<br />\r\n	顾名思义，时间标签的意思是此类型表示从1970年1月1日0时（格林威治时间Greewich Mean Time）至今经过的秒数，所以这个值是跟时区有关的。<br />\r\n	此类型只使用4字节存储，比DATETIME省了一半，大概表示从1970年-2038年。<br />\r\n	MySQL提供了FROM_UNIXTIME()和UNIX_TIMESTAMP()函数用于timestamp和date的互转。<br />\r\n	TIMESTAMP表示的值跟时区是有关系的，比如内部存储值为0，在EDT(Eastern Daylight Time东部时间)则显示成1969-12-31 19：00：00，与GMT相差了5小时。</p>\r\n<p>\r\n	位数据类型(Bit-Packed Data Types)<br />\r\n	可以使用BIT列存储一个或多个true/false值。<br />\r\n	BIT(1)定义了一个存储单个比特位的域，BIT(2)存储两个比特位，以此类推，BIT列的最大长度是64位。<br />\r\n	BIT的行为因存储引擎而异。<br />\r\n	MyISAM将所有BIT列凑合在一起存储，所以如果有17个BIT(1)列，则MyISAM将最多使用3字节进行存储，而其他存储引擎，比如Memory、InnoDB，则是把每个列存储成最接近该列长度的整型值，所以并没有节省空间。<br />\r\n	另外BIT的内部存储表示是二进制串，但取出来的是字符串类型，即二进制串所代表的ACSII字符。<br />\r\n	如果在数值环境下取出该值，则结果是二进制串所代表的值（显示为十进制格式）。</p>\r\n<p>\r\n	注意以下例子：<br />\r\n	ysql&gt; create table bittest( a bit(8));<br />\r\n	Query OK, 0 rows affected (0.00 sec)</p>\r\n<p>\r\n	mysql&gt; insert into bittest values(b&#39;00111001&#39;);<br />\r\n	Query OK, 1 row affected (0.00 sec)</p>\r\n<p>\r\n	mysql&gt; select a,a+0 from bittest;<br />\r\n	+------+------+<br />\r\n	| a&nbsp;&nbsp;&nbsp; | a+0 |<br />\r\n	+------+------+<br />\r\n	| 9&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; 57 |<br />\r\n	+------+------+<br />\r\n	1 row in set (0.00 sec)</p>\r\n<p>\r\n	枚举和集合类型（ENUM and SET）<br />\r\n	ENUM<br />\r\n	在某种程度上可以替换string类型，如果某个列的取值较少并且是固定的，那么可以选用ENUM代替varchar或char,这可以节省很多空间。<br />\r\n	MySQL在内部维护一个int-string的映射表，使用int值存储对应的字符类型。<br />\r\n	SET<br />\r\n	类似于ENUM，见下例：<br />\r\n	mysql&gt; create table acl<br />\r\n	&nbsp;&nbsp;&nbsp; -&gt; (<br />\r\n	&nbsp;&nbsp;&nbsp; -&gt; perms set(&#39;CAN_READ&#39;,&#39;CAN_WARITE&#39;,&#39;CAN_DELETE&#39;)<br />\r\n	&nbsp;&nbsp;&nbsp; -&gt; not null);<br />\r\n	Query OK, 0 rows affected (0.08 sec)</p>\r\n<p>\r\n	mysql&gt; insert into acl(perms) values(&#39;CAN_READ,CAN_DELETE&#39;);<br />\r\n	Query OK, 1 row affected (0.05 sec)</p>\r\n<p>\r\n	mysql&gt; select * from acl;<br />\r\n	+---------------------+<br />\r\n	| perms&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |<br />\r\n	+---------------------+<br />\r\n	| CAN_READ,CAN_DELETE |<br />\r\n	+---------------------+<br />\r\n	1 row in set (0.00 sec)</p>\r\n<p>\r\n	mysql&gt; select perms+0 from acl;<br />\r\n	+---------+<br />\r\n	| perms+0 |<br />\r\n	+---------+<br />\r\n	|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5 |<br />\r\n	+---------+<br />\r\n	1 row in set (0.00 sec)</p>\r\n<p>\r\n	<br />\r\n	标识列的数据类型的选取<br />\r\n	Choosing Indentifiers<br />\r\n	整型是上选，因为处理速度最快，并且支持自增（AUTO_INCREMENT）。</p>\r\n</div>', '1', '2011-06-15 14:43:28', 2, 1, 1),
(3, 3, '完美解决IE中PNG格式透明背景图片显示异常的方法', '<p style="text-align:left">\r\n	完美解决IE中PNG格式透明背景图片显示异常的方法<br />\r\n	曾经让人挠破头咬烂手恨的嚼碎齿根的毛病终于有了完美的解决方案了。 前些日子因为要做一个排版复杂的网站，开始的时候一直在Firefox下面做测试，结果到了IE下面一看，惨不忍睹，复杂排版的中使用透明背景的PNG图片在IE下面都被加上了一个奇怪颜色的背景。开始的时候想用gif图片去替换所有的透明背景PNG图片，但是gif毕竟是压缩过的，对于阴影和渐变色的处理让网页效果大打折扣，无奈之下又上网继续寻找，找遍了大量的网站，发现都没有很好的解决办法，唯一看到的是用一个外挂的js文件去解决背景问题。但是在 ie访问的时候，会弹出安全警告，如果被用户取消，就无法发挥作用。Hack css文件也让人心力憔悴&hellip;&hellip; 功夫不负有心人啊，完美解决方案在这里。原文在这里。简单的中文说明在下面。 新建一个叫png_fix.css的文件，内容如下： * html img, * html .png{ behavior: expression((this.runtimeStyle.behavior=&quot;none&quot;)&amp;&amp;(this.pngSet?this.pngSet=true:(this.nodeName == &quot;IMG&quot; &amp;&amp; this.src.toLowerCase().indexOf(&#39;.png&#39;)&gt;-1?(this.runtimeStyle.backgroundImage = &quot;none&quot;, this.runtimeStyle.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(src=&#39;&quot; + this.src + &quot;&#39;, sizingMethod=&#39;image&#39;)&quot;, this.src = &quot;transparent.gif&quot;):(this.origBg = this.origBg? this.origBg :this.currentStyle.backgroundImage.toString().replace(&#39;url(&quot;&#39;,&#39;&#39;).replace(&#39;&quot;)&#39;,&#39;&#39;), this.runtimeStyle.filter = &quot;progid:DXImageTransform.Microsoft.AlphaImageLoader(src=&#39;&quot; + this.origBg + &quot;&#39;, sizingMethod=&#39;crop&#39;)&quot;, this.runtimeStyle.backgroundImage = &quot;none&quot;)),this.pngSet=true) ); } 然后在HTML文件的 部分加入： 最后自己做一个1&times;1像素的透明gif图片，存为transparent.gif。 使用的时候是这样： 1、如果是在HTML里面直接插入的PNG图片，就直接会处理掉； 2、如果是在css里面写的用作背景的图片，需要在 里面加上class=&quot;png&quot;，最后就是 ； 3、如果是链接，需要加上cursor: pointer；测试下来使用没有问题，非常完美。</p>', '1', '2011-06-15 14:51:13', 1, 1, 1),
(4, 3, 'PHP文章摘要生成方法', '<div style="text-align: left">\r\n	<p style="text-align: center">\r\n		<a class="example1" href="##"><img alt="" src="/yi_system/userfiles/20110615_0657234001.jpg" style="width: 400px; height: 250px" /></a></p>\r\n	<p>\r\n		文章生成摘要的方法有多种，可以用JS在客户端生成，也可以在服务器端生成，当然更不排除在数据库中加一个摘要字段，在发布文章的时候自行设置。以下是在服务器端生成时的方法。</p>\r\n	<p>\r\n		我们在写BLOG时经常需要显示文章前一部分，但是又怕不恰当截断破坏封闭标签以造成整个文档结构破坏，使用我们的函数可以在要求不高的情况下解决这个问题。</p>\r\n	<p>\r\n		这了防止文章系统在截取摘要的时候容易把HTML标签分割，导致意想不到的错误，因此特意完善了以下函数！希望能给你带来启示，并且欢迎排错指点！<br />\r\n		function text_zhaiyao($text,$length){ //文章摘要生成函数&nbsp; $test:内容 $length:摘要长度<br />\r\n		global $Briefing_Length;<br />\r\n		mb_regex_encoding(&quot;UTF-8&quot;);<br />\r\n		if(mb_strlen($text) &lt;= $length ) return $text;<br />\r\n		$Foremost = mb_substr($text, 0, $length);<br />\r\n		$re = &quot;&lt;(\\/?)<br />\r\n		(P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|TABLE|TR|TD|TH|INPUT|SELECT|TEXTAREA|OBJECT|A|UL|OL|LI|<br />\r\n		BASE|META|LINK|HR|BR|PARAM|IMG|AREA|INPUT|SPAN)[^&gt;]*(&gt;?)&quot;;<br />\r\n		$Single = &quot;/BASE|META|LINK|HR|BR|PARAM|IMG|AREA|INPUT|BR/i&quot;;<br />\r\n		&nbsp;<br />\r\n		$Stack = array(); $posStack = array();<br />\r\n		&nbsp;<br />\r\n		mb_ereg_search_init($Foremost, $re, &#39;i&#39;);<br />\r\n		&nbsp;<br />\r\n		while($pos = mb_ereg_search_pos()){<br />\r\n		$match = mb_ereg_search_getregs();<br />\r\n		/* [Child-matching Formulation]:<br />\r\n		&nbsp;<br />\r\n		$matche[1] : A &quot;/&quot; charactor indicating whether current &quot;&lt;...&gt;&quot; Friction is<br />\r\n		Closing Part<br />\r\n		$matche[2] : Element Name.<br />\r\n		$matche[3] : Right &gt; of a &quot;&lt;...&gt;&quot; Friction<br />\r\n		*/<br />\r\n		if($match[1]==&quot;&quot;){<br />\r\n		$Elem = $match[2];<br />\r\n		if(mb_eregi($Single, $Elem) &amp;&amp; $match[3] !=&quot;&quot;){<br />\r\n		continue;<br />\r\n		}<br />\r\n		array_push($Stack, mb_strtoupper($Elem));<br />\r\n		array_push($posStack, $pos[0]);<br />\r\n		}else{<br />\r\n		$StackTop = $Stack[count($Stack)-1];<br />\r\n		$End = mb_strtoupper($match[2]);<br />\r\n		if(strcasecmp($StackTop,$End)==0){<br />\r\n		array_pop($Stack);<br />\r\n		array_pop($posStack);<br />\r\n		if($match[3] ==&quot;&quot;){<br />\r\n		$Foremost = $Foremost.&quot;&gt;&quot;;<br />\r\n		}<br />\r\n		}<br />\r\n		}<br />\r\n		}<br />\r\n		$cutpos = array_shift($posStack) - 1;<br />\r\n		$Foremost = mb_substr($Foremost,0,$cutpos,&quot;UTF-8&quot;);<br />\r\n		return $Foremost;<br />\r\n		}</p>\r\n</div>', '1', '2011-06-15 14:54:00', 1, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `yi_category`
--

CREATE TABLE IF NOT EXISTS `yi_category` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `rank` int(1) NOT NULL,
  `type` int(1) NOT NULL,
  `up_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `add_man` varchar(20) NOT NULL,
  `add_time` datetime NOT NULL,
  `tag` int(1) NOT NULL,
  `url` varchar(300) NOT NULL,
  `order` int(4) NOT NULL,
  `target` int(1) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=10 ;

--
-- 导出表中的数据 `yi_category`
--

INSERT INTO `yi_category` (`id`, `rank`, `type`, `up_id`, `name`, `add_man`, `add_time`, `tag`, `url`, `order`, `target`) VALUES
(1, 1, 3, 0, '首页', '1', '2011-06-15 14:35:58', 1, 'index.php', 1, 1),
(2, 1, 3, 0, '图片', '1', '2011-06-15 14:37:20', 1, 'p_list.php?mid=5', 2, 1),
(3, 1, 2, 0, '新闻', '1', '2011-06-15 14:39:38', 1, '#', 3, 1),
(4, 1, 3, 0, '视频', '1', '2011-06-15 15:11:28', 1, 'v_list.php?mid=1', 4, 1),
(5, 1, 3, 0, '音频', '1', '2011-06-15 15:21:40', 1, 's_list.php?mid=2', 5, 1),
(6, 1, 3, 0, '动画', '1', '2011-06-15 15:23:55', 1, 'f_list.php?mid=3', 6, 1),
(7, 1, 1, 0, '三级菜单', '1', '2011-06-15 15:30:04', 1, '#', 7, 1),
(8, 2, 1, 7, '网站简介', '1', '2011-06-15 15:30:41', 1, '#', 1, 1),
(9, 3, 3, 8, '简介-1', '1', '2011-06-15 15:31:06', 1, 'http://hi.baidu.com/songzhenghe89', 1, 2);

-- --------------------------------------------------------

--
-- 表的结构 `yi_config`
--

CREATE TABLE IF NOT EXISTS `yi_config` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(256) NOT NULL,
  `title` varchar(300) NOT NULL,
  `keywords` varchar(300) NOT NULL,
  `description` varchar(300) NOT NULL,
  `copyright` mediumtext NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=7 ;

--
-- 导出表中的数据 `yi_config`
--

INSERT INTO `yi_config` (`id`, `name`, `title`, `keywords`, `description`, `copyright`) VALUES
(1, 'index.php', '奕维建站系统', '奕维建站系统', '奕维建站系统', '<p>\r\n	不加</p>'),
(2, 'p_list.php', '图片列表页', '图片列表页', '图片列表页', '<p>\r\n	暂无</p>'),
(3, 'news_list.php', '新闻列表页', '新闻列表页', '新闻列表页', '<p>\r\n	暂无</p>'),
(4, 'v_list.php', '视频列表页', '视频列表页', '视频列表页', '<p>\r\n	暂无</p>'),
(5, 's_list.php', '音频列表页', '音频列表页', '音频列表页', '<p>\r\n	暂无</p>'),
(6, 'f_list.php', 'flash列表页', 'flash列表页', 'flash列表页', '<p>\r\n	暂无</p>');

-- --------------------------------------------------------

--
-- 表的结构 `yi_counter`
--

CREATE TABLE IF NOT EXISTS `yi_counter` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `ip` varchar(50) NOT NULL,
  `counts` varchar(50) NOT NULL,
  `year` int(4) NOT NULL,
  `month` int(2) NOT NULL,
  `day` int(2) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=2 ;

--
-- 导出表中的数据 `yi_counter`
--

INSERT INTO `yi_counter` (`id`, `ip`, `counts`, `year`, `month`, `day`) VALUES
(1, '127.0.0.1', '1', 2011, 10, 2);

-- --------------------------------------------------------

--
-- 表的结构 `yi_endlessclass`
--

CREATE TABLE IF NOT EXISTS `yi_endlessclass` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `f_id` int(11) NOT NULL,
  `type` int(1) NOT NULL,
  `name` varchar(20) NOT NULL,
  `order` int(4) NOT NULL,
  `tag` int(1) NOT NULL,
  `url` varchar(300) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `yi_endlessclass`
--


-- --------------------------------------------------------

--
-- 表的结构 `yi_file`
--

CREATE TABLE IF NOT EXISTS `yi_file` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `article_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `add_man` varchar(20) NOT NULL,
  `add_time` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=3 ;

--
-- 导出表中的数据 `yi_file`
--

INSERT INTO `yi_file` (`id`, `article_id`, `name`, `add_man`, `add_time`) VALUES
(1, 1, '20110615_0640558568.jpg', '1', '2011-06-15 14:40:55'),
(2, 4, '20110615_0657234001.jpg', '1', '2011-06-15 14:57:23');

-- --------------------------------------------------------

--
-- 表的结构 `yi_fm`
--

CREATE TABLE IF NOT EXISTS `yi_fm` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(30) NOT NULL,
  `note` varchar(300) NOT NULL,
  `extend` varchar(10) NOT NULL,
  `path` varchar(300) NOT NULL,
  `add_man` varchar(20) NOT NULL,
  `add_time` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;

--
-- 导出表中的数据 `yi_fm`
--

-- --------------------------------------------------------

--
-- 表的结构 `yi_group`
--

CREATE TABLE IF NOT EXISTS `yi_group` (
  `id` int(5) unsigned NOT NULL auto_increment,
  `name` varchar(25) NOT NULL,
  `menu` int(4) NOT NULL,
  `article` int(4) NOT NULL,
  `media` int(4) NOT NULL,
  `picture` int(4) NOT NULL,
  `video` int(4) NOT NULL,
  `sound` int(4) NOT NULL,
  `flash` int(4) NOT NULL,
  `link` int(4) NOT NULL,
  `page` int(4) NOT NULL,
  `class` int(4) NOT NULL,
  `fm` int(4) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=2 ;

--
-- 导出表中的数据 `yi_group`
--

INSERT INTO `yi_group` (`id`, `name`, `menu`, `article`, `media`, `picture`, `video`, `sound`, `flash`, `link`, `page`, `class`, `fm`) VALUES
(1, 'root', 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15);

-- --------------------------------------------------------

--
-- 表的结构 `yi_item`
--

CREATE TABLE IF NOT EXISTS `yi_item` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `media_id` int(11) NOT NULL,
  `title` varchar(300) NOT NULL,
  `alt` varchar(300) NOT NULL,
  `url` varchar(300) NOT NULL,
  `pic` varchar(30) NOT NULL,
  `add_man` varchar(20) NOT NULL,
  `add_time` datetime NOT NULL,
  `tag` int(1) NOT NULL,
  `order` int(4) NOT NULL,
  `type` int(1) NOT NULL,
  `pathinfo` int(1) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=16 ;

--
-- 导出表中的数据 `yi_item`
--

INSERT INTO `yi_item` (`id`, `media_id`, `title`, `alt`, `url`, `pic`, `add_man`, `add_time`, `tag`, `order`, `type`, `pathinfo`) VALUES
(1, 1, '../userfiles/1.flv', '隐形的翅膀flv', '###', '130815054811770.jpg', '1', '2011-06-15 15:09:08', 1, 1, 2, 2),
(2, 1, '../userfiles/2.flv', '一首歌', 'http://www.baidu.com', '#', '1', '2011-06-15 15:15:21', 1, 1, 2, 2),
(3, 2, '../userfiles/1.mp3', '一首音乐', '#', '#', '1', '2011-06-15 15:16:49', 1, 1, 3, 2),
(4, 2, '../userfiles/2.mp3', '怒放的生命', '#', '130815123447348.jpg', '1', '2011-06-15 15:20:34', 1, 1, 3, 2),
(5, 3, '../userfiles/1.swf', 'flash 又见炊烟', '#', '130815136943921.jpg', '1', '2011-06-15 15:22:49', 1, 1, 4, 2),
(6, 4, '百度空间', '宋正河的百度空间', 'http://hi.baidu.com/songzhenghe89', '#', '1', '2011-06-15 15:26:07', 1, 1, 5, 2),
(7, 4, 'php100', 'php100', 'http://www.php100.com', '#', '1', '2011-06-15 15:27:13', 1, 1, 5, 2),
(8, 5, '130815208835629.jpg', 'CYSJ_0040004', '#', 's-130815208835629.jpg', '1', '2011-06-15 15:34:48', 1, 1, 1, 1),
(9, 5, '130815208937552.jpg', 'ia3-wp_1024-007', '#', 's-130815208937552.jpg', '1', '2011-06-15 15:34:49', 1, 1, 1, 1),
(10, 5, '130815209066577.jpg', '1227493342517nsi6kll0wd', '#', 's-130815209066577.jpg', '1', '2011-06-15 15:34:50', 1, 1, 1, 1),
(11, 5, '130815209166767.jpg', '1600KorCG_1003', '#', 's-130815209166767.jpg', '1', '2011-06-15 15:34:51', 1, 1, 1, 1),
(12, 5, '130815209256610.jpg', 'Chromatic_002001', '#', 's-130815209256610.jpg', '1', '2011-06-15 15:34:52', 1, 1, 1, 1),
(13, 5, '13081520935831.jpg', 'Pizzahut_4019', '#', 's-13081520935831.jpg', '1', '2011-06-15 15:34:53', 1, 1, 1, 1),
(14, 5, '130815209498801.jpg', '2010_001010', '#', 's-130815209498801.jpg', '1', '2011-06-15 15:34:54', 1, 1, 1, 1),
(15, 5, '130815209524914.jpg', 'MHKTFJ_10006', '#', 's-130815209524914.jpg', '1', '2011-06-15 15:34:55', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `yi_media`
--

CREATE TABLE IF NOT EXISTS `yi_media` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(20) NOT NULL,
  `type` int(1) NOT NULL,
  `position` int(2) NOT NULL,
  `add_man` varchar(20) NOT NULL,
  `add_time` datetime NOT NULL,
  `tag` int(1) NOT NULL,
  `order` int(4) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=6 ;

--
-- 导出表中的数据 `yi_media`
--

INSERT INTO `yi_media` (`id`, `name`, `type`, `position`, `add_man`, `add_time`, `tag`, `order`) VALUES
(1, '视频', 2, 1, '1', '2011-06-15 15:07:12', 1, 1),
(2, '音频', 3, 1, '1', '2011-06-15 15:16:10', 1, 1),
(3, '动画', 4, 1, '1', '2011-06-15 15:22:13', 1, 1),
(4, '友情链接', 5, 1, '1', '2011-06-15 15:25:24', 1, 1),
(5, '图片', 1, 1, '1', '2011-06-15 15:34:18', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `yi_user`
--

CREATE TABLE IF NOT EXISTS `yi_user` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `type` int(1) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(32) NOT NULL,
  `tag` int(1) NOT NULL,
  `login_time` datetime NOT NULL,
  `login_ip` varchar(15) NOT NULL,
  `times` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=2 ;

--
-- 导出表中的数据 `yi_user`
--

INSERT INTO `yi_user` (`id`, `type`, `user_name`, `user_password`, `tag`, `login_time`, `login_ip`, `times`, `group_id`) VALUES
(1, 1, 'admin', '94cf05d2b53a18461cb3549ebecba1bf', 1, '2011-10-08 15:13:30', '127.0.0.1', 1, 1);

-- --------------------------------------------------------

--
-- 表的结构 `yi_visit`
--

CREATE TABLE IF NOT EXISTS `yi_visit` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `ip` varchar(15) NOT NULL,
  `time_at` datetime NOT NULL,
  `article_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=5 ;

--
-- 导出表中的数据 `yi_visit`
--

INSERT INTO `yi_visit` (`id`, `ip`, `time_at`, `article_id`) VALUES
(1, '127.0.0.1', '2011-06-15 15:06:41', 1),
(2, '127.0.0.1', '2011-06-15 15:06:10', 2),
(3, '127.0.0.1', '2011-06-15 14:51:43', 3),
(4, '127.0.0.1', '2011-06-15 14:58:17', 4);
