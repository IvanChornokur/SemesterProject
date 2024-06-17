--liquibase formatted sql

--changeset acheron:1
alter table auctions add column status int not null;



