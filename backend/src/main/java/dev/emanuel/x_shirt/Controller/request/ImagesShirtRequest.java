package dev.emanuel.x_shirt.Controller.request;

import lombok.Builder;

@Builder
public record ImagesShirtRequest(
        String name,
        String urlImage,
        boolean main,
        Long variationsId
) {
}
