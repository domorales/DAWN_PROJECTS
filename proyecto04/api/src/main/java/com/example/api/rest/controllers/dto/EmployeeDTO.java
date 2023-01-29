package com.example.api.rest.controllers.dto;

import java.io.Serializable;
import java.util.List;
import lombok.Data;

@Data
public class EmployeeDTO implements Serializable {

  private Integer id;
  private String lastName;
  private String firstName;
  private String extension;
  private String email;
  private EmployeeDTO reportsTo;
  private String jobTitle;
  private Integer officeCode;
  private List<CustomerDTO> customers;
}
