package com.rtb.server.engine;


import com.google.openrtb.OpenRtb;
import com.google.openrtb.OpenRtb.BidRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DSPEngine {
    
    @PostMapping("/api/wrapper")
    public ResponseEntity<String> wrapOpenRtbRequest(@RequestBody BidRequest bidRequest) {
        // For demonstration purposes, let's just return the JSON payload as a string
        String wrappedRequest = bidRequest.toString();
        
        // Return the wrapped request as a response
        return new ResponseEntity<>(wrappedRequest, HttpStatus.OK);
    }
}

