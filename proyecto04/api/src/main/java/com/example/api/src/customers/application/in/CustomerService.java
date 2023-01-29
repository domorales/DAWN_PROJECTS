package com.example.api.src.customers.application.in;

import com.example.api.shared.CustomerMapper;
import com.example.api.src.customers.application.out.ICustomerRepository;
import com.example.api.src.customers.infrastructure.database.entities.CustomerDB;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService implements ICustomerService {

  private final ICustomerRepository customerRepository;
  @Autowired
  private CustomerMapper customerMapper;

  public CustomerService(ICustomerRepository customerRepository) {
    this.customerRepository = customerRepository;
  }

  @Override
  @Transactional(readOnly = true)
  public CustomerPageable findAll(Pageable pageable) {
    CustomerPageable customerPageable = new CustomerPageable();
    int actualPage = pageable.getPageNumber();
    Page<CustomerDB> page = customerRepository.findAll(pageable);
    int totalPages = page.getTotalPages();
    customerPageable.setNextPage(null);
    if (actualPage < totalPages) {
      customerPageable.setNextPage(actualPage + 1);
    }
    customerPageable.setCustomers(customerMapper.customerDBListToCustomerList(page.toList()));
    return customerPageable;
  }
}
