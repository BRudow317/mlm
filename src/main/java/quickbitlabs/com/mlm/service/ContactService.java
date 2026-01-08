package quickbitlabs.com.mlm.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quickbitlabs.com.mlm.dto.ContactSubmissionDTO;
import quickbitlabs.com.mlm.entity.Address;
import quickbitlabs.com.mlm.entity.Contact;
import quickbitlabs.com.mlm.entity.Email;
import quickbitlabs.com.mlm.repository.AddressRepository;
import quickbitlabs.com.mlm.repository.ContactRepository;
import quickbitlabs.com.mlm.repository.EmailRepository;

import java.util.List;
import java.util.UUID;

@Service
public class ContactService {
    private final EmailRepository emailRepository;
    private final ContactRepository contactRepository;
    private final AddressRepository addressRepository;

    public ContactService(EmailRepository emailRepository,
                         ContactRepository contactRepository,
                         AddressRepository addressRepository) {
        this.emailRepository = emailRepository;
        this.contactRepository = contactRepository;
        this.addressRepository = addressRepository;
    }

    public List<Email> getEmailsByContactId(UUID contactId) {
        return emailRepository.findByContactId(contactId);
    }

    @Transactional
    public UUID saveContactSubmission(ContactSubmissionDTO submission) {
        // Create and save Contact entity
        Contact contact = new Contact();
        contact.setFullName(submission.getName());
        contact.setPhone(submission.getPhone());
        contact.setMessage(submission.getCustomMessage());
        contact.setStatus("NEW");

        Contact savedContact = contactRepository.save(contact);

        // Save email if provided
        if (submission.getEmail() != null && !submission.getEmail().trim().isEmpty()) {
            Email email = new Email();
            email.setToAddress(submission.getEmail());
            email.setContactId(savedContact.getId());
            emailRepository.save(email);
        }

        // Save address if location provided
        if (submission.getLocation() != null) {
            Address address = new Address();
            address.setContactId(savedContact.getId());

            ContactSubmissionDTO.LocationDTO loc = submission.getLocation();
            if (loc.getAddress() != null) {
                // Parse address if it's a single string, or use individual fields
                address.setStreet1(loc.getAddress());
            }
            address.setCity(loc.getCity());
            address.setState(loc.getState());
            address.setPostalCode(loc.getPostalCode());
            address.setCountry(loc.getCountry());

            addressRepository.save(address);
        }

        return savedContact.getId();
    }
}
