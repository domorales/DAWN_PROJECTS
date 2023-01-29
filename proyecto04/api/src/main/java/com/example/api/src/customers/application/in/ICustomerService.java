package com.example.api.src.customers.application.in;

import org.springframework.data.domain.Pageable;

public interface ICustomerService {

  CustomerPageable findAll(Pageable pageable);


}
