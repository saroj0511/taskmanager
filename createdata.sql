create database task_manager;
show databases;
use task_manager;

create table task( id int AUTO_INCREMENT NOT NULL, task varchar(200) NOT NULL, done char(1) DEFAULT 'N', group_name varchar(20), deadline date, PRIMARY KEY(id) );
show tables;


insert into task (task,group_name,deadline) values ('Health checkup','Health','2023-03-23');
insert into task (task,group_name,deadline) values ('Finish Project A','Work','2023-04-30');
insert into task (task,group_name,deadline) values ('Design App','Work','2023-06-15');
insert into task (task,group_name,deadline) values ('Read Atomic Habits','hobbies','2023-05-23');
insert into task (task,group_name,deadline) values ('Pay bills','reminder','2023-03-14');
select * from task;

