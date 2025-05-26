package dev.emanuel.x_shirt.Controller.request;

import lombok.Builder;

@Builder
public record VariationsRequest(
    String size,
    String color,
    int stock,
    Long shirtId
) {

}
