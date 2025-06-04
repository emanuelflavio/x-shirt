package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Order;
import dev.emanuel.x_shirt.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUsers(User users);
    Optional<Order> findByIdAndUsers(Long id, User user);
}
