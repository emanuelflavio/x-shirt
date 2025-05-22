package dev.emanuel.x_shirt.Controller.request;

import dev.emanuel.x_shirt.Entity.Genre;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ShirtRequest(
        String name,
        String description,
        BigDecimal price,
        String mark,
        Genre genre,
        Long categoriesId
)
{}
