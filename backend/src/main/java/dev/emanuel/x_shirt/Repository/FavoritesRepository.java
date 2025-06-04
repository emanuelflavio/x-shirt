package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.Favorites;
import dev.emanuel.x_shirt.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites, Long> {
    List<Favorites> findByUsers(User users);
    void deleteByUsers(User users);
    Optional<Favorites> findByUsersAndShirtsId(User users, Long shirts_id);
}
