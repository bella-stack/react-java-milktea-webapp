package com.example.repository;

import com.example.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Repository interface for accessing and managing Employee entities in the
 * database.
 * Extends JpaRepository to inherit basic CRUD operations.
 */
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    /**
     * Custom query to find an employee by email.
     *
     * @param email The email of the employee to be retrieved.
     * @return The employee with the specified email.
     */
    @Query("SELECT e FROM Employee e WHERE e.email = ?1")
    Employee findByEmail(String email);
}