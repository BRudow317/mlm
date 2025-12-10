package quickbitlabs.com.mlm.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quickbitlabs.com.mlm.entity.Email;
import quickbitlabs.com.mlm.service.ContactService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/private/contact")
public class ContactPrivateApiController {
    private final ContactService contactService;

    public ContactPrivateApiController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/email/{contactId}")
    public ResponseEntity<List<Email>> getEmails(@PathVariable UUID contactId) {
        List<Email> emails = contactService.getEmailsByContactId(contactId);
        return ResponseEntity.ok(emails);
    }
}
