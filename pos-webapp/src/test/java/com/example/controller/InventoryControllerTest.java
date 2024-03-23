package com.example.controller;
import com.example.model.Inventory;
import com.example.repository.InventoryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.containsString;
import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


import java.util.*;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(SpringExtension.class)
@WebMvcTest(InventoryController.class)
class InventoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private InventoryRepository inventoryRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private Inventory testInventory;

    @BeforeEach
    void setUp() {
        testInventory = new Inventory("in_17", "napkin", 199999, 0.01, 0.01, false);
    }

    @Test
    void testRestockInventoryItem_ExceedsMaxStock_ShouldReturnBadRequest() throws Exception {
        // Given return 400
        int restockAmount = 60000; // This will bring the total to 259999, which is over the limit
        when(inventoryRepository.findById(testInventory.getId())).thenReturn(Optional.of(testInventory));

        // When & Then
        mockMvc.perform(patch("/api/inventory/restock/" + testInventory.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(restockAmount)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string(containsString("Restocking amount exceeds maximum stock limit")));
    }

    // Test for 200 OK - Successfully retrieving a list of products
    @Test
    void testGetAllInventoryItems_ShouldReturnOk() throws Exception {
        List<Inventory> inventoryList = Arrays.asList(testInventory); // Assuming testInventory is initialized in setUp()
        when(inventoryRepository.findAll()).thenReturn(inventoryList);

        mockMvc.perform(get("/api/inventory"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id", is(testInventory.getId())));
    }

    // Test for 201 Created - Successfully creating a new inventory item
    @Test
    void testAddNewInventoryItem_ShouldReturnCreated() throws Exception {
        when(inventoryRepository.save(any(Inventory.class))).thenReturn(testInventory);

        mockMvc.perform(post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testInventory)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id", is(testInventory.getId())));
    }

    // Test for 400 Bad Request - Sending invalid data to create a new inventory item
    @Test
    void testAddInvalidInventoryItem_ShouldReturnBadRequest() throws Exception {
        Inventory invalidInventory = new Inventory("", "", -10, -1, -1, false);

        mockMvc.perform(post("/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidInventory)))
                .andExpect(status().isBadRequest());
    }

    // Test for 404 Not Found - Trying to fetch an inventory item that does not exist
    @Test
    void testGetNonExistingInventoryItem_ShouldReturnNotFound() throws Exception {
        String nonExistingId = "non_existing_id";
        when(inventoryRepository.findById(nonExistingId)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/inventory/" + nonExistingId))
                .andExpect(status().isNotFound());
    }
}
