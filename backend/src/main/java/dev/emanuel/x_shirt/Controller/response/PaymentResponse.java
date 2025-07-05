package dev.emanuel.x_shirt.Controller.response;

import dev.emanuel.x_shirt.Entity.MethodPayment;
import dev.emanuel.x_shirt.Entity.StatusPayment;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record PaymentResponse(
        Long id,
        Long orderId,
        BigDecimal value,
        MethodPayment method,
        StatusPayment status,
        String transactionId,
        LocalDateTime datePayment
) {}