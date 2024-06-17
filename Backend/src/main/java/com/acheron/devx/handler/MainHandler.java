package com.acheron.devx.handler;

import com.acheron.devx.dto.BidSaveDto;
import com.acheron.devx.dto.BidSendDto;
import com.acheron.devx.dto.MessageSaveDto;
import com.acheron.devx.entity.Bid;
import com.acheron.devx.entity.Message;
import com.acheron.devx.service.AuctionService;
import com.acheron.devx.service.BidService;
import com.acheron.devx.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MainHandler {
    private final MessageService messageService;
    private final BidService bidService;
    private final AuctionService auctionService;

    @MessageMapping("/app/bid/{id}")
    @SendTo("/topic/bid/{id}")
    public BidSendDto bidHandler(@Payload BidSaveDto dto, @DestinationVariable Long id) {
        Bid bid = bidService.saveBid(dto, id);
        System.out.println("ws: bid: " + dto);
        return new BidSendDto(bid.getBidderName(), bid.getAmount(), auctionService.findById(id).get().getStatus());
    }

    @MessageMapping("/app/messages/{id}")
    @SendTo("/topic/messages/{id}")
    public Message messageHandler(@Payload MessageSaveDto str, @DestinationVariable Long id) {
        System.out.println("ws: auction" + str);
        return messageService.save(str, id);
    }

}