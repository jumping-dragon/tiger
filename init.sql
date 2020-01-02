CREATE DATABASE IF NOT EXISTS `tiger` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `tiger`;

CREATE TABLE IF NOT EXISTS `user-accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `student_id` varchar(100) NOT NULL,
  `phone_number` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `order` varchar(100) NOT NULL
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `user-accounts` (`id`, `name`, `email`, `student_id`,`phone_number`,`password`,`order`) VALUES (1, 'first name', 'first@first.com', 'b10000001','00000000001','first-pass','first-order');

ALTER TABLE `user-accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `user-accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;

CREATE TABLE IF NOT EXISTS `restaurant-accounts` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
)ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

INSERT INTO `restaurant-accounts` (`id`, `name`, `email`,`password`) VALUES (1, 'first restaurant', 'first@resto.com', 'first-pass');

ALTER TABLE `restaurant-accounts` ADD PRIMARY KEY (`id`);
ALTER TABLE `restaurant-accounts` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
