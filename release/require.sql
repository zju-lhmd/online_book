create database if not exists `online_book`;
use online_book;
drop table if exists `hotels`;
create table `hotel`
(
    `hotel_id`    int         not null auto_increment,
    `name`        varchar(63) not null,
    `location`    varchar(63) not null,
    `star_rating` int         not null,
    `score_total` int         not null default 0,
    `score_count` int         not null default 0,
    primary key(`hotel_id`),
    unique (`name`, `location`, `star_rating`)
);
