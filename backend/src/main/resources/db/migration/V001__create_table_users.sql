CREATE TABLE IF NOT EXISTS users(
    id varchar(256) primary key,
    name varchar(256) not null,
    email varchar(256) not null,
    password varchar(256) not null
);
