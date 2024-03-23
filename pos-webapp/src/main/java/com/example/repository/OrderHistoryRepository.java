package com.example.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.model.OrderHistory;

/**
 * Repository interface for accessing and managing OrderHistory entities in the
 * database.
 * Extends JpaRepository to inherit basic CRUD operations.
 */
public interface OrderHistoryRepository extends JpaRepository<OrderHistory, Integer> {

    /**
     * Custom query to fetch the order history of an employee.
     *
     * @param employeeId The ID of the employee whose order history is to be
     *                   retrieved.
     * @return List of OrderHistory objects representing the order history of the
     *         specified employee.
     */
    // query that fetches order history of an employee
    @Query("SELECT o FROM OrderHistory o WHERE o.employeeId = :employeeId ORDER BY o.createdDate DESC, o.createdTime DESC")
    List<OrderHistory> getOrderHistory(@Param("employeeId") String employeeId);
}