package dev.emanuel.x_shirt.exception;

public class UsernameOrPasswordInvalidException extends RuntimeException {
    public UsernameOrPasswordInvalidException(String message) {
        super(message);
    }
}
