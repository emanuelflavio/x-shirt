package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.*;
import dev.emanuel.x_shirt.Repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static dev.emanuel.x_shirt.Entity.StatusOrder.*;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final AddressRepository addressRepository;
    private final PaymentRepository paymentRepository;
    private final VariationsRepository variationsRepository;
    private final CartService cartService;

    public List<Order> findByUser(User user) {
        return orderRepository.findByUsers(user);
    }

    public Optional<Order> findByIdAndUser(Long id, User user) {
        return orderRepository.findByIdAndUsers(id, user);
    }

    @Transactional
    public Order create(User user, Long addressId, Long paymentId) {
        Cart cart = cartRepository.findByUsers(user);

        if (cart.getCartItems().isEmpty()) {
            throw new IllegalArgumentException("No cart items found");
        }
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new IllegalArgumentException("No address found"));

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new IllegalArgumentException("No payment found"));

        Order order = Order.builder()
                .users(user)
                .DateOrder(LocalDateTime.now())
                .payment(payment)
                .status(AWAITING_PAYMENT)
                .address(address)
                .build();

        BigDecimal total;

        List<OrderItems> orderItems = cart.getCartItems()
                .stream()
                .map(cartItems -> {
                    Variations variations = cartItems.getVariations();

                    if (variations.getStock() < cartItems.getQuantity()) {
                        throw new IllegalArgumentException("Stock less than cart items");
                    }

                    variations.setStock(variations.getStock() - cartItems.getQuantity());
                    variationsRepository.save(variations);

                    return OrderItems.builder()
                            .orders(order)
                            .quantity(cartItems.getQuantity())
                            .variations(variations)
                            .priceUnitary(cartItems.getPriceUnitary())
                            .subtotalPrice(cartItems.getSubtotalPrice())
                            .subtotalPrice(cartItems.getPriceUnitary()
                                    .multiply(BigDecimal.valueOf(cartItems.getQuantity())))
                            .build();
                }).toList();

        order.setOrderItems(orderItems);

        total = orderItems.stream()
                .map(item -> item.getPriceUnitary().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotal(total);

        Order orderNew = orderRepository.save(order);

        cartService.clearCart(user);

        return orderNew;
    }

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order updateStatus(Long id, StatusOrder statusOrder) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No order found"));

        if (!isValidStatusTransition(order.getStatus(), statusOrder)) {
            throw new IllegalArgumentException("Invalid status transition");
        }
        order.setStatus(statusOrder);
        return orderRepository.save(order);
    }


    private boolean isValidStatusTransition(StatusOrder currentStatus, StatusOrder newStatus) {
        return switch (currentStatus) {
            case AWAITING_PAYMENT -> newStatus.equals(PAYMENT_CONFIRMED) || newStatus.equals(CANCELED);
            case PAYMENT_CONFIRMED -> newStatus.equals(PROCESSING) || newStatus.equals(CANCELED);
            case PROCESSING -> newStatus.equals(SHIPPED) || newStatus.equals(CANCELED);
            case SHIPPED -> newStatus.equals(DELIVERED) || newStatus.equals(RETURNED);
            case DELIVERED -> newStatus.equals(RETURNED);
            default -> false;
        };
    }


}
