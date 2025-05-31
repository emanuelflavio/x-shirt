package dev.emanuel.x_shirt.Repository;

import dev.emanuel.x_shirt.Entity.ImagesShirts;
import dev.emanuel.x_shirt.Entity.Variations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VariationsRepository extends JpaRepository<Variations, Long> {

    List<Variations> findByShirtsId(Long shirts_id);

}
