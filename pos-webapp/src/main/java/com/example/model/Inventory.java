package com.example.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;

/**
 * Entity class for inventory items.
 * Maps to the 'inventory' table in the database.
 */
@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    private String id;
    private String name;
    @Min(value = 0, message = "Quantity must be non-negative")
    private int quantity;
    private double cost;
    private double price;
    private boolean isaddon;

    /**
     * Default constructor for JPA.
     */
    public Inventory() {}

    /**
     * Constructs a new Inventory instance.
     *
     * @param id       The unique identifier of the inventory item.
     * @param name     The name of the inventory item.
     * @param quantity The quantity of the inventory item in stock.
     * @param cost     The cost of the inventory item.
     * @param price    The selling price of the inventory item.
     * @param isaddon  Indicates whether the item is an add-on or not.
     */
    public Inventory(String id, String name, int quantity, double cost, double price, boolean isaddon) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
        this.price = price;
        this.isaddon = isaddon;
    }

    // Standard Getters and Setters

    /**
     * Gets the ID of the inventory item.
     *
     * @return The inventory item's ID.
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the ID of the inventory item.
     *
     * @param id The new ID of the inventory item.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Gets the name of the inventory item.
     *
     * @return The inventory item's name.
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the inventory item.
     *
     * @param name The new name of the inventory item.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the quantity of the inventory item.
     *
     * @return The inventory item's quantity.
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Sets the quantity of the inventory item.
     *
     * @param quantity The new quantity of the inventory item.
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    /**
     * Gets the cost of the inventory item.
     *
     * @return The inventory item's cost.
     */
    public double getCost() {
        return cost;
    }

    /**
     * Sets the cost of the inventory item.
     *
     * @param cost The new cost of the inventory item.
     */
    public void setCost(double cost) {
        this.cost = cost;
    }

    /**
     * Gets the price of the inventory item.
     *
     * @return The inventory item's price.
     */
    public double getPrice() {
        return price;
    }

    /**
     * Sets the price of the inventory item.
     *
     * @param price The new price of the inventory item.
     */
    public void setPrice(double price) {
        this.price = price;
    }

    /**
     * Checks if the inventory item is an add-on.
     *
     * @return True if the item is an add-on, false otherwise.
     */
    public boolean isIsaddon() {
        return isaddon;
    }

    /**
     * Sets whether the inventory item is an add-on.
     *
     * @param isaddon True if the item is an add-on, false otherwise.
     */
    public void setIsaddon(boolean isaddon) {
        this.isaddon = isaddon;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Inventory inventory = (Inventory) o;
        return id.equals(inventory.id);
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", quantity=" + quantity +
                ", cost=" + cost +
                ", price=" + price +
                ", isaddon=" + isaddon +
                '}';
    }
}
