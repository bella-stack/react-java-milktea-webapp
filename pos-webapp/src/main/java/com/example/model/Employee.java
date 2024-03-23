
package com.example.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Entity class for employees.
 * Maps to the 'employee' table in the database.
 */
@Entity
@Table(name = "employee")
public class Employee {

    @Id
    private String id;
    private String last_name;
    private String first_name;
    private String email;
    private String password;
    private Boolean ismanager;

    /**
     * Default constructor for JPA.
     */
    public Employee() {
    }

    /**
     * Constructs a new Employee instance.
     *
     * @param id         The unique identifier of the employee.
     * @param last_name  The last name of the employee.
     * @param first_name The first name of the employee.
     * @param email      The email address of the employee.
     * @param password   The password of the employee.
     * @param ismanager  Indicates whether the employee is a manager or not.
     */
    public Employee(String id, String last_name, String first_name, String email, String password, Boolean ismanager) {
        this.id = id;
        this.last_name = last_name;
        this.first_name = first_name;
        this.email = email;
        this.password = password;
        this.ismanager = ismanager;
    }

    // Getters and Setters

    /**
     * Gets the ID of the employee.
     *
     * @return The employee's ID.
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the ID of the employee.
     *
     * @param id The new ID of the employee.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Gets the last name of the employee.
     *
     * @return The employee's last name.
     */
    public String getLast_name() {
        return last_name;
    }

    /**
     * Sets the last name of the employee.
     *
     * @param last_name The new last name of the employee.
     */
    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    /**
     * Gets the first name of the employee.
     *
     * @return The employee's first name.
     */
    public String getFirst_name() {
        return first_name;
    }

    /**
     * Sets the first name of the employee.
     *
     * @param first_name The new first name of the employee.
     */
    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    /**
     * Gets the email address of the employee.
     *
     * @return The employee's email address.
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email address of the employee.
     *
     * @param email The new email address of the employee.
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the password of the employee.
     *
     * @return The employee's password.
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the employee.
     *
     * @param password The new password of the employee.
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Checks if the employee is a manager.
     *
     * @return True if the employee is a manager, false otherwise.
     */
    public Boolean getIsmanager() {
        return ismanager;
    }

    /**
     * Sets whether the employee is a manager.
     *
     * @param ismanager True if the employee is a manager, false otherwise.
     */
    public void setIsmanager(Boolean ismanager) {
        this.ismanager = ismanager;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id='" + id + '\'' +
                ", last_name='" + last_name + '\'' +
                ", first_name=" + first_name + '\'' +
                ", email=" + email + '\'' +
                ", password=" + password + '\'' +
                ", ismanager=" + ismanager +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Employee employee = (Employee) o;
        return id.equals(employee.id);
    }
}
