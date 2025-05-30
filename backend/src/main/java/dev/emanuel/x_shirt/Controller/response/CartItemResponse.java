package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.Variations;

public record CartItemResponse(
        Long id,
        int quantity,
        Variations variations
) {
}
