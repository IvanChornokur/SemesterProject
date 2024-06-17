package com.acheron.devx.controller;

import com.acheron.devx.dto.AuctionSaveDto;
import com.acheron.devx.entity.Auction;
import com.acheron.devx.entity.Bid;
import com.acheron.devx.entity.Fund;
import com.acheron.devx.entity.Message;
import com.acheron.devx.service.AuctionService;
import com.acheron.devx.service.BidService;
import com.acheron.devx.service.FundService;
import com.acheron.devx.service.MessageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2")
@CrossOrigin(origins = "http://localhost:5173/")
public class MainController {
    private final AuctionService auctionService;
    private final FundService fundService;
    private final MessageService messageService;
    private final BidService bidService;

    //get

    @GetMapping("/allAuctions")
    @CrossOrigin(origins = { "http://charitx.surge.sh/", "http://charitx1.surge.sh/","http://localhost:5173/"})
    public List<Auction> getAllAuctions(@RequestParam(required = false) String key, @RequestParam(required = false) Integer size, @RequestParam(required = false) Integer status, @RequestParam(required = false) String sort) {
        return auctionService.findAll(key, size, status, sort);
    }

    @GetMapping("/currentBid/{id}")
    @CrossOrigin(origins = { "http://charitx.surge.sh/", "http://charitx1.surge.sh/","http://localhost:5173/"})
    public Bid getCurrentBid(@PathVariable Long id) {
        return bidService.findCurrent(id).orElse(null);
    }

    @GetMapping("/allBids/{id}")
    @CrossOrigin(origins = { "http://charitx.surge.sh/", "http://charitx1.surge.sh/","http://localhost:5173/"})
    public List<Bid> findAll(@PathVariable Long id) {
        return bidService.findAll(id);
    }

    @GetMapping("/funds")
    @CrossOrigin(origins = { "http://charitx.surge.sh/", "http://charitx1.surge.sh/","http://localhost:5173/"})
    public List<Fund> getAllFunds() {
        return fundService.findAll();
    }

    @GetMapping("/messages/{id}")
    @CrossOrigin(origins = { "http://charitx.surge.sh/", "http://charitx1.surge.sh/","http://localhost:5173/"})
    public List<Message> getAllMessages(@PathVariable Long id) {
        return messageService.findAll(id);
    }

    @GetMapping("/auction/{id}")
    @CrossOrigin(origins = { "http://charitx.surge.sh/", "http://charitx1.surge.sh/","http://localhost:5173/"})
    public ResponseEntity<Auction> findAuction(@PathVariable Long id) {
        return auctionService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    //post
    @CrossOrigin(origins = { "http://charitx.surge.sh/", "http://charitx1.surge.sh/","http://localhost:5173/"})
    @PostMapping("/saveAuction")
    public ResponseEntity<Auction> saveAuction(AuctionSaveDto dto1,HttpServletRequest request, @RequestParam MultipartFile file) {
        System.out.println(dto1);
//        AuctionSaveDto dto = new AuctionSaveDto(
//                request.getHeader("name"),
//                request.getHeader("desc"),
//                request.getHeader("authorName"),
//                request.getHeader("contact"),
//                Integer.valueOf(request.getHeader("expirationTime")),
//                Long.valueOf(request.getHeader("fund")),
//                Double.valueOf(request.getHeader("fundPercentage")),
//                Long.valueOf(request.getHeader("price"))
//        );
        try{
            Auction save = auctionService.save(dto1, file);
            return ResponseEntity.ok(save);
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
