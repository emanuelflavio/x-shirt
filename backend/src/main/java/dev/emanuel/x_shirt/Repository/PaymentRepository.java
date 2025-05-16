package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
