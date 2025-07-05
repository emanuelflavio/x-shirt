package dev.emanuel.x_shirt.Controller.request;

import lombok.Builder;

@Builder
public record CartItemRequest(Long id, int quantity, Long variationsId) {
}
