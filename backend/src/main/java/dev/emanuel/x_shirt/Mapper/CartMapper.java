package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.request.CartRequest;
import dev.emanuel.x_shirt.Controller.response.CartResponse;
import dev.emanuel.x_shirt.Entity.Cart;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CartMapper {

    public static Cart toCart(CartRequest request) {
        return Cart.builder()
                .active(request.active())
                .build();
    }

    public static CartResponse toCartResponse(Cart cart) {
        return CartResponse.builder()
                .id(cart.getId())
                .active(cart.getActive())
                .creationDate(cart.getCreationDate())
                .cartItems(cart.getCartItems())
                .build();
    }
}
