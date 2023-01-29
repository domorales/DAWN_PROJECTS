package com.example.api.shared;

import com.example.api.rest.controllers.dto.OrderDTO;
import com.example.api.src.orders.domain.Order;
import com.example.api.src.orders.infrastructure.database.entitites.OrderDB;
import java.util.List;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {

  OrderDTO orderToOrderDTO(Order order);

  OrderDB orderToOrderDB(Order order);

  Order orderDBToOrder(OrderDB orderDB);

  default List<Order> ordersDBtoOrders(List<OrderDB> ordersDB) {
    return ordersDB.stream().map(this::orderDBToOrder).collect(Collectors.toList());
  }

  default List<OrderDTO> orderstoOrdersDTO(List<Order> orders) {
    return orders.stream().map(this::orderToOrderDTO).collect(Collectors.toList());
  }

}
