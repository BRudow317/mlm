package quickbitlabs.com.mlm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quickbitlabs.com.mlm.entity.Contact;

// import java.util.List;
import java.util.UUID;

public interface ContactRepository extends JpaRepository<Contact, UUID> {
    // List<Contact> findByAccountId(UUID accountId);
    // List<Contact> findByUserId(UUID userId);
}
