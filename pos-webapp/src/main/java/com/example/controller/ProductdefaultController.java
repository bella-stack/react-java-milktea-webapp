package com.example.controller;

import com.example.model.Productdefault;
import com.example.repository.ProductdefaultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * ProductdefaultController class for managing productdefault data.
 */
@RestController
@RequestMapping("/api/productdefault")
public class ProductdefaultController {
    private final ProductdefaultRepository productdefaultRepository;

     /**
     * Return max productdefault id.
     *
     * @return max productdefault id.
     */
    private String getNextMaxProductId() {
        int maxId = productdefaultRepository.findMaxNumericPartOfId() + 1;
        if (maxId != 0) {
            return "pd_" + maxId;
        } else {
            return "pd_1"; // Default starting ID
        }
    }

     /**
     * Sets the productdefault object to another productdefault object.
     *
     * @param productdefaultRepository object.
     */
    @Autowired
    public ProductdefaultController(ProductdefaultRepository productdefaultRepository) {
        this.productdefaultRepository = productdefaultRepository;
    }

     /**
     * Returns productdefault names associated with the product id.
     *
     * @param product_id The product id.
     * @return inventory by product.
     */
    @GetMapping("/product/{product_id}")
    public List<String> getInventoryByProductId(@PathVariable("product_id") String product_id) {
        return productdefaultRepository.findInventoryByProductId(product_id);
    }       

     /**
     * Return the name of the productdefault ingredients associated with the product.
     *
     * @param product_id The product id.
     * @return the ingredient ids associated with the product.
     */
    @GetMapping("/pd/{product_id}")
    public List<String> getInventoryIdByProductId(@PathVariable("product_id") String product_id) {
        return productdefaultRepository.findInventoryIdByProductId(product_id);
    }     

     /**
     * Return all product default items.
     *
     * @return all product default items.
     */
    @GetMapping
    public List<Productdefault> getAllProductdefaultItems() {
        return productdefaultRepository.findAll();
    }

    /**
    * Return a single product item by ID.
    *
    * @param id The Productdefault id.
    * @return a single Productdefault item by ID.
    */
    @GetMapping("/{id}")
    public ResponseEntity<Productdefault> getInventoryItemById(@PathVariable String id) {
        Optional<Productdefault> productdefault = productdefaultRepository.findById(id);
        if (productdefault.isPresent()) {
            return ResponseEntity.ok(productdefault.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //Add a new Productdefault item
     /**
     * return a new Productdefault item.
     *
     * @param product object.
     * @return a new Productdefault item.
     */
    @PostMapping
    public Productdefault addNewProductItem(@RequestBody Productdefault product) {
        return productdefaultRepository.save(product);
    }

     /**
     * Get the highest product ID.
     *
     * @return the max product ID number in Productdefault data.
     */
    @GetMapping("/nextId")
    public ResponseEntity<String> getNextProductId() {
        String nextId = getNextMaxProductId(); // Utilize the same logic as in the POST method
        return ResponseEntity.ok(nextId);
    }

    /**
    * Delete a product item.
    *
    * @param product_id The new product id.
    * @return response status of the deleted item
    */
    @DeleteMapping("/product/{product_id}")
    public ResponseEntity<?> deleteProductDefaultsByProductId(@PathVariable("product_id") String product_id) {
        productdefaultRepository.deleteByProduct_id(product_id);
        return ResponseEntity.ok().build();
    }



}


