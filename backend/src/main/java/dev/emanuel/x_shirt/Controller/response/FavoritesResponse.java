package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Entity.User;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record FavoritesResponse(
        Long id,
        LocalDateTime date_favorite,
        User user,
        Shirt shirt
        ) {
}
