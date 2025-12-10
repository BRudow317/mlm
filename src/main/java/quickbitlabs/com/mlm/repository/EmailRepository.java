package quickbitlabs.com.mlm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quickbitlabs.com.mlm.entity.Email;

import java.util.List;
import java.util.UUID;

public interface EmailRepository extends JpaRepository<Email, UUID> {
    List<Email> findByContactId(UUID contactId);
}
