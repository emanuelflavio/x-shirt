package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.request.CartItemRequest;
import dev.emanuel.x_shirt.Controller.response.CartResponse;
import dev.emanuel.x_shirt.Entity.Cart;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Mapper.CartMapper;
import dev.emanuel.x_shirt.Service.CartService;
import dev.emanuel.x_shirt.exception.ItemNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("xshirt/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/cartUse")
    public ResponseEntity<CartResponse> createOrUseCart(@AuthenticationPrincipal User user) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        Cart cart = cartService.getOrCreateCart(user);
        return ResponseEntity.ok(CartMapper.toCartResponse(cart));
    }

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addItemToCart(@AuthenticationPrincipal User user,
                                                      @RequestBody CartItemRequest item) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (item.variationsId() == null || item.quantity() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            Cart cart = cartService.addItemToCart(
                    user,
                    item.variationsId(),
                    item.quantity()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(CartMapper.toCartResponse(cart));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }


    }

    @PutMapping("/update")
    public ResponseEntity<CartResponse> updateQuantityItem(
            @AuthenticationPrincipal User user,
            @RequestBody CartItemRequest item
    ) {
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (item.variationsId() == null || item.quantity() <= 0) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            Cart cart = cartService.updateCartItemsQuantity(
                    user,
                    item.variationsId(),
                    item.quantity()
            );
            return ResponseEntity.status(HttpStatus.OK).body(CartMapper.toCartResponse(cart));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (ItemNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CartResponse> deleteItemFromCart(
            @AuthenticationPrincipal User user,
            @PathVariable Long id) {

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (id == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        try {
            Cart cart = cartService.removeItemFromCart(user, id);
            return ResponseEntity.status(HttpStatus.OK).body(CartMapper.toCartResponse(cart));
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(
            @AuthenticationPrincipal User user
    ) {

        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        try {
            cartService.clearCart(user);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
