package dev.emanuel.x_shirt.Controller.request;

import dev.emanuel.x_shirt.Entity.StatusOrder;
import lombok.Builder;

@Builder
public record UpdateOrderStatusRequest(
        StatusOrder newStatus
) {
}
