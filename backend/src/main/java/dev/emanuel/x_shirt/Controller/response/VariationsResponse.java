package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.CartItems;
import dev.emanuel.x_shirt.Entity.ImagesShirts;
import dev.emanuel.x_shirt.Entity.OrderItems;
import lombok.Builder;

import java.util.List;

@Builder
public record VariationsResponse(
        Long id,
        String size,
        String color,
        int stock,
        Long shirtId,
        List<OrderItems> orderItems,
        List<CartItems> cartItems,
        List<ImagesShirts> imagesShirts
        ) {
}
