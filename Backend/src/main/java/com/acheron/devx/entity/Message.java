package com.acheron.devx.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Builder
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;
    private String sender;
    private String color;

    @ManyToOne
    @JoinColumn(name = "auction_id")
    @JsonIgnore
    private Auction auction;

}
