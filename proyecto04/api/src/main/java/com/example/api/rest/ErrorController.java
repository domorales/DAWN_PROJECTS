package com.example.api.rest;

import com.example.api.rest.controllers.dto.ApiErrorDTO;
import java.time.Instant;
import java.util.List;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ErrorController extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    String path = ((ServletWebRequest) request).getRequest().getRequestURI().toString();
    ApiErrorDTO apiErrorDTO = ApiErrorDTO.builder().messages(List.of("Contenido no existe"))
        .status(HttpStatus.NOT_FOUND).instant(Instant.now()).path(path).build();
    return new ResponseEntity<>(apiErrorDTO, HttpStatus.NOT_FOUND);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    String path = ((ServletWebRequest) request).getRequest().getRequestURI();
    List<String> messages = ex.getBindingResult().getFieldErrors().stream()
        .map(fieldError -> fieldError.getField() + ":" + fieldError.getDefaultMessage()).toList();
    ApiErrorDTO apiErrorDTO = ApiErrorDTO.builder().messages(messages).status(HttpStatus.NOT_FOUND)
        .instant(Instant.now()).path(path).build();
    return new ResponseEntity<>(apiErrorDTO, HttpStatus.BAD_REQUEST);

  }
}
