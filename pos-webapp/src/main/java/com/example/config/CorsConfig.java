package com.example.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CorsConfig Class.
 */
@Configuration
public class CorsConfig {

    /**
     * Default constructor for CorsConfig.
     */
    public CorsConfig() {
        super();
    }
    
    /**
     * CorsConfigurer method.
     * @return WebMvcConfigurer
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000", "https://project-web-frontend.onrender.com")
                        .allowedMethods("GET", "POST", "PUT", "DELETE");
            }
        };
    }
}

