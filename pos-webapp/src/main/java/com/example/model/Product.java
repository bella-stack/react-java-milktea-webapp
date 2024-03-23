// com/example/model/Inventory.java
package com.example.model;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Product class
 */
@Entity
@Table(name = "product")
public class Product {

    @Id
    private String id;
    private String name;
    private double price;

    /**
     * Default constructor for JPA.
     */
    public Product() {
    }

    /**
     * Parametrized product constructor :)
     * @param id The unique identifier of the product.
     * @param name The name of the product.
     * @param price The price of the product.
     * 
     */
    public Product(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    // Standard Getters and Setters
    /**
     * gets the ID of the product.
     *
     * @return  The new product id.
     */
    public String getId() {
        return id;
    }

    /**
     * Sets the ID of the ingredient.
     *
     * @param id The new ingredient id.
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * Gets the Name.
     *
     * @return name.
     */
    public String getName() {
        return name;
    }

     /**
     * Sets the name.
     *
     * @param name.
     */
    public void setName(String name) {
        this.name = name;
    }

     /**
     * return the price of the product.
     *
     * @return the price of the product.
     */
    public double getPrice() {
        return price;
    }
    
    /**
     * Sets the price of the product.
     *
     * @param price The new price of the product.
     */
    public void setPrice(double price) {
        this.price = price;
    }

     /**
     * checks if the product is equal to the object.
     *
     * @param o The object to compare.
     * @return boolean that checks if the product is equal to the object.
     */
    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Product product = (Product) o;
        return id.equals(product.id);
    }

     /**
     * Returns product as a string.
     *
     * @return Product string
     */
    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
