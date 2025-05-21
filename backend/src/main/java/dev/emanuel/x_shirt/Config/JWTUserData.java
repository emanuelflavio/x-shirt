package dev.emanuel.x_shirt.Config;

import dev.emanuel.x_shirt.Entity.TypeUser;
import lombok.Builder;

@Builder
public record JWTUserData(Long id, String name, String email, TypeUser type) {
}
