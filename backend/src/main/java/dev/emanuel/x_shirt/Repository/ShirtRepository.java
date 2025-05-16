package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Shirt;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShirtRepository extends JpaRepository<Shirt, Long> {
}
