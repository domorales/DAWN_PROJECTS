package com.example.api.rest.controllers.dto;

import java.io.Serializable;
import lombok.Data;

@Data
public class OfficeDTO implements Serializable {

  private String id;
  private String city;
  private String phone;
  private String addressLine1;
  private String addressLine2;
  private String state;
  private String country;
  private String postalCode;
  private String territory;
}
