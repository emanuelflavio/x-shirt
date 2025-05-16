package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
