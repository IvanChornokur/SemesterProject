--liquibase formatted sql

--changeset mykyda:1
create table funds(
                      id bigserial primary key,
                      name text not null,
                      value float not null
);
--changeset mykyda:2
create table auctions(
                         id bigserial primary key,
                         name text not null,
                         description text ,
                         photo text not null,
                         author_name text not null,
                         contact text not null,
                         expire_time timestamp not null,
                         fund_id bigint not null references funds(id),
                         fund_stake float not null
);
-- changeset mykyda:3
create table bids(
                     id bigserial primary key,
                     bidder_name text not null,
                     amount float not null,
                     auction_id bigint not null references auctions(id)
);

