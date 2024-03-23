package com.example.controller;

import com.example.model.Inventory;
import com.example.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import org.springframework.web.server.ResponseStatusException;
import javax.validation.Valid;
import org.springframework.data.domain.Sort;
import java.util.Comparator;




/**
 * Controller for managing inventory items.
 * This controller provides various endpoints to interact with the inventory data.
 */
@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    private final InventoryRepository inventoryRepository;

    /**
     * Constructor for InventoryController.
     *
     * @param inventoryRepository The repository for accessing inventory data.
     */
    @Autowired
    public InventoryController(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    /**
     * Retrieves all inventory items.
     *
     * @return A list of all inventory items.
     */
    // @GetMapping
    // public List<Inventory> getAllInventoryItems() {
    //     return inventoryRepository.findAll(Sort.by("id").ascending());
    // }
    @GetMapping
    public List<Inventory> getAllInventoryItems() {
        List<Inventory> items = inventoryRepository.findAll();
        items.sort(Comparator.comparingInt(item -> Integer.parseInt(item.getId().substring(3))));
        return items;
    }

    /**
     * Retrieves a single inventory item by its ID.
     *
     * @param id The ID of the inventory item to retrieve.
     * @return The requested inventory item, or a 404 Not Found response if not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Inventory> getInventoryItemById(@PathVariable String id) {
        Optional<Inventory> inventory = inventoryRepository.findById(id);
        return inventory.isPresent() ? ResponseEntity.ok(inventory.get()) : ResponseEntity.notFound().build();
    }

    /**
     * Adds a new inventory item.
     *
     * @param inventory The inventory item to add.
     * @return The added inventory item.
     */
    // @PostMapping
    // public ResponseEntity<Inventory> addNewInventoryItem(@RequestBody Inventory inventory) {
    //     Inventory savedInventory = inventoryRepository.save(inventory);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(savedInventory);
    // }
    @PostMapping
    public ResponseEntity<Inventory> addNewInventoryItem(@Valid @RequestBody Inventory inventory) {
        Inventory savedInventory = inventoryRepository.save(inventory);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedInventory);
    }

    /**
     * Updates an existing inventory item.
     *
     * @param id The ID of the inventory item to update.
     * @param updatedInventory The updated inventory item data.
     * @return The updated inventory item, or a 404 Not Found response if not found.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Inventory> updateInventoryItem(@PathVariable String id, @RequestBody Inventory updatedInventory) {
        return inventoryRepository.findById(id)
                .map(inventory -> {
                    inventory.setQuantity(updatedInventory.getQuantity());
                    inventory.setPrice(updatedInventory.getPrice());
                    return ResponseEntity.ok(inventoryRepository.save(inventory));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Decrements the quantity of an inventory item by 1.
     * If the inventory item's quantity is already 0 or less, responds with a Bad Request.
     *
     * @param id The ID of the inventory item to decrement.
     * @return The updated inventory item, or a 404 Not Found response if not found.
     */
    @PutMapping("/decrement/{id}")
    public ResponseEntity<Inventory> decrementInventoryItem(@PathVariable String id) {
        return inventoryRepository.findById(id)
                .map(inventory -> {
                    if (inventory.getQuantity() > 0) {
                        inventory.setQuantity(inventory.getQuantity() - 1);
                        return ResponseEntity.ok(inventoryRepository.save(inventory));
                    } else {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Inventory());
                    }
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    /**
     * Deletes an inventory item by its ID.
     *
     * @param id The ID of the inventory item to delete.
     * @return A response indicating the result of the deletion operation.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteInventoryItemById(@PathVariable String id) {
        return inventoryRepository.findById(id)
                .map(inventory -> {
                    inventoryRepository.delete(inventory);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Retrieves a list of inventory items that need to be restocked (quantity greater than 5000).
     *
     * @return A list of inventory items that need restocking.
     */
    @GetMapping("/restock")
    public ResponseEntity<List<Inventory>> getRestockList() {
        List<Inventory> restockItems = inventoryRepository.findByQuantityLessThan(5000);
        return ResponseEntity.ok(restockItems);
    }

    @PatchMapping("/restock/{id}")
    public ResponseEntity<?> restockInventoryItem(@PathVariable String id, @RequestBody int restockAmount) {
        // System.out.println("=============");
        // System.out.println("=======restockAmount======" + restockAmount);
        return inventoryRepository.findById(id)
                .map(inventory -> {
                    if (inventory.getQuantity() + restockAmount <= 250000) {
                        inventory.setQuantity(inventory.getQuantity() + restockAmount);
                        return ResponseEntity.ok(inventoryRepository.save(inventory));
                    } else {
                        // If the restock would exceed the maximum stock, return a BAD_REQUEST response with a message
                        return ResponseEntity
                                .badRequest()
                                .body("Restocking amount exceeds maximum stock limit.");
                    }
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
