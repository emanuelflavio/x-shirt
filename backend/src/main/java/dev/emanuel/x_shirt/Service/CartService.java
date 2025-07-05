package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.Cart;
import dev.emanuel.x_shirt.Entity.CartItems;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Entity.Variations;
import dev.emanuel.x_shirt.Repository.CartRepository;
import dev.emanuel.x_shirt.Repository.ShirtRepository; // Necessário para pegar o preço da camisa
import dev.emanuel.x_shirt.Repository.VariationsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final VariationsRepository variationsRepository;
    private final ShirtRepository shirtRepository;

    @Transactional
    public Cart getOrCreateCart(User user) {
        Optional<Cart> optCart = Optional.ofNullable(cartRepository.findByUsers(user));
        if (optCart.isPresent()) {
            return optCart.get();
        }
        Cart cart = new Cart();
        cart.setUsers(user);
        cart.setActive(true);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart addItemToCart (User user, Long variationId, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }

        Cart cart = getOrCreateCart(user);
        Variations variations = variationsRepository.findById(variationId)
                .orElseThrow(() -> new IllegalArgumentException("Variation " + variationId + " not found"));


        if (variations.getStock() < quantity) {
            throw new IllegalArgumentException("Not enough stock for this variation. Available: " + variations.getStock());
        }

        Optional<CartItems> existItem = cart.getCartItems().stream()
                .filter(cartItems -> cartItems.getVariations().getId().equals(variationId))
                .findFirst();

        if (existItem.isPresent()) {
            CartItems cartItems = existItem.get();
            int newTotalQuantity = cartItems.getQuantity() + quantity;

            if (variations.getStock() < newTotalQuantity) {
                throw new IllegalArgumentException("Adding this quantity would exceed stock. Available: " + variations.getStock());
            }

            cartItems.setQuantity(newTotalQuantity);
            cartItems.setSubtotalPrice(cartItems.getPriceUnitary().multiply(BigDecimal.valueOf(newTotalQuantity)));

        }
        else {
            CartItems cartItems = new CartItems();
            cartItems.setCarts(cart);
            cartItems.setQuantity(quantity);
            cartItems.setVariations(variations);

            BigDecimal variationPrice = variations.getShirts().getPrice();
            if (variationPrice == null) {
                throw new IllegalStateException("Variation price is null for variation ID: " + variationId);
            }
            cartItems.setPriceUnitary(variationPrice);

            cartItems.setSubtotalPrice(variationPrice.multiply(BigDecimal.valueOf(quantity)));

            cart.getCartItems().add(cartItems);

        }

        return cartRepository.save(cart);
    }

    @Transactional
    public Cart updateCartItemsQuantity(User user, Long cartItemId, int quantity) {
        Cart cart = getOrCreateCart(user);

        Optional<CartItems> itemUpdate = cart.getCartItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst();

        if (itemUpdate.isEmpty()) {
            throw new IllegalArgumentException("Item " + cartItemId + " not found in cart");
        }
        CartItems cartItems = itemUpdate.get();

        if(quantity <= 0) {
            cart.getCartItems().remove(cartItems);
        }
        else {
            if(quantity > cartItems.getVariations().getStock()) {
                throw new IllegalArgumentException("Quantity " + quantity + " is greater than stock for " + cartItems.getVariations().getShirts().getName() + ". Available: " + cartItems.getVariations().getStock());
            }
            cartItems.setQuantity(quantity);
            cartItems.setSubtotalPrice(cartItems.getPriceUnitary().multiply(BigDecimal.valueOf(quantity)));
        }
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart removeItemFromCart(User user, Long cartItemId) {
        Cart cart = getOrCreateCart(user);

        Optional<CartItems> item = cart.getCartItems().stream()
                .filter(cartItem -> cartItem.getId().equals(cartItemId))
                .findFirst();

        if (item.isEmpty()) {
            throw new IllegalArgumentException("Item " + cartItemId + " not found in cart");
        }

        CartItems cartItems = item.get();

        cart.getCartItems().remove(cartItems);
        return cartRepository.save(cart);
    }

    @Transactional
    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cart.getCartItems().clear();
        cartRepository.save(cart);
    }
}