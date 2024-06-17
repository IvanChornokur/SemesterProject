package com.acheron.devx.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "bids")
@Builder
public class Bid {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bidder_name")
    private String bidderName;
    private Double amount;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "auction_id")
    private Auction auction;
}
