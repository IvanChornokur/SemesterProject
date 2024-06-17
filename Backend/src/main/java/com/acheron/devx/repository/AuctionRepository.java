package com.acheron.devx.repository;

import com.acheron.devx.entity.Auction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {

    @Query("select a from Auction a where (a.authorName like %?1% or a.description like %?1% or a.name like %?1%) and a.status=?2 or a.status=1")
    List<Auction> findAll(String key, Integer status, Pageable pageable);
}
