package com.example.api.src.customers.application.in;

import com.example.api.src.customers.domain.Customer;
import java.util.List;
import lombok.Data;

@Data
public class CustomerPageable {

  Integer nextPage;
  List<Customer> customers;
}
