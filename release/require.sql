create database if not exists `online_book`;
use online_book;

drop table if exists `goods`;
drop table if exists `booking_history`;
drop table if exists `plane`;
drop table if exists `room`;
drop table if exists `comments`;
drop table if exists `hotel`;
drop table if exists `user`;

CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(63) NOT NULL,
    PRIMARY KEY (`user_id`)
);

CREATE TABLE `hotel` (
    `hotel_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(63) NOT NULL,
    `location` VARCHAR(63) NOT NULL,
    `phone` VARCHAR(63) NOT NULL,
    `star_rating` INT NOT NULL,
    `score_total` INT NOT NULL DEFAULT 0,
    `score_count` INT NOT NULL DEFAULT 0,
    `discount` INT NOT NULL DEFAULT 100,
    `description` VARCHAR(511) NOT NULL,
    PRIMARY KEY (`hotel_id`),
    UNIQUE (`name`, `location`, `star_rating`)
);

CREATE TABLE `room` (
    `hotel_id` INT NOT NULL,
    `type` VARCHAR(63) NOT NULL,
    `price` INT NOT NULL,
    `stock` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`hotel_id`, `type`),
    FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
);

CREATE TABLE `plane` (
    `plane_id` INT NOT NULL AUTO_INCREMENT,
    `company` VARCHAR(63) NOT NULL,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,
    `start` VARCHAR(63) NOT NULL,
    `end` VARCHAR(64) NOT NULL,
    `price` INT NOT NULL,
    `stock` INT NOT NULL DEFAULT 0,
    `discount` INT NOT NULL DEFAULT 100,
    PRIMARY KEY (`plane_id`),
    UNIQUE KEY `unique_flight` (`company`, `start_time`, `end_time`, `start`, `end`)
);

create table booking_history (
    user_id int not null,
    order_id varchar(20) not null,
    state int not null default 0,
    has_score int not null default 0,
    hotel_id int not null default -1,
    type varchar(63),
    plane_id int not null default -1,
    `start_time` DATETIME NOT NULL,
    `end_time` DATETIME NOT NULL,
    price int not null,
    PRIMARY KEY (`order_id`),
    foreign key(user_id) references `user`(user_id),
    foreign key(hotel_id) references hotel(hotel_id),
    foreign key(plane_id) references plane(plane_id)
);

CREATE TABLE `comments` (
    `comment_id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `comment_time` DATETIME NOT NULL,
    `hotel_id` INT NOT NULL DEFAULT -1,
    `content` TEXT,
    PRIMARY KEY (`comment_id`,`user_id`, `comment_time`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
    FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
);

CREATE TABLE `goods` (
    `user_id` INT NOT NULL,
    `good_id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(63) NOT NULL,
    `location` VARCHAR(63) NOT NULL,
    `category` VARCHAR(63) NOT NULL,
    `price` INT NOT NULL,
    `discount` INT NOT NULL DEFAULT 100,
    `stock` INT NOT NULL DEFAULT 0,
    `sale` INT NOT NULL DEFAULT 0,
    `description` VARCHAR(511) NOT NULL,
    PRIMARY KEY (`good_id`),
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
);

create table `order_id`(
    `order_id` VARCHAR(20),
    PRIMARY KEY(`order_id`)
);

INSERT INTO `plane` VALUES (
    -1, 'UNDEFINED', '2023-01-01 00:00:00', '2023-01-01 00:00:00', 'UNDEFINED', 'UNDEFINED', -1, -1, 100
);

INSERT INTO `hotel` VALUES (
    -1, 'UNDEFINED', 'UNDEFINED', 'UNDEFINED', -1, -1, -1, -1, 'UNDEFINED'
);