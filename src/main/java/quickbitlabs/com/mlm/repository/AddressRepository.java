package quickbitlabs.com.mlm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quickbitlabs.com.mlm.entity.Address;

import java.util.List;
import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {
    List<Address> findByContactId(UUID contactId);
}
