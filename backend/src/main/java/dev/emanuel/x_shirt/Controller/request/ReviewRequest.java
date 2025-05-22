package dev.emanuel.x_shirt.Controller.request;

import lombok.Builder;

@Builder
public record ReviewRequest(
        double rating,
        String comment,
        Long userId,
        Long shirtId
        ) {
}
