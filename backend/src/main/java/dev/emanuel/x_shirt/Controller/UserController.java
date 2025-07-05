package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.request.UserRequest;
import dev.emanuel.x_shirt.Controller.response.UserResponse;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Mapper.UserMapper;
import dev.emanuel.x_shirt.Service.UserService;
import dev.emanuel.x_shirt.exception.ItemNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/xshirt/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    @GetMapping("/me")
    public ResponseEntity<UserResponse> getAuthenticatedUser(@AuthenticationPrincipal User currentUser) {

        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(UserMapper.toUserResponse(currentUser));
    }


    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateAuthenticatedUser(
            @AuthenticationPrincipal User currentUser,
            @RequestBody UserRequest request
    ) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        User userToUpdate = UserMapper.toUser(request);

        userToUpdate.setId(currentUser.getId());


        User updatedUser = userService.update(currentUser.getId(), userToUpdate)
                .orElseThrow(() -> new ItemNotFoundException("Usuário não encontrado."));

        return ResponseEntity.ok(UserMapper.toUserResponse(updatedUser));
    }


    @GetMapping
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = userService.findAll();

        List<UserResponse> userResponses = users.stream()
                .map(UserMapper::toUserResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(userResponses);
    }


    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new ItemNotFoundException("Usuário não encontrado com ID: " + id));
        return ResponseEntity.ok(UserMapper.toUserResponse(user));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody UserRequest request
    ) {
        User userToUpdate = UserMapper.toUser(request);


        User updatedUser = userService.update(id, userToUpdate)
                .orElseThrow(() -> new ItemNotFoundException("Usuário não encontrado com ID: " + id));

        return ResponseEntity.ok(UserMapper.toUserResponse(updatedUser));
    }
}