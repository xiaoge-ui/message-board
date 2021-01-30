/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 10.1.38-MariaDB : Database - message board
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`message board` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

USE `message board`;

/*Table structure for table `admin` */

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `userName` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `userPwd` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `addTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `admin` */

insert  into `admin`(`id`,`userName`,`userPwd`,`addTime`) values (1,'tom','202cb962ac59075b964b07152d234b70','2021-01-22 20:50:27'),(2,'张飞','202cb962ac59075b964b07152d234b70','2021-01-22 21:14:16'),(3,'隔壁老王','202cb962ac59075b964b07152d234b70','2021-01-23 10:11:56'),(4,'susan','202cb962ac59075b964b07152d234b70','2021-01-23 10:17:53'),(5,'张正飞','948febd2871c815e5e73a878f4235c95','2021-01-23 10:19:07'),(7,'1111','202cb962ac59075b964b07152d234b70','2021-01-23 10:59:16');

/*Table structure for table `message` */

DROP TABLE IF EXISTS `message`;

CREATE TABLE `message` (
  `messageId` int(4) NOT NULL AUTO_INCREMENT,
  `author` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `title` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `face` varchar(10) COLLATE utf8_unicode_ci DEFAULT '1.gif',
  `addTime` datetime DEFAULT NULL,
  `flag` varbinary(2) DEFAULT '0',
  `replay` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`messageId`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `message` */

insert  into `message`(`messageId`,`author`,`title`,`content`,`face`,`addTime`,`flag`,`replay`) values (1,'隔壁老王','冬天的雪','冬天的第一场雪','1.gif','2021-01-20 20:26:08','1',NULL),(2,'小毛驴','倒骑驴','张果老倒骑驴','20.gif','2021-01-21 21:19:34','1',NULL),(3,'拜登','世界和平','世界都是我的，哈哈哈哈哈！！！','32.gif','2021-01-22 08:17:19','1',NULL),(4,'小情绪','高新就业','明天的你会感谢今天努力的自己！','19.gif','2021-01-22 08:18:42','1',NULL),(14,'王健林','钱钱','先定一个小目标，挣它一个亿！！！','1.gif','2021-01-22 09:59:06','1','6666666666666666666'),(24,'1111','1111','1111111111111111111111','31.gif','2021-01-24 09:43:53','1','3333333'),(26,'2222','2222','2222222','37.gif','2021-01-24 09:44:15','1','++333333');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
