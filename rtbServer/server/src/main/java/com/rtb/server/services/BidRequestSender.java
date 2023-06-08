package com.rtb.server.services;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import com.rtb.server.models.BidRequest;
import com.rtb.server.models.BidResponse;

@Component
public class BidRequestSender {

    private final RestTemplate restTemplate;

    public BidRequestSender() {
        this.restTemplate = new RestTemplate();
    }

    public BidResponse sendBidRequest(@RequestBody BidRequest bidRequest) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<BidRequest> requestEntity = new HttpEntity<>(bidRequest, headers);

        ResponseEntity<BidResponse> responseEntity = restTemplate.exchange(
                "https://api.example.com/openrtb",
                HttpMethod.POST,
                requestEntity,
                BidResponse.class
        );

        return responseEntity.getBody();
    }
}
