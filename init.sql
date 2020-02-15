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
    PRIMARY KEY (`restaurant_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  INSERT INTO `restaurant_accounts` (`full_name`,`username`, `email`,`password`) 
  VALUES ('first restaurant', 'first username' , 'first@resto.com', 'first-pass');

-- Create products table
  CREATE TABLE IF NOT EXISTS `products`(
    `product_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `restaurant_id` varchar(50) NOT NULL,
    `price` decimal(10,2) NOT NULL,
    `description` varchar(500),
    `status` BOOLEAN NOT NULL,
    `tags` varchar(50),
    `picture` varchar(50),
    PRIMARY KEY (`product_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  INSERT INTO `products` (`name`, `restaurant_id`,`price`,`description`,`tags`,`status`) 
  VALUES ('first product', '1', 352,'this is the first product','#first', 0);
  INSERT INTO `products` (`name`, `restaurant_id`,`price`,`description`,`tags`,`status`) 
  VALUES ('second product', '2', 452,'this is the second product','#second', 0);
  INSERT INTO `products` (`name`, `restaurant_id`,`price`,`description`,`tags`,`status`) 
  VALUES ('third product', '3', 552,'this is the third product','#third', 0);

-- Create orders table
  CREATE TABLE IF NOT EXISTS `orders` (
    `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `restaurant_id` int(50) NOT NULL,
    `user_id` int(50) NOT NULL,
    `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `product_id` int(50) NOT NULL,
    `quantity` int(50) NOT NULL,
    `completed` BOOLEAN,
    PRIMARY KEY (`order_id`)
  )ENGINE=InnoDB DEFAULT CHARSET=utf8;
  INSERT INTO `orders` (`restaurant_id`,`user_id`,`product_id`,`quantity`,`completed`) 
  VALUES (1, 1 ,1,1,false);

  SELECT * FROM orders o INNER JOIN products p ON o.`restaurant_id` = p.`restaurant_id`

