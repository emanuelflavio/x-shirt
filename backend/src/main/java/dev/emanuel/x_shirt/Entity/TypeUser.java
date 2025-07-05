package dev.emanuel.x_shirt.Entity;

public enum TypeUser {
    ADMIN,
    USER,
    ;

    public boolean isEmpty() {
        return this == ADMIN || this == USER;
    }
}
