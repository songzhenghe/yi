########
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
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;
########
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
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;
########
CREATE TABLE IF NOT EXISTS `yi_config` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `name` varchar(256) NOT NULL,
  `title` varchar(300) NOT NULL,
  `keywords` varchar(300) NOT NULL,
  `description` varchar(300) NOT NULL,
  `copyright` mediumtext NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;
########
CREATE TABLE IF NOT EXISTS `yi_counter` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `ip` varchar(50) NOT NULL,
  `counts` varchar(50) NOT NULL,
  `year` int(4) NOT NULL,
  `month` int(2) NOT NULL,
  `day` int(2) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;
########
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
########
CREATE TABLE IF NOT EXISTS `yi_file` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `article_id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `add_man` varchar(20) NOT NULL,
  `add_time` datetime NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;
########
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
########
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
########
INSERT INTO `yi_group` (`id`, `name`, `menu`, `article`, `media`, `picture`, `video`, `sound`, `flash`, `link`, `page`, `class`, `fm`) VALUES
(1, 'root', 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15);
########
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
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;
########
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
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;
########
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
########
INSERT INTO `yi_user` (`id`, `type`, `user_name`, `user_password`, `tag`, `login_time`, `login_ip`, `times`, `group_id`) VALUES
(1, 1, 'admin', '94cf05d2b53a18461cb3549ebecba1bf', 1, '2011-10-08 15:13:30', '127.0.0.1', 1, 1);
########
CREATE TABLE IF NOT EXISTS `yi_visit` (
  `id` int(11) unsigned NOT NULL auto_increment,
  `ip` varchar(15) NOT NULL,
  `time_at` datetime NOT NULL,
  `article_id` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 AUTO_INCREMENT=1 ;