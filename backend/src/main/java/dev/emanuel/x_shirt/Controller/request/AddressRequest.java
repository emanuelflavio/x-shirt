package dev.emanuel.x_shirt.Controller.request;

import lombok.Builder;

@Builder
public record AddressRequest(
    String street,
    String city,
    String state,
    String zipCode,
    String number,
    String complement) {
}
