package com.example.api.rest.controllers.dto;

import java.io.Serializable;
import java.math.BigDecimal;
import lombok.Data;

@Data
public class CustomerDTO implements Serializable {

  private Integer id;
  private String customerName;
  private String contactLastName;
  private String contactFirstName;
  private String phone;
  private String addressLine1;
  private String addressLine2;
  private String city;
  private String state;
  private String postalCode;
  private String country;
  private BigDecimal creditLimit;
  private Integer salesRepEmployeeNumber;
}
