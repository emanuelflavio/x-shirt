package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
