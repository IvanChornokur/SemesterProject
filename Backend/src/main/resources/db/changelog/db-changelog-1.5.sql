--liquibase formatted sql

--changeset acheron:1
alter table message add column color text;



