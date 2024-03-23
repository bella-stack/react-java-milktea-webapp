package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
// mvn spring-boot:run

/**
 * App constructor for running the application.
 */
@SpringBootApplication
public class App {

    /**
     * Default constructor for App class.
     */
    public App() {
        // Default constructor body
    }
    /**
     * App constructor for running the application.
     * @param args The arguments.
     */
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}

@RestController
class HelloController {
    @GetMapping("/")
    public String hello() {
        return "Hello World! hola";
    }
}
