package com.example.controller;

import com.example.model.Employee;
import com.example.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller class for managing employee data.
 * Provides API endpoints for retrieving all employees and retrieving an
 * employee by ID.
 */
@RestController
@RequestMapping("/api/employee")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    /**
     * Constructor for EmployeeController.
     *
     * @param employeeRepository The repository for handling employee data.
     */
    @Autowired
    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Retrieves a list of all employees.
     *
     * @return A list of all employees.
     */
    // Fetch all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    /**
     * Retrieves an employee by ID.
     *
     * @param id The ID of the employee to be retrieved.
     * @return ResponseEntity with the retrieved employee and HTTP status code.
     *         If the employee is not found, returns ResponseEntity with HTTP status
     *         code 404 (Not Found).
     */
    // Get an employee by id
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable String id) {
        Optional<Employee> employee = employeeRepository.findById(id);
        if (employee.isPresent()) {
            return ResponseEntity.ok(employee.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}