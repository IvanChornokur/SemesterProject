package com.acheron.devx.repository;

import com.acheron.devx.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Long> {
    @Query(value = "select m from Message m where m.auction.id=?1")
    List<Message> findAll(Long id);
}
