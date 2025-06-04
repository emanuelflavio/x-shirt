package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.Favorites;
import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Repository.FavoritesRepository;
import dev.emanuel.x_shirt.Repository.ShirtRepository;
import dev.emanuel.x_shirt.Repository.UserRepository;
import dev.emanuel.x_shirt.exception.FavoritesNotFoundException;
import dev.emanuel.x_shirt.exception.ShirtNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FavoritesService {

    private final FavoritesRepository favoritesRepository;
    private final UserRepository userRepository;
    private final ShirtRepository shirtRepository;

    public List<Favorites> findByUser(User user) {
        return favoritesRepository.findByUsers(user);
    }

    @Transactional
    public Favorites addFavorites(User user, Long shirtId) {
        Optional<Shirt> shirt = Optional.ofNullable(shirtRepository.findById(shirtId)
                .orElseThrow(() -> new FavoritesNotFoundException("Shirt not found")));
        if(favoritesRepository.findByUsersAndShirtsId(user, shirtId).isPresent()) {
            throw new IllegalArgumentException("Favorites already exists");
        }
        return shirt.map(value -> favoritesRepository
                .save(Favorites.builder()
                .users(user)
                .shirts(value)
                .build())).orElse(null);
    }

    @Transactional
    public void deleteFavorites(User user, Long shirtId) {
        Optional<Shirt> shirt = Optional.ofNullable(shirtRepository.findById(shirtId)
                .orElseThrow(() -> new ShirtNotFoundException("Shirt not found")));
        Favorites favorite = favoritesRepository.findByUsersAndShirtsId(user, shirtId)
                .orElseThrow(() -> new FavoritesNotFoundException("Favorites not found"));

        favoritesRepository.delete(favorite);
    }

}
