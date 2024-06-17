package com.acheron.devx.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Builder
@Table(name = "auctions")
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private String photo;

    @Column(name = "author_name")
    private String authorName;
    private String contact;

    @Column(name = "expire_time")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime expireTime;

    @Column(name = "start_time")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime startTime;
    private Integer status;

    @OneToOne
    @JoinColumn(name = "fund_id")
    private Fund fund;

    @Column(name = "fund_stake")
    private Double fundStake;

    @Column(name = "start_value")
    private Long startValue;

    @OneToMany(mappedBy = "auction")
    @JsonIgnore
    private List<Bid> bidList;

    @OneToMany(mappedBy = "auction")
    @JsonIgnore
    private List<Message> messages;
}
