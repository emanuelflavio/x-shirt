package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.Favorites;
import dev.emanuel.x_shirt.Entity.Genre;
import dev.emanuel.x_shirt.Entity.Review;
import dev.emanuel.x_shirt.Entity.Variations;
import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record ShirtResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        String mark,
        Genre genre,
        Double rating,
        String categorie,
        List<Variations> variations,
        List<Review> reviews,
        List<Favorites> favorites
) {
}
