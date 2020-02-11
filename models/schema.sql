CREATE DATABASE user_calendar_db;

USE user_calendar_db;

CREATE TABLE users(
    user_id INTEGER NOT NULL AUTO_INCREMENT,
    user_fname VARCHAR(50) NOT NULL,
    user_lname VARCHAR(50) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_pw VARCHAR(50) NOT NULL,
    user_um VARCHAR(50) NOT NULL,
    PRIMARY KEY(user_id)
);

CREATE TABLE tasks (
    task_id INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    task_name VARCHAR(100) NOT NULL,
    task_day VARCHAR(50) NOT NULL,
    task_stime TIME NOT NULL,
    task_etime TIME NOT NULL,
    task_comment TEXT NOT NULL,
   PRIMARY KEY(task_id) 
 );

INSERT INTO tasks (user_id,task_name,task_day,task_stime,task_etime,task_comment)
VALUES (2,"bowling","monday","13:00:00","16:00:00","going bowling with the kids");

INSERT INTO tasks (user_id,task_name,task_day,task_stime,task_etime,task_comment)
VALUES (2,"golf","tuesday","13:00:00","16:00:00","going bowling with the kids");