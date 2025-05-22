package dev.emanuel.x_shirt.Controller.request;

import lombok.Builder;

@Builder
public record CategoriesRequest(
        String name,
        String description
) {
}
