package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Address;
import dev.emanuel.x_shirt.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUsers(User users);

    Address findByIdAndUsers(Long id, User users);
}
