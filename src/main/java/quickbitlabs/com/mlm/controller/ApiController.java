package quickbitlabs.com.mlm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ApiController {

    @PostMapping("/quote")
    public ResponseEntity<Map<String, Object>> submitQuote(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of(
                "id", UUID.randomUUID().toString(),
                "status", "received",
                "message", "Quote request accepted"
        ));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String username = body.getOrDefault("username", "");
        String password = body.getOrDefault("password", "");
        if (username.isBlank() || password.isBlank()) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }
        return ResponseEntity.ok(Map.of(
                "token", UUID.randomUUID().toString(),
                "username", username
        ));
    }

    @PostMapping("/account/recover")
    public ResponseEntity<Map<String, String>> recover(@RequestBody Map<String, String> body) {
        String email = body.getOrDefault("email", "");
        return ResponseEntity.ok(Map.of("message", "Recovery email dispatched"));
    }
}
