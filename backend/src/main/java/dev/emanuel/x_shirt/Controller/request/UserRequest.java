package dev.emanuel.x_shirt.Controller.request;

import dev.emanuel.x_shirt.Entity.TypeUser;
import lombok.Builder;

@Builder
public record UserRequest(
        String name,
        String email,
        String password,
        TypeUser type
) {}
