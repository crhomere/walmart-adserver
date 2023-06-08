package com.rtb.server.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.rtb.server.models.BidRequest;
import com.rtb.server.models.BidResponse;
import com.rtb.server.services.BidRequestSender;

@Controller
public class BidController {

    private final BidRequestSender bidRequestSender;

    public BidController(BidRequestSender bidRequestSender) {
        this.bidRequestSender = bidRequestSender;
    }

    @PostMapping("/bid")
    public ResponseEntity<BidResponse> sendBidRequest(@RequestBody BidRequest bidRequest) {
        try {
            BidResponse bidResponse = bidRequestSender.sendBidRequest(bidRequest);
            return ResponseEntity.ok(bidResponse);
        } catch (Exception e) {
            // Handle any exceptions that occur during the API request
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
