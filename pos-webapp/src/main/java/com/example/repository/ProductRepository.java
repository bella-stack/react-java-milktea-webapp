package com.example.repository;

import com.example.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.List;

/**
 * Product repository interface.
 */
public interface ProductRepository extends JpaRepository<Product, String> {

    /**
     * Custom query to find the ID of a product by its name.
     *
     * @param name The name of the product for which the ID is to be retrieved.
     * @return The ID of the specified product.
     */
    @Query("SELECT p.id FROM Product p WHERE p.name = :name")
    String findProductIdByName(@PathVariable("name") String name);

    /**
     * Custom query to find all product names in the database.
     *
     * @return List of all product names.
     */
    @Query("SELECT p.name FROM Product p")
    List<String> findAllProductNames();

    /**
     * Custom query to find the price of a product by its name.
     *
     * @param name The name of the product for which the price is to be retrieved.
     * @return The price of the specified product.
     */
    @Query("SELECT p.price FROM Product p WHERE p.name = :name")
    Double findProductPriceByName(@PathVariable("name") String name);

    /**
     * Custom query to find all product prices in the database.
     *
     * @return List of all product prices.
     */
    @Query("SELECT p.price FROM Product p")
    List<Double> findAllProductPrices();
}