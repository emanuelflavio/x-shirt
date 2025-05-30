package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.OrderItems;
import dev.emanuel.x_shirt.Entity.StatusOrder;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Builder
public record OrderResponse(
        Long id,
        LocalDateTime DateOrder,
        StatusOrder status,
        BigDecimal total,
        Long userId,
        Long paymentsId,
        List<OrderItems> orderItems
) {
}
