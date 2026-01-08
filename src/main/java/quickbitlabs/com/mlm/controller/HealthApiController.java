package quickbitlabs.com.mlm.controller;

// import org.hibernate.engine.jdbc.env.internal.LobCreationLogging_.logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import quickbitlabs.com.mlm.service.ContactService;

import java.util.HashMap;
import java.util.Map;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/health")
public class HealthApiController {

    private static final Logger logger = Logger.getLogger(HealthApiController.class.getName());
    @GetMapping
    public ResponseEntity<Map<String, Object>> checkHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitHealthCheck(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<>();
        response.put("received", body);
        response.put("message", "Health check data received");
        logger.info("Health check data received: " + body.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @RequestMapping(method = RequestMethod.OPTIONS)
    public ResponseEntity<Map<String, Object>> listOptions() {
        Map<String, Object> response = new HashMap<>();
        response.put("api/health/", "OPTIONS");
        response.put("api/health/", "GET");
        response.put("api/health/", "POST");
        response.put("api/health/", "PUT");
        response.put("api/health/", "DELETE");

        logger.info("Health check data updated: " + response.toString());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateHealthCheck(@RequestBody Map<String, Object> body) {
        Map<String, Object> response = new HashMap<>();
        response.put("updated", body);
        response.put("message", "Health check data updated");
        logger.info("Health check data updated: " + body.toString());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping
    public ResponseEntity<Map<String, Object>> deleteHealthCheck() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Health check data deleted");
        logger.info("Health check data deleted");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
        
