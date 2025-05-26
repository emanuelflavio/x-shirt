package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.request.VariationsRequest;
import dev.emanuel.x_shirt.Controller.response.VariationsResponse;
import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Entity.Variations;
import lombok.experimental.UtilityClass;

@UtilityClass
public class VariationsMapper {

    public static Variations toVariations(VariationsRequest request) {
        Shirt shirt = Shirt.builder().id(request.shirtId()).build();

        return Variations.builder()
                .size(request.size())
                .color(request.color())
                .stock(request.stock())
                .shirts(shirt)
                .build();
    }

    public static VariationsResponse toVariationsResponse(Variations variations) {

        return VariationsResponse.builder()
                .id(variations.getId())
                .size(variations.getSize())
                .color(variations.getColor())
                .stock(variations.getStock())
                .shirtId(variations.getShirts().getId())
                .cartItems(variations.getCartItems())
                .imagesShirts(variations.getImagesShirts())
                .orderItems(variations.getOrderItems())
                .build();
    }

}
