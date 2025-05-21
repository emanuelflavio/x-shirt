package dev.emanuel.x_shirt.Controller;


import dev.emanuel.x_shirt.Config.TokenService;
import dev.emanuel.x_shirt.Controller.request.LoginRequest;
import dev.emanuel.x_shirt.Controller.request.UserRequest;
import dev.emanuel.x_shirt.Controller.response.LoginResponse;
import dev.emanuel.x_shirt.Controller.response.UserResponse;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Mapper.UserMapper;
import dev.emanuel.x_shirt.Service.UserService;
import dev.emanuel.x_shirt.exception.UsernameOrPasswordInvalidException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/xshirt/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(@RequestBody UserRequest request) {
        User salvedUser = userService.save(UserMapper.toUser(request));
        return ResponseEntity.status(HttpStatus.CREATED).body(UserMapper.toUserResponse(salvedUser));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            UsernamePasswordAuthenticationToken userAndPass = new UsernamePasswordAuthenticationToken(request.email(), request.password());
            Authentication authenticate = authenticationManager.authenticate(userAndPass);

            User user = (User) authenticate.getPrincipal();

            String token = tokenService.generateToken(user);

            return ResponseEntity.ok(new LoginResponse(token));

        } catch (BadCredentialsException e) {
            throw new UsernameOrPasswordInvalidException("Usuario ou senha invalido!");
        }

    }

}
