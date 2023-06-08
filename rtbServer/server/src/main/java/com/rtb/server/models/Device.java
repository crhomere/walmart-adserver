package com.rtb.server.models;

import org.springframework.stereotype.Component;

@Component
public class Device {
    private String userAgent;
    private String ipAddress;

    public String getuserAgent() {
        return userAgent;
    }

    public void setuserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getipAddress() {
        return ipAddress;
    }

    public void setipAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

}

