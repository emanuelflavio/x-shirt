package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.Order;
import dev.emanuel.x_shirt.Entity.User;
import lombok.Builder;

import java.util.List;

@Builder
public record AddressResponse(
        Long id,
        String street,
        String city,
        String state,
        String zipCode,
        String number,
        String complement,
        User users,
        List<Order> orders
) {
}
