package com.example.api.rest.controllers.dto;

import java.io.Serializable;
import java.util.List;
import lombok.Data;

@Data
public class CustomersDTO implements Serializable {

  List<CustomerDTO> customers;
  Integer nextPage;
}
