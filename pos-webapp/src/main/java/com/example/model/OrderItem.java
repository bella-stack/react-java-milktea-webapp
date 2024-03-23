
package com.example.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Entity class for order items.
 * Maps to the 'orderitem' table in the database.
 */
@Entity
@Table(name = "orderitem")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "order_id")
    private int orderId;

    @Column(name = "product_id")
    private String productId;

    @Column(name = "sugar_level")
    private Double sugarLevel;

    @Column(name = "ice_level")
    private Double iceLevel;

    /**
     * Default constructor for JPA.
     */
    public OrderItem() {
    }

    /**
     * Constructs a new OrderItem instance.
     *
     * @param id         The unique identifier of the order item.
     * @param orderId    The ID of the order associated with the item.
     * @param productId  The ID of the product associated with the item.
     * @param sugarLevel The sugar level selected for the item.
     * @param iceLevel   The ice level selected for the item.
     */
    public OrderItem(int id, int orderId, String productId, Double sugarLevel, Double iceLevel) {
        this.id = id;
        this.orderId = orderId;
        this.productId = productId;
        this.sugarLevel = sugarLevel;
        this.iceLevel = iceLevel;
    }

    // Getters and Setters

    /**
     * Gets the ID of the order item.
     *
     * @return The order item's ID.
     */
    public int getId() {
        return id;
    }

    /**
     * Sets the ID of the order item.
     *
     * @param id The new ID of the order item.
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * Gets the ID of the order associated with the item.
     *
     * @return The order's ID.
     */
    public int getOrder_Id() {
        return orderId;
    }

    /**
     * Sets the ID of the order associated with the item.
     *
     * @param orderId The new order ID.
     */
    public void setOrder_Id(int orderId) {
        this.orderId = orderId;
    }

    /**
     * Gets the ID of the product associated with the item.
     *
     * @return The product's ID.
     */
    public String getProduct_Id() {
        return productId;
    }

    /**
     * Sets the ID of the product associated with the item.
     *
     * @param productId The new product ID.
     */
    public void setProduct_Id(String productId) {
        this.productId = productId;
    }

    /**
     * Gets the sugar level selected for the item.
     *
     * @return The selected sugar level.
     */
    public Double getSugar_Level() {
        return sugarLevel;
    }

    /**
     * Sets the sugar level selected for the item.
     *
     * @param sugarLevel The new sugar level.
     */
    public void setSugar_Level(Double sugarLevel) {
        this.sugarLevel = sugarLevel;
    }

    /**
     * Gets the ice level selected for the item.
     *
     * @return The selected ice level.
     */
    public Double getIce_Level() {
        return iceLevel;
    }

    /**
     * Sets the ice level selected for the item.
     *
     * @param iceLevel The new ice level.
     */
    public void setIce_Level(Double iceLevel) {
        this.iceLevel = iceLevel;
    }

    /**
     * String of occurrence of order item
     *
     * @return String of order item information for an order
     */
    @Override
    public String toString() {
        return "OrderItem{" +
                "id='" + id +
                ", order_id='" + orderId + '\'' +
                ", product_id=" + productId + '\'' +
                ", sugar_level=" + sugarLevel + '\'' +
                ", ice_level=" + iceLevel +
                '}';
    }

    /**
     * Checks if order item is equal to another order item
     *
     * @param o The object to compare.
     * @return boolean that checks if the order item is equal to the object.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        OrderItem orderitem = (OrderItem) o;
        return id == (orderitem.id);
    }
}
