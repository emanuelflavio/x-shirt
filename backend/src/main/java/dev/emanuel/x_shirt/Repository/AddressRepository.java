package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
