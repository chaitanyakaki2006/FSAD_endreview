package com.citizenconnect.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        return health();
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "UP");
        response.put("application", "CitizenConnect Backend API");
        response.put("version", "1.0.0");
        response.put("description", "Citizen-Politician Interaction Platform");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("endpoints", Map.of(
            "auth",       "/api/auth",
            "swagger_ui", "/swagger-ui/index.html",
            "api_docs",   "/api-docs"
        ));
        return ResponseEntity.ok(response);
    }
}
