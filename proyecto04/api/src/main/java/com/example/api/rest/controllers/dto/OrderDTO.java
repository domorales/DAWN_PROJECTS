package com.example.api.rest.controllers.dto;

import lombok.Data;

@Data
public class OrderDTO {

  public String orderNumber;
  public String orderDate;
  public String requiredDate;
  public String shippedDate;
  public String status;
  public String comments;
  public String customerNumber;
  public String productCode;
  public String quantityOrdered;
  public String priceEach;
  public String orderLineNumber;
  public String productName;
  public String productLine;
  public String productScale;
  public String productVendor;
  public String productDescription;
  public String quantityInStock;
  public String buyPrice;
  public String msrp;
  public String textDescription;
  public String htmlDescription;
}
