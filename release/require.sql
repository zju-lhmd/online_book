create database if not exists `online_book`;
use online_book;

drop table if exists `hotel`;
CREATE TABLE `hotel` (
                         `hotel_id` INT NOT NULL AUTO_INCREMENT,
                         `name` VARCHAR(63) NOT NULL,
                         `location` VARCHAR(63) NOT NULL,
                         `star_rating` INT NOT NULL,
                         `score_total` INT NOT NULL DEFAULT 0,
                         `score_count` INT NOT NULL DEFAULT 0,
                         `discount` DECIMAL(3,2) NOT NULL DEFAULT 1.0,
                         `description` VARCHAR(511) NOT NULL,
                         PRIMARY KEY (`hotel_id`),
                         UNIQUE (`name`, `location`, `star_rating`)
);

drop table if exists `room`;
CREATE TABLE `room` (
                        `hotel_id` INT NOT NULL,
                        `type` VARCHAR(63) NOT NULL,
                        `price` DECIMAL(8,2) NOT NULL,
                        `stock` INT NOT NULL DEFAULT 0,
                        PRIMARY KEY (`hotel_id`, `type`),
                        FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
);

drop table if exists `plane`;
CREATE TABLE `plane` (
                         `plane_id` INT NOT NULL AUTO_INCREMENT,
                         `company` VARCHAR(63) NOT NULL,
                         `start_time` DATETIME NOT NULL,
                         `end_time` DATETIME NOT NULL,
                         `start` VARCHAR(63) NOT NULL,
                         `end` VARCHAR(64) NOT NULL,
                         `price` DECIMAL(8,2) NOT NULL,
                         `discount` DECIMAL(3,2) NOT NULL DEFAULT 1.0,
                         PRIMARY KEY (`plane_id`),
                         UNIQUE KEY `unique_flight` (`company`, `start_time`, `end_time`, `start`, `end`)
);

drop table if exists `booking_history`;
create table booking_history (
                                 'user_id' int not null,
                                 'state' int not null default 0,
                                 'hotel_id' int not null default -1,
                                 'type' varchar(63),
                                 'plane_id' int not null default -1,
                                 foreign key('user_id') references 'user'('user_id'),
                                 foreign key('hotel_id') references 'hotel'('hotel_id'),
                                 foreign key('plane_id') references 'plane'('plane_id')
);

drop table if exists `comments`;
CREATE TABLE `comments` (
                            `user_id` INT NOT NULL,
                            `comment_time` DATETIME NOT NULL,
                            `hotel_id` INT NOT NULL DEFAULT -1,
                            `content` TEXT,
                            PRIMARY KEY (`user_id`, `comment_time`),
                            FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
                            FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
);

drop table if exists `user`;
CREATE TABLE `user` (
                        `user_id` INT NOT NULL AUTO_INCREMENT,
                        `username` VARCHAR(63) NOT NULL,
                        `password` VARCHAR(63) NOT NULL,
                        `email` VARCHAR(63) NOT NULL,
                        `phone` VARCHAR(63) NOT NULL,
                        `gender` VARCHAR(63) NOT NULL,
                        `birthday` DATE NOT NULL,
                        `address` VARCHAR(63) NOT NULL,
                        `credit` DECIMAL(8,2) NOT NULL DEFAULT 0.0,
                        `is_admin` INT NOT NULL DEFAULT 0,
                        PRIMARY KEY (`user_id`)
)