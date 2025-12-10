package quickbitlabs.com.mlm.service;

import org.springframework.stereotype.Service;
import quickbitlabs.com.mlm.repository.EmailRepository;
import quickbitlabs.com.mlm.entity.Email;

import java.util.List;
import java.util.UUID;

@Service
public class ContactService {
    private final EmailRepository emailRepository;

    public ContactService(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    public List<Email> getEmailsByContactId(UUID contactId) {
        return emailRepository.findByContactId(contactId);
    }
}
