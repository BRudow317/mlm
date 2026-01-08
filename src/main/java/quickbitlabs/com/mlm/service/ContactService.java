package quickbitlabs.com.mlm.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import quickbitlabs.com.mlm.dto.ContactSubmissionDTO;
import quickbitlabs.com.mlm.entity.Contact;
import quickbitlabs.com.mlm.repository.ContactRepository;

// import java.util.List;
import java.util.UUID;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Transactional
    public UUID saveContactSubmission(ContactSubmissionDTO submission) {
        // Create and save Contact entity
        Contact contact = new Contact();
        contact.setName(submission.getName());
        contact.setEmail(submission.getEmail());
        contact.setPhone(submission.getPhone());
        contact.setAddress(submission.getAddress());
        contact.setMessage(submission.getMessage());

        Contact savedContact = contactRepository.save(contact);

        return savedContact.getId();
    }
}
