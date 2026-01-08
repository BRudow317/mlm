package quickbitlabs.com.mlm.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quickbitlabs.com.mlm.dto.ContactSubmissionDTO;
import quickbitlabs.com.mlm.service.ContactService;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/public/contact")
public class ContactController {
    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitContactForm(@RequestBody ContactSubmissionDTO submission) {
        try {
            // Honeypot check
            if (submission.getHoney() != null && !submission.getHoney().isEmpty()) {
                return ResponseEntity.badRequest().build(); // Bot detected
            }

            UUID contactId = contactService.saveContactSubmission(submission);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("contactId", contactId);
            response.put("message", "Contact submission received successfully");

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to process contact submission");
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
