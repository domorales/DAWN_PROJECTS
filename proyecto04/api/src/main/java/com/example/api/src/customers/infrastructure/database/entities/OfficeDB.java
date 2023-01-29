package com.example.api.src.customers.infrastructure.database.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "offices")
public class OfficeDB implements Serializable {

  @Id
  @Size(max = 10)
  @Column(name = "officeCode", nullable = false, length = 10)
  private String id;

  @Size(max = 50)
  @NotNull
  @Column(name = "city", nullable = false, length = 50)
  private String city;

  @Size(max = 50)
  @NotNull
  @Column(name = "phone", nullable = false, length = 50)
  private String phone;

  @Size(max = 50)
  @NotNull
  @Column(name = "addressLine1", nullable = false, length = 50)
  private String addressLine1;

  @Size(max = 50)
  @Column(name = "addressLine2", length = 50)
  private String addressLine2;

  @Size(max = 50)
  @Column(name = "state", length = 50)
  private String state;

  @Size(max = 50)
  @NotNull
  @Column(name = "country", nullable = false, length = 50)
  private String country;

  @Size(max = 15)
  @NotNull
  @Column(name = "postalCode", nullable = false, length = 15)
  private String postalCode;

  @Size(max = 10)
  @NotNull
  @Column(name = "territory", nullable = false, length = 10)
  private String territory;


}