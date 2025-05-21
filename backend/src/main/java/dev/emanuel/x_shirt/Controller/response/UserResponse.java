package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.TypeUser;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record UserResponse(
        Long id,
        String name,
        String email,
        TypeUser type,
        LocalDateTime createdAt
) {
}
