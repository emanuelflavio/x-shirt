package dev.emanuel.x_shirt.exception;

public class FavoritesNotFoundException extends RuntimeException {
    public FavoritesNotFoundException(String message) {
        super(message);
    }
}
