package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.request.FinalizeOrderRequest;
import dev.emanuel.x_shirt.Controller.request.UpdateOrderStatusRequest;
import dev.emanuel.x_shirt.Controller.response.OrderResponse;
import dev.emanuel.x_shirt.Entity.Order;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Mapper.OrderMapper;
import dev.emanuel.x_shirt.Service.OrderService;
import dev.emanuel.x_shirt.exception.OrderNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("xshirt/order")
public class OrderController {

    private final OrderService orderService;

    @GetMapping("/my")
    public ResponseEntity<List<OrderResponse>> findAll(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(orderService.findByUser(user).stream()
                .map(OrderMapper::toOrderResponse)
                .collect(Collectors.toList()));
    }


    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> findByIdAndUser(@PathVariable Long id,
                                                  @AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try{
            Order order = orderService.findByIdAndUser(id, user)
                    .orElseThrow(() -> new OrderNotFoundException("Order not found or not belongs user"));
            return ResponseEntity.ok(OrderMapper.toOrderResponse(order));
        }
        catch (OrderNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/finalize")
    public ResponseEntity<OrderResponse> finalizeOrder(@AuthenticationPrincipal User user,
                                                       @RequestBody FinalizeOrderRequest request
                                                       ){
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try{
            System.out.println(request.toString());
            Order order = orderService.create(user, request.addressId(), request.paymentId());
            return ResponseEntity.status(HttpStatus.CREATED).body(OrderMapper.toOrderResponse(order));
        }catch (IllegalAccessError | InstantiationError e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @GetMapping("admin/all")
    public ResponseEntity<List<OrderResponse>> listAllOrder() {
        List<Order> orders = orderService.findAll();
        return ResponseEntity.ok(orders.stream().map(OrderMapper::toOrderResponse)
                .toList());
    }

    @PutMapping("status/{id}")
    public ResponseEntity<OrderResponse> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody UpdateOrderStatusRequest request
    ){
        if (request.newStatus() == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        try{
            Order order = orderService.updateStatus(id, request.newStatus());
            return ResponseEntity.ok(OrderMapper.toOrderResponse(order));
        }
        catch (OrderNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch (IllegalAccessError e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }



}
