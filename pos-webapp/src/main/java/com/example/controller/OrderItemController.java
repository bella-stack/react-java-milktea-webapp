package com.example.controller;

import com.example.model.OrderItem;
import com.example.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;
import java.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestParam;


/**
 * Controller class for managing order items.
 * Provides API endpoints for retrieving, creating, and deleting order items.
 */
@RestController
@RequestMapping("/api/orderitem")
public class OrderItemController {

    private final OrderItemRepository orderitemRepository;

    /**
     * Constructor for OrderItemController.
     *
     * @param orderitemRepository The repository for handling order item data.
     */
    @Autowired
    public OrderItemController(OrderItemRepository orderitemRepository) {
        this.orderitemRepository = orderitemRepository;
    }

    /**
     * Retrieves all order items.
     *
     * @return A list of all order items.
     */
    @GetMapping
    public List<OrderItem> getAllOrderItem() {
        return orderitemRepository.findAll();
    }

    /**
     * Retrieves order items by order ID.
     *
     * @param orderId The ID of the order for which order items are retrieved.
     * @return A list of order items for the specified order ID.
     */
    // fetches order items by id
    @GetMapping("/{orderId}")
    public List<OrderItem> getOrderHistory(@PathVariable int orderId) {
        return orderitemRepository.getOrderItems(orderId);
    }

    /**
     * Creates a new order item.
     *
     * @param orderitem The order item to be created.
     * @return ResponseEntity with the created order item and HTTP status code.
     */
    // Method to create a new order item
    @PostMapping
    public ResponseEntity<OrderItem> addOrderItem(@RequestBody OrderItem orderitem) {
        OrderItem savedOrderItem = orderitemRepository.save(orderitem);
        return new ResponseEntity<>(savedOrderItem, HttpStatus.CREATED);
    }

    /**
     * Deletes an order item by ID.
     *
     * @param id The ID of the order item to be deleted.
     * @return ResponseEntity with HTTP status code indicating the result of the
     *         deletion.
     */
    // Method to delete items
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrderItem(@PathVariable int id) {
        if (!orderitemRepository.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        orderitemRepository.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // /**
    //  * Endpoint to retrieve the top three popular products since a given date.
    //  *
    //  * @param startDate The start date for calculating the period.
    //  * @return ResponseEntity with a list of top products.
    //  */
    @GetMapping("/top-products")
    public ResponseEntity<List<Object[]>> getTopThreePopularProducts(
            @RequestParam("startDate")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate) {

        List<Object[]> topProducts = orderitemRepository.findTopThreePopularProductsNative(startDate);
        System.out.println(startDate);
        System.out.println("Top Products: ");
        for (Object[] topProduct : topProducts) {
            System.out.println(topProduct[0]);
        }

        return ResponseEntity.ok(topProducts);
    }
   

    @GetMapping("/tops")
    public ResponseEntity<List<Object[]>> getTopThreePopularProducts() {
        List<Object[]> topProducts = orderitemRepository.findTopThreePopularProductsNative();
        if (topProducts.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(topProducts, HttpStatus.OK);
    }
}