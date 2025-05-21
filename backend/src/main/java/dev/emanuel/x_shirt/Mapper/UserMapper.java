package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.request.UserRequest;
import dev.emanuel.x_shirt.Controller.response.UserResponse;
import dev.emanuel.x_shirt.Entity.User;
import lombok.experimental.UtilityClass;

@UtilityClass
public class UserMapper {

    public static User toUser(UserRequest request) {
        return User.builder()
                .name(request.name())
                .email(request.email())
                .password(request.password())
                .type(request.type())
                .build();
    }

    public static UserResponse toUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .type(user.getType())
                .createdAt(user.getCreatedAt())
                .build();
    }


}
