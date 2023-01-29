package com.example.api.src.orders.infrastructure.database.entitites;

import java.io.Serializable;
import lombok.Data;

@Data
public class OrderDB implements Serializable {

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
