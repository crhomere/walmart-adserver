package com.rtb.server.models;

public class Bid {
  
    private String id;
    private String impId;
    private double price;
    private String adm;
  
    // Constructors
    public Bid() {}
  
    public Bid(String id, String impId, double price, String adm) {
      this.id = id;
      this.impId = impId;
      this.price = price;
      this.adm = adm;
    }
  
    // Getter and setter methods
    public String getId() {
      return id;
    }
  
    public void setId(String id) {
      this.id = id;
    }
  
    public String getImpId() {
      return impId;
    }
  
    public void setImpId(String impId) {
      this.impId = impId;
    }
  
    public double getPrice() {
      return price;
    }
  
    public void setPrice(double price) {
      this.price = price;
    }
  
    public String getAdm() {
      return adm;
    }
  
    public void setAdm(String adm) {
      this.adm = adm;
    }
  }  