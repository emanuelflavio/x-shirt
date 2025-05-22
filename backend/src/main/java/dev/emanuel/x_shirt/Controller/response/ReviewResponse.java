package dev.emanuel.x_shirt.Controller.response;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ReviewResponse(
        Long id,
        double rating,
        String comment,
        LocalDateTime date,
        Long userId,
        Long shirtId
) {
}
