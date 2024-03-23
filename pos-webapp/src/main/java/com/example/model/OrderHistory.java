
package com.example.model;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Entity class for order history records.
 * Maps to the 'orderhistory' table in the database.
 */
@Entity
@Table(name = "orderhistory")
public class OrderHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "employee_id")
    private String employeeId;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @Column(name = "created_time")
    private LocalTime createdTime;

    @Column(name = "sale")
    private Double sale;

    /**
     * Default constructor for JPA.
     */
    public OrderHistory() {
    }

    /**
     * Constructs a new OrderHistory instance.
     *
     * @param id          The unique identifier of the order history record.
     * @param employeeId  The ID of the employee associated with the order.
     * @param createdDate The date when the order was created.
     * @param createdTime The time when the order was created.
     * @param sale        The sale amount associated with the order.
     */
    public OrderHistory(int id, String employeeId, LocalDate createdDate, LocalTime createdTime, Double sale) {
        this.id = id;
        this.employeeId = employeeId;
        this.createdDate = createdDate;
        this.createdTime = createdTime;
        this.sale = sale;
    }

    /**
     * Gets the ID of the order history record.
     *
     * @return id The new ID of the order history record.
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the ID of the order history record.
     *
     * @param id The new ID of the order history record.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the employee ID associated with the order.
     *
     * @return The employee ID.
     */
    public String getEmployee_Id() {
        return employeeId;
    }

    /**
     * Sets the employee ID associated with the order.
     *
     * @param employeeId The new employee ID.
     */
    public void setEmployee_Id(String employeeId) {
        this.employeeId = employeeId;
    }

    /**
     * Gets the date when the order was created.
     *
     * @return The order's creation date.
     */
    public LocalDate getCreated_Date() {
        return createdDate;
    }

    /**
     * Sets the date when the order was created.
     *
     * @param createdDate The new creation date of the order.
     */
    public void setCreated_Date(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Gets the time when the order was created.
     *
     * @return The order's creation time.
     */
    public LocalTime getCreated_Time() {
        return createdTime;
    }

    /**
     * Sets the time when the order was created.
     *
     * @param createdTime The new creation time of the order.
     */
    public void setCreated_Time(LocalTime createdTime) {
        this.createdTime = createdTime;
    }

    /**
     * Gets the sale amount associated with the order.
     *
     * @return The sale amount.
     */
    public Double getSale() {
        return sale;
    }

    /**
     * Sets the sale amount associated with the order.
     *
     * @param sale The new sale amount.
     */
    public void setSale(Double sale) {
        this.sale = sale;
    }

    /**
     * String of occurrence of order history
     *
     * @return String of order history information for an order
     */
    @Override
    public String toString() {
        return "OrderHistory{" +
                "id='" + id +
                ", employee_id='" + employeeId + '\'' +
                ", created_date=" + createdDate + '\'' +
                ", created_time=" + createdTime + '\'' +
                ", sale=" + sale +
                '}';
    }

    /**
     * Checks if order history is equal to another order history
     *
     * @param o The object to compare.
     * @return boolean that checks if the order history is equal to the object.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        OrderHistory orderhistory = (OrderHistory) o;
        return id == (orderhistory.id);
    }
}
