package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Entity.Variations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShirtRepository extends JpaRepository<Shirt, Long> {

    Shirt findShirtByVariationsId(Long variationsId);
}
