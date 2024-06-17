--liquibase formatted sql

--changeset acheron:1
create table users
(
    id       bigserial primary key,
    username text not null unique,
    email    text not null unique,
    password text not null,
    image    text,
    role     text not null default 'USER'
);



