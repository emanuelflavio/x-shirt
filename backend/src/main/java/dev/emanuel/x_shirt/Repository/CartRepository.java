package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Cart;
import dev.emanuel.x_shirt.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    Cart findByUsers(User user);

}
