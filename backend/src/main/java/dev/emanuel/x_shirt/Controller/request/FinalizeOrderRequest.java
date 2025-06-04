package dev.emanuel.x_shirt.Controller.request;

public record FinalizeOrderRequest(
        Long addressId,
        Long paymentId
) {
}
