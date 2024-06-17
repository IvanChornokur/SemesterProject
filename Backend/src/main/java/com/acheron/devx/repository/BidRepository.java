package com.acheron.devx.repository;

import com.acheron.devx.entity.Bid;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    @Query("SELECT b FROM Bid b where b.auction.id =?1")
    List<Bid> findAll(Long id, Sort sort);

    @Query("SELECT b FROM Bid b where b.auction.id =?1 order by b.amount desc limit 1")
    Optional<Bid> findCurrent(Long id);
}
