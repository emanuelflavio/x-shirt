package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.response.CartResponse;
import dev.emanuel.x_shirt.Entity.Cart;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CartMapper {

    public static CartResponse toCartResponse(Cart cart) {
        return CartResponse.builder()
                .id(cart.getId())
                .active(cart.getActive())
                .total(cart.getTotal())
                .creationDate(cart.getCreationDate())
                .cartItems(cart.getCartItems())
                .build();
    }
}
