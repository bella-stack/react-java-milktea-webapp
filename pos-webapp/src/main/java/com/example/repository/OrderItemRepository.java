package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.OrderItem;

/**
 * Repository interface for accessing and managing OrderItem entities in the
 * database.
 * Extends JpaRepository to inherit basic CRUD operations.
 */
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    /**
     * Custom query to fetch order items based on the order ID.
     *
     * @param orderId The ID of the order for which order items are to be retrieved.
     * @return List of OrderItem objects representing the order items of the
     *         specified order.
     */
    // query that fetches order history of an employee
    @Query("SELECT oi FROM OrderItem oi WHERE oi.orderId = :orderId")
    List<OrderItem> getOrderItems(@Param("orderId") int orderId);

    // /**
    //  * Native query to find the top three popular products in the past month.
    //  *
    //  * @param startDate The start date for calculating the month period.
    //  * @return List of Object arrays (Product ID, Count) representing the top three products.
    //  */
    @Query(value = "SELECT oi.product_id, COUNT(oi.product_id) AS orderCount " +
                   "FROM orderitem oi " +
                   "JOIN orderhistory oh ON oi.order_id = oh.id " +
                   "WHERE oh.created_date >= :startDate " +
                   "GROUP BY oi.product_id " +
                   "ORDER BY orderCount DESC " +
                   "LIMIT 3", nativeQuery = true)
    List<Object[]> findTopThreePopularProductsNative(@Param("startDate") LocalDate startDate);


    @Query(value = "SELECT oi.product_id, COUNT(oi.product_id) AS orderCount " +
               "FROM orderitem oi " +
               "JOIN orderhistory oh ON oi.order_id = oh.id " +
               "WHERE oh.created_date >= '2022-09-01' " + // Hardcoded date
               "GROUP BY oi.product_id " +
               "ORDER BY orderCount DESC " +
               "LIMIT 3", nativeQuery = true)
    List<Object[]> findTopThreePopularProductsNative();


}