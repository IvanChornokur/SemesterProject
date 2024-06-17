package com.acheron.devx.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AuctionSaveDto {
    private String name;
    private String description;
    private String authorName;
    private String contact;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Integer expirationTime;
    private Long fund;
    private Double fundPercentage;
    private Long price;
}