package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Order;
import dev.emanuel.x_shirt.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrder(Order order);
}
