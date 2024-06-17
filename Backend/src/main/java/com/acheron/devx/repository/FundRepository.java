package com.acheron.devx.repository;

import com.acheron.devx.entity.Fund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundRepository extends JpaRepository<Fund, Long> {
}
