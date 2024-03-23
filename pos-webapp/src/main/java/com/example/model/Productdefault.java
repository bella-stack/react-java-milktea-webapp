package com.example.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Productdefault class
 */
@Entity
@Table(name = "productdefault")
public class Productdefault {

    @Id
    private String id;
    private String product_id;
    private String ingredient_id;

    /**
     * Default constructor for Productdefault.
     */
    public Productdefault() {}

    /**
     * Default constructor for Productdefault with params.
     * @param id The unique identifier of the product default.
     * @param product_id The ID of the product associated with the item.
     * @param ingredient_id The ID of the ingredient associated with the item.
     */
    public Productdefault(String id, String product_id, String ingredient_id) {
        this.id = id;
        this.ingredient_id = ingredient_id;
        this.product_id = product_id;
    }

    // Standard Getters and Setters

     /**
     * Gets the ID of the employee.
     *
     * @return ID of the employee.
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
     * Gets the ID of the product.
     *
     * @return The ID of the product.
     */
    public String getProduct_id() {
        return product_id;
    }

     /**
     * Sets the id of the product.
     *
     * @param product_id The new product id.
     */
    public void setProduct_id(String product_id) {
        this.product_id = product_id;
    }

    /**
     * Gets the ID of the ingredient.
     *
     * @return The ID of the ingredient.
     */
    public String getIngredient_id() {
        return ingredient_id;
    }

    /**
     * Sets the ID of the ingredient.
     *
     * @param ingredient_id The new ingredient id.
     */
    public void setIngredient_id(String ingredient_id) {
        this.ingredient_id= ingredient_id;
    }
    /**
     * return the product default to string
     *
     * @return The product default to string.
     */
    @Override
    public String toString() {
        return "Productdefault{" +
                "id='" + id + '\'' +
                ", ingredient_id='" + ingredient_id + '\'' +
                ", product_id=" + product_id +
                '}';
    }
}
