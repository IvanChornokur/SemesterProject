--liquibase formatted sql

--changeset acheron:1
alter table auctions add column start_value bigint;



