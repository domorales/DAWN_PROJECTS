package com.example.api.src.customers.domain;

import java.util.List;
import lombok.Data;

@Data
public class Employee {

  private Integer id;
  private String lastName;
  private String firstName;
  private String extension;
  private String email;
  private Employee reportsTo;
  private String jobTitle;
  private Office officeCode;
  private List<Customer> customers;
}
