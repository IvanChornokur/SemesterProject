--liquibase formatted sql

--changeset mykyda:1
create table message (
    id bigserial primary key,
    message text not null,
    sender text not null,
    auction_id bigint not null references auctions(id)
);


