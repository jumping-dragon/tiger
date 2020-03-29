-- Create Database
  CREATE DATABASE IF NOT EXISTS `tiger` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
  USE `tiger`;

-- Create user-accounts table
  CREATE TABLE IF NOT EXISTS `user_accounts` (
    `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `email` varchar(100) NOT NULL,
    `student_id` varchar(100) NOT NULL,
    `phone_number` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    PRIMARY KEY (`user_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;

  INSERT INTO `user_accounts` (`name`, `email`, `student_id`,`phone_number`,`password`) 
  VALUES ('first name', 'first@first.com', 'b10000001','00000000001','first-pass');

-- Create restaurant-accounts table
  CREATE TABLE IF NOT EXISTS `restaurant_accounts` (
    `restaurant_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `full_name` varchar(50) NOT NULL,
    `username` varchar(50),
    `email` varchar(100) NOT NULL,
    `password` varchar(255) NOT NULL,
    `picture` varchar(100),
    PRIMARY KEY (`restaurant_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  INSERT INTO `restaurant_accounts` (`full_name`,`username`, `email`,`password`,`picture`) 
  VALUES ('first restaurant', 'first username' , 'first@resto.com', 'first-pass','blank_profile.jpg');

-- Create products table
  CREATE TABLE IF NOT EXISTS `products`(
    `product_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `restaurant_id` varchar(50) NOT NULL,
    `price` decimal(10,2) NOT NULL,
    `description` varchar(500),
    `status` BOOLEAN NOT NULL,
    `tags` varchar(50),
    `picture` varchar(100),
    PRIMARY KEY (`product_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  INSERT INTO `products` (`name`, `restaurant_id`,`price`,`description`,`tags`,`status`,`picture`) 
  VALUES ('first product', '1', 352,'this is the first product','#first', 1,'blank_product.png');
  INSERT INTO `products` (`name`, `restaurant_id`,`price`,`description`,`tags`,`status`,`picture`) 
  VALUES ('second product', '2', 452,'this is the second product','#second', 1,'blank_product.png');
  INSERT INTO `products` (`name`, `restaurant_id`,`price`,`description`,`tags`,`status`,`picture`) 
  VALUES ('third product', '3', 552,'this is the third product','#third', 1,'blank_product.png');

-- Create orders table
  CREATE TABLE IF NOT EXISTS `orders` (
    `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` int(50) NOT NULL,
    `user_id` int(50) NOT NULL,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `product_id` int(50) NOT NULL,
    `quantity` int(50) NOT NULL,
    `completed` BOOLEAN,
    `comments` varchar(100),
    PRIMARY KEY (`order_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  INSERT INTO `orders` (`restaurant_id`,`user_id`,`product_id`,`quantity`,`completed`,`comments`) 
  VALUES (1, 1 ,1,1,false,"without hot sauce");

  SELECT * FROM orders o INNER JOIN products p ON o.`restaurant_id` = p.`restaurant_id`;

-- Create cart table
  CREATE TABLE IF NOT EXISTS `user_cart` (
    `cart_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` int(50) NOT NULL,
    `user_id` int(50) NOT NULL,
    `product_id` int(50) NOT NULL,
    `quantity` int(50) NOT NULL,
    `comments` varchar(100),
    PRIMARY KEY (`cart_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  INSERT INTO `user_cart` (`restaurant_id`,`user_id`,`product_id`,`quantity`,`comments`) 
  VALUES (1, 1 ,1,1,"without hot sauce");


-- Create chat message table
  CREATE TABLE IF NOT EXISTS `messages` (
    `message_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` int(50) NOT NULL,
    `user_id` int(50) NOT NULL,
    `sender_user` BOOLEAN,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `messages` varchar(255) NOT NULL,
    PRIMARY KEY (`message_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  INSERT INTO `messages` (`restaurant_id`,`user_id`,`sender_user`,`messages`) 
  VALUES (1, 1 ,false,'TESTING');

