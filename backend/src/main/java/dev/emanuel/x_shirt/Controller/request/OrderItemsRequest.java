package dev.emanuel.x_shirt.Controller.request;

import java.math.BigDecimal;

public record OrderItemsRequest(
        int quantity,
        BigDecimal priceUnitary,
        Long orderId,
        Long variationsId
        ) {
}
