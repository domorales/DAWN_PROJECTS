package com.example.api.src.orders.application.in;

import com.example.api.src.orders.application.out.IOrderRepository;
import com.example.api.src.orders.domain.Order;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class OrderService implements IOrderService {

  private final IOrderRepository orderRepository;

  public OrderService(IOrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @Override
  public List<Order> findAllByCustomerId(Integer id, String state) throws InterruptedException {
    if (Objects.nonNull(state)) {
      return orderRepository.findAllByCustomerId(id, state).stream()
          .filter(order -> order.getStatus().equalsIgnoreCase(state)).collect(Collectors.toList());
    }
    return orderRepository.findAllByCustomerId(id, state);
  }
}
