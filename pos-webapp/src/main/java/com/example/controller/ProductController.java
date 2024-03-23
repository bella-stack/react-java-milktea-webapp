package com.example.controller;

import com.example.model.Product;
import com.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Comparator;

import java.util.List;
import java.util.Optional;
import java.util.*;

/**
 * ProductController for product data.
 */
@RestController
@RequestMapping("/api/product")
public class ProductController {
    private final ProductRepository productRepository;

     /**
     * set productrepository to another productrepository.
     *
     * @param productRepository object.
     */
    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

     /**
     * Return all product items.
     *
     * @return all product items.
     */
    // @GetMapping
    // public List<Product> getAllProductItems() {
    //     return productRepository.findAll();
    // }
    @GetMapping
    public List<Product> getAllProductItems() {
        List<Product> items = productRepository.findAll();
        // List<Product> finalItems = new ArrayList<>();
        // for (Product prod : items) {
        //     List<?> inventoryList = 
            

        // }

        items.sort(Comparator.comparingInt(item -> Integer.parseInt(item.getId().substring(2))));
        return items;
    }

    /**
    * Return a single product item by id.
    *
    * @param id The product id.
    * @return ResponseEntity showing status of query
    */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductItemById(@PathVariable String id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

     /**
     * Return a single product item by id.
     *
     * @param product The new product id.
     * @return product added to database
     */
    @PostMapping
    public Product addNewProductItem(@RequestBody Product product) {
        return productRepository.save(product);
    }

    /**
    * Updates a product item.
    *
    * @param id The product id.
    * @param updatedProduct The updated product
    * @return ResponseEntity showing status of query
    */
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProductItem(@PathVariable String id, @RequestBody Product updatedProduct) {
        return productRepository.findById(id)
                .map(product -> {
                    product.setPrice(updatedProduct.getPrice());
                    return ResponseEntity.ok(productRepository.save(product));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

     /**
     * Return all product names.
     *
     * @return all product names.
     */
    @GetMapping("/names")
    public List<String> getAllProductNames() {
        return productRepository.findAllProductNames();
    }

     /**
     * return all product prices.
     *
     * @return all product prices.
     */
    @GetMapping("/prices")
    public List<Double> getAllProductPrices() {
        return productRepository.findAllProductPrices();
    }

    /**
    * return product price by name.
    *
    * @param name The new product name.
    * @return product price by name.
    */
    @GetMapping("/price/{name}")
    public Double getProductPriceByName(@PathVariable String name) {
        return productRepository.findProductPriceByName(name);
    }

    /**
     * Delete product by id.
     *  
     * @param id The product id
     * @return Response status of the deletion
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable String id) {
        return productRepository.findById(id)
                .map(product -> {
                    productRepository.delete(product);
                    return ResponseEntity.ok().build(); // Successful deletion response
                })
                .orElseGet(() -> ResponseEntity.notFound().build()); // Product not found response
    }

}
