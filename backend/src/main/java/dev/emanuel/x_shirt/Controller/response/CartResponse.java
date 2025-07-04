package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.CartItems;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record CartResponse(
        Long id,
        Boolean active,
        BigDecimal total,
        LocalDateTime creationDate,
        List<CartItems> cartItems
) {
}
