package com.example.api.src.orders.domain;

import java.io.Serializable;
import lombok.Data;

@Data
public class Order implements Serializable {

  private String orderNumber;
  private String orderDate;
  private String requiredDate;
  private String shippedDate;
  private String status;
  private String comments;
  private String customerNumber;
  private String productCode;
  private String quantityOrdered;
  private String priceEach;
  private String orderLineNumber;
  private String productName;
  private String productLine;
  private String productScale;
  private String productVendor;
  private String productDescription;
  private String quantityInStock;
  private String buyPrice;
  private String msrp;
  private String textDescription;
  private String htmlDescription;
}
