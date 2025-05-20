package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.ImagesShirts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagesShirtsRepository extends JpaRepository<ImagesShirts, Long> {
}
