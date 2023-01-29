package com.example.api.rest.controllers.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;
import lombok.Data;

@Data
public class ListOrders {

  @NotEmpty
  private List<OrderDTO> orders;

}
