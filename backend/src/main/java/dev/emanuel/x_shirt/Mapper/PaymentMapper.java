package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.response.PaymentResponse;
import dev.emanuel.x_shirt.Entity.Payment;
import lombok.experimental.UtilityClass;

@UtilityClass
public class PaymentMapper {
    public static PaymentResponse toPagamentoResponseDTO(Payment pagamento) {
        if (pagamento == null) {
            return null;
        }
        return PaymentResponse.builder()
                .id(pagamento.getId())
                .value(pagamento.getValue())
                .method(pagamento.getMethod())
                .status(pagamento.getStatus())
                .transactionId(pagamento.getTransactionId())
                .datePayment(pagamento.getDatePayment())
                .build();
    }
}
