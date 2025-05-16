package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
