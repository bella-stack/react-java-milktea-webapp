package com.example.controller;

import com.example.model.OrderHistory;
import com.example.repository.OrderHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller class for managing order items.
 * Provides API endpoints for retrieving, creating, and deleting order items.
 */
@RestController
@RequestMapping("/api/orderhistory")
public class OrderHistoryController {

    private final OrderHistoryRepository orderhistoryRepository;

    /**
     * Constructor for OrderHistoryRepository.
     *
     * @param orderhistoryRepository The repository for handling order item data.
     */
    @Autowired
    public OrderHistoryController(OrderHistoryRepository orderhistoryRepository) {
        this.orderhistoryRepository = orderhistoryRepository;
    }

    /**
     * Retrieves all of order history.
     *
     * @return A list of all order history items.
     */
    @GetMapping
    public List<OrderHistory> getAllOrderHistory() {
        return orderhistoryRepository.findAll();
    }

    /**
     * Retrieves order items by order ID.
     *
     * @param employeeId gets order history by employee id
     * @return OrderHistory for specified employee
     */
    // fetches order history items of an employee
    @GetMapping("/{employeeId}")
    public List<OrderHistory> getOrderHistory(@PathVariable String employeeId) {
        return orderhistoryRepository.getOrderHistory(employeeId);
    }

    /**
     * Creates a new order history item.
     *
     * @param orderhistory The order history item to be created.
     * @return ResponseEntity with the created order item and HTTP status code.
     */
    // Method to create a new order history item
    @PostMapping
    public ResponseEntity<OrderHistory> addOrderHistory(@RequestBody OrderHistory orderhistory) {
        OrderHistory savedOrderHistory = orderhistoryRepository.save(orderhistory);
        return ResponseEntity.ok(savedOrderHistory);
    }

    /**
     * Deletes an order history item by ID.
     *
     * @param id The ID of the order history item to be deleted.
     * @return ResponseEntity with HTTP status code indicating the result of the
     *         deletion.
     */
    // Method to delete items
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrderHistory(@PathVariable int id) {
        if (!orderhistoryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        orderhistoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}