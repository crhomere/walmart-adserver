package com.rtb.server.models;

import org.springframework.stereotype.Component;

@Component
public class Site {
    private String id;
    private String domain;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }
}
