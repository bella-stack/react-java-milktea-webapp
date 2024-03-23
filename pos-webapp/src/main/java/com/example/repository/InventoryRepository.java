package com.example.repository;

import com.example.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

/**
 * Inventory repository
 */
public interface InventoryRepository extends JpaRepository<Inventory, String> {
    /**
     * Finds inventory items with a quantity less than the specified value.
     * 
     * @param quantity The threshold quantity.
     * @return A list of inventory items with quantity less than the specified value.
     */
    List<Inventory> findByQuantityLessThan(int quantity);//SELECT * FROM inventory WHERE quantity < ?

    @Query(value = "SELECT * FROM inventory ORDER BY CAST(SUBSTRING(id, 4) AS UNSIGNED)", nativeQuery = true)
    List<Inventory> findAllOrderByNumericId();

}