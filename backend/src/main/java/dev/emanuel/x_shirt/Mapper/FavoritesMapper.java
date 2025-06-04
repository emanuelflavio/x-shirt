package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.response.FavoritesResponse;
import dev.emanuel.x_shirt.Entity.Favorites;
import lombok.experimental.UtilityClass;

@UtilityClass
public class FavoritesMapper {

    public static FavoritesResponse toFavoritesResponse(Favorites favorites) {
        return FavoritesResponse
                .builder()
                .id(favorites.getId())
                .date_favorite(favorites.getDate_favorite())
                .user(favorites.getUsers())
                .shirt(favorites.getShirts())
                .build();
    }

}
