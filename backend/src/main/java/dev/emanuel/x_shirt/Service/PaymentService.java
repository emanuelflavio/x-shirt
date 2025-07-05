package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.MethodPayment;
import dev.emanuel.x_shirt.Entity.Order;
import dev.emanuel.x_shirt.Entity.Payment;
import dev.emanuel.x_shirt.Repository.PaymentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PaymentService {


    private final PaymentRepository pagamentoRepository;

    @Transactional
    public Payment processPayment(Order order) {

        Payment paymentRecord = Payment.builder()
                .value(order.getTotal())
                .method(order.getPayment().getMethod())
                .status(order.getPayment().getStatus())
                .transactionId("MOCK_TXN_" + System.currentTimeMillis())
                .datePayment(LocalDateTime.now())
                .build();


        pagamentoRepository.save(paymentRecord);
        return paymentRecord;
    }

}
