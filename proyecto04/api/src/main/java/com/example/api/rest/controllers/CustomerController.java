package com.example.api.rest.controllers;

import com.example.api.rest.controllers.dto.CustomersDTO;
import com.example.api.rest.controllers.dto.ListOrders;
import com.example.api.rest.controllers.dto.OrderDTO;
import com.example.api.shared.CustomerMapper;
import com.example.api.shared.OrderMapper;
import com.example.api.src.customers.application.in.CustomerPageable;
import com.example.api.src.customers.application.in.ICustomerService;
import com.example.api.src.orders.application.in.IOrderService;
import com.example.api.src.orders.domain.Order;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/customers")
public class CustomerController {

  @Value("${pageable.number.max}")
  private int pageableNumberMax;

  private final IOrderService orderService;
  private final CustomerMapper customerMapper;
  private final OrderMapper orderMapper;

  private final ICustomerService customerService;


  public CustomerController(ICustomerService customerService, IOrderService orderService,
      CustomerMapper customerMapper, OrderMapper orderMapper) {
    this.customerService = customerService;
    this.orderService = orderService;
    this.customerMapper = customerMapper;
    this.orderMapper = orderMapper;
  }

  @GetMapping("/all")
  public ResponseEntity<CustomersDTO> getAll(@RequestParam(defaultValue = "0") int page)
      throws InterruptedException {
    Pageable pageable = PageRequest.of(page, pageableNumberMax);
    CustomerPageable customerPageable = customerService.findAll(pageable);
    CustomersDTO customersDTO = new CustomersDTO();
    customersDTO.setCustomers(
        customerMapper.customerListToCustomerDTOList(customerPageable.getCustomers()));
    customersDTO.setNextPage(customerPageable.getNextPage());
    return new ResponseEntity<>(customersDTO, HttpStatus.OK);
  }

  @GetMapping("/ordersByIdCustomer/{id}")
  public ResponseEntity<List<OrderDTO>> getAllOrdersByIdCustomer(
      @RequestParam(required = false) String state, @PathVariable Integer id)
      throws InterruptedException {
    List<Order> orders = orderService.findAllByCustomerId(id, state);
    return new ResponseEntity<>(orderMapper.orderstoOrdersDTO(orders), HttpStatus.OK);
  }

  @PostMapping(("/ordersCalculate"))
  public ResponseEntity<Integer> calculateTotalOrdersByCustomer(
      @RequestBody @Validated ListOrders ordersDtos) {
    double total = ordersDtos.getOrders().stream().mapToDouble(
            (o1) -> (Integer.parseInt(o1.quantityOrdered) * Double.parseDouble(o1.priceEach)))
        .sum();
    return new ResponseEntity<>((int) total, HttpStatus.OK);
  }

}
