package com.example.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
class InventoryTest {

    @Test
    void testInventoryGettersAndSetters() {
        Inventory inventory = new Inventory();
        inventory.setId("in_17");
        inventory.setName("napkin");
        inventory.setQuantity(199999);
        inventory.setCost(0.01);
        inventory.setPrice(0.01);
        inventory.setIsaddon(false);

        assertEquals("in_17", inventory.getId());
        assertEquals("napkin", inventory.getName());
        assertEquals(199999, inventory.getQuantity());
        assertEquals(0.01, inventory.getCost());
        assertEquals(0.01, inventory.getPrice());
        assertFalse(inventory.isIsaddon());
    }
    @Test
    void testInventoryToString() {
        Inventory inventory = new Inventory("in_17", "napkin", 199999, 0.01, 0.01, false);
        String expectedString = "Inventory{id='in_17', name='napkin', quantity=199999, cost=0.01, price=0.01, isaddon=false}";
        assertEquals(expectedString, inventory.toString());
    }
    
}
