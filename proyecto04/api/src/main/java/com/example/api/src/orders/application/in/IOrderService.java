package com.example.api.src.orders.application.in;

import com.example.api.src.orders.domain.Order;
import java.util.List;

public interface IOrderService {

  List<Order> findAllByCustomerId(Integer id, String state) throws InterruptedException;
}
