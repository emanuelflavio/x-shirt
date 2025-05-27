package dev.emanuel.x_shirt.Controller.response;

import lombok.Builder;

@Builder
public record ImagesShirtResponse(
        Long id,
        String urlImage,
        boolean main,
        Long variationsId
) {
}
