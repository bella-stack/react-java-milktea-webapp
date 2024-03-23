package com.example.repository;

import com.example.model.Productdefault;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Repository interface for accessing and managing Productdefault entities in
 * the database.
 * Extends JpaRepository to inherit basic CRUD operations.
 */
public interface ProductdefaultRepository extends JpaRepository<Productdefault, String> {
       /**
        * Custom query to find the names of inventory items associated with a product.
        *
        * @param product_id The ID of the product for which inventory names are to be
        *                   retrieved.
        * @return List of inventory item names associated with the specified product.
        */
       @Query("SELECT i.name FROM Product p " +
                     "JOIN Productdefault pd ON p.id = pd.product_id " +
                     "JOIN Inventory i ON pd.ingredient_id = i.id " +
                     "WHERE p.id = :product_id")
       List<String> findInventoryByProductId(@Param("product_id") String product_id);

       /**
        * Custom query to find the IDs of inventory items associated with a product.
        *
        * @param product_id The ID of the product for which inventory IDs are to be
        *                   retrieved.
        * @return List of inventory item IDs associated with the specified product.
        */
       @Query("SELECT i.id FROM Product p " +
                     "JOIN Productdefault pd ON p.id = pd.product_id " +
                     "JOIN Inventory i ON pd.ingredient_id = i.id " +
                     "WHERE p.id = :product_id")
       List<String> findInventoryIdByProductId(@Param("product_id") String product_id);

       /**
        * Custom query to find the maximum numeric part of the product default ID.
        *
        * @return The maximum numeric part of the product default ID.
        */
       @Query(value = "SELECT MAX(CAST(SUBSTRING(pd.id, 4) AS INTEGER)) FROM Productdefault pd", nativeQuery = true)
       Integer findMaxNumericPartOfId();

       /**
        * Transactional and modifying query to delete product defaults by product ID.
        *
        * @param product_id The ID of the product for which product defaults are to be
        *                   deleted.
        */
       @Transactional
       @Modifying
       @Query("DELETE FROM Productdefault pd WHERE pd.product_id = :product_id")
       void deleteByProduct_id(String product_id);
}
