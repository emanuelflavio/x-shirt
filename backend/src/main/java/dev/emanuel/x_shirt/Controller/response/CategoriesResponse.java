package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.Shirt;
import lombok.Builder;

import java.util.List;

@Builder
public record CategoriesResponse(
        Long id,
        String name,
        String description,
        List<Shirt> shirts
) {
}
