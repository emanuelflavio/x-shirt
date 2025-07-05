package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.response.FavoritesResponse;
import dev.emanuel.x_shirt.Entity.Favorites;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Mapper.FavoritesMapper;
import dev.emanuel.x_shirt.Service.FavoritesService;
import dev.emanuel.x_shirt.exception.ShirtNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("xshirt/favorites")
@RequiredArgsConstructor
public class FavoritesController {
    private final FavoritesService favoritesService;

    @GetMapping
    public ResponseEntity<List<FavoritesResponse>> listByUser(
            @AuthenticationPrincipal User user
    ) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<Favorites> favorites = favoritesService.findByUser(user);
        return ResponseEntity.ok(favorites.stream()
                .map(FavoritesMapper::toFavoritesResponse).toList());
    }

    @PostMapping("/{id}")
    public ResponseEntity<FavoritesResponse> addFavorite(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ) {
    if (user == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    try{
        Favorites favorite = favoritesService.addFavorites(user, id);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(FavoritesMapper.toFavoritesResponse(favorite));
    }
    catch (ShirtNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    catch (IllegalArgumentException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
    catch (Exception e){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<FavoritesResponse> removeFavorite(
            @AuthenticationPrincipal User user,
            @PathVariable Long id
    ){
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try{
            favoritesService.deleteFavorites(user, id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
        catch (ShirtNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
