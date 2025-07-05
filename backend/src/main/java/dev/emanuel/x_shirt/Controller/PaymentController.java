// dev.emanuel.x_shirt.Controller.PagamentoController.java
package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.response.PaymentResponse;
import dev.emanuel.x_shirt.Entity.Order;
import dev.emanuel.x_shirt.Entity.Payment;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Mapper.PaymentMapper;
import dev.emanuel.x_shirt.Repository.OrderRepository;
import dev.emanuel.x_shirt.Repository.PaymentRepository;
import dev.emanuel.x_shirt.exception.ItemNotFoundException;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/xshirt/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentRepository pagamentoRepository;
    private final OrderRepository orderRepository;

    @GetMapping("/pedidos/{pedidoId}/pagamento")
    public ResponseEntity<PaymentResponse> getPaymentStatus(
            @PathVariable Long pedidoId,
            @AuthenticationPrincipal User currentUser
    ) {
        if (currentUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Order order = orderRepository.findById(pedidoId)
                .orElseThrow(() -> new ItemNotFoundException("Pedido não encontrado com ID: " + pedidoId));

        boolean isAdmin = false;
        if (!order.getUsers().getId().equals(currentUser.getId()) && !isAdmin) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }


        Payment pagamento = pagamentoRepository.findByOrder(order)
                .orElseThrow(() -> new ItemNotFoundException("Pagamento não encontrado para o pedido com ID: " + pedidoId));


        return ResponseEntity.ok(PaymentMapper.toPagamentoResponseDTO(pagamento));
    }

 }
