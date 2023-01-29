package com.example.api.rest.controllers.dto;

import java.time.Instant;
import java.util.List;
import lombok.Builder;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@Builder
public class ApiErrorDTO {
  private HttpStatus status;
  private String path;
  private List<String> messages;
  private Instant instant;
}
