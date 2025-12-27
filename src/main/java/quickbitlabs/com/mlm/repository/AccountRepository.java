package quickbitlabs.com.mlm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import quickbitlabs.com.mlm.entity.Account;

import java.util.UUID;

public interface AccountRepository extends JpaRepository<Account, UUID> {
}
