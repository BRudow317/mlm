package quickbitlabs.com.mlm.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import quickbitlabs.com.mlm.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{
    
}
