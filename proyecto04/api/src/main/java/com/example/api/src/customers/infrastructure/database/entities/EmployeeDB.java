package com.example.api.src.customers.infrastructure.database.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "employees")
public class EmployeeDB implements Serializable {

  @Id
  @Column(name = "employeeNumber", nullable = false)
  private Integer id;

  @Size(max = 50)
  @NotNull
  @Column(name = "lastName", nullable = false, length = 50)
  private String lastName;

  @Size(max = 50)
  @NotNull
  @Column(name = "firstName", nullable = false, length = 50)
  private String firstName;

  @Size(max = 10)
  @NotNull
  @Column(name = "extension", nullable = false, length = 10)
  private String extension;

  @Size(max = 100)
  @NotNull
  @Column(name = "email", nullable = false, length = 100)
  private String email;

  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "reportsTo")
  private EmployeeDB reportsTo;

  @Size(max = 50)
  @NotNull
  @Column(name = "jobTitle", nullable = false, length = 50)
  private String jobTitle;


  @NotNull
  @OneToOne(fetch = FetchType.EAGER, optional = false)
  @JoinColumn(name = "officeCode", nullable = false)
  private OfficeDB officeCode;


  /*
   * TENER CUIDADO!!
   *  @OneToMany VUELVE LENTA LA APP
   * */
    /*@OneToMany(mappedBy = "salesRepEmployeeNumber", fetch = FetchType.LAZY)
    private List<Customer> customers;*/
}