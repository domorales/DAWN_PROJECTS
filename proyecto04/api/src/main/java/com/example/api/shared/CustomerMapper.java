package com.example.api.shared;

import com.example.api.rest.controllers.dto.CustomerDTO;
import com.example.api.rest.controllers.dto.EmployeeDTO;
import com.example.api.rest.controllers.dto.OfficeDTO;
import com.example.api.src.customers.domain.Customer;
import com.example.api.src.customers.domain.Employee;
import com.example.api.src.customers.domain.Office;
import com.example.api.src.customers.infrastructure.database.entities.CustomerDB;
import com.example.api.src.customers.infrastructure.database.entities.EmployeeDB;
import com.example.api.src.customers.infrastructure.database.entities.OfficeDB;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring")
public interface CustomerMapper {

  //CUSTOMER
  @Mappings({
      @Mapping(target = "salesRepEmployeeNumber", source = "salesRepEmployeeNumber.id")
  })
  CustomerDTO customerToCustomerDTO(Customer customer);

  Customer customerDBToCustomer(CustomerDB customerDB);

  CustomerDB customerToCustomerDB(Customer customer);

  //OFFICE
  OfficeDTO officeToOfficeDTO(Office office);

  Office officeDBToOfficeDTO(OfficeDB officeDB);

  OfficeDB officeToOfficeDb(Office office);

  //EMPLOYEE
  @Mappings({
      @Mapping(target = "officeCode", source = "officeCode.id"),
      @Mapping(target = "reportsTo.officeCode", source = "reportsTo.officeCode.id")
  })
  EmployeeDTO employeeToEmployeeDTO(Employee employee);

  Employee employeeDBToEmployee(EmployeeDB employeeDB);

  EmployeeDB employeeToEmployeeDB(Employee employee);


  default List<CustomerDTO> customerListToCustomerDTOList(List<Customer> customers) {
    return customers.stream().map(this::customerToCustomerDTO).collect(Collectors.toList());
  }

  default List<Customer> customerDBListToCustomerList(List<CustomerDB> customersDB) {
    return customersDB.stream().map(this::customerDBToCustomer).collect(Collectors.toList());
  }

}
