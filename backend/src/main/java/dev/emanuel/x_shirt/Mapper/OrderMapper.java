package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.response.OrderResponse;
import dev.emanuel.x_shirt.Entity.Order;
import lombok.experimental.UtilityClass;

@UtilityClass
public class OrderMapper {

    public static OrderResponse toOrderResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .DateOrder(order.getDateOrder())
                .status(order.getStatus())
                .total(order.getTotal())
                .userId(order.getUsers().getId())
                .paymentsId(order.getPayment().getId())
                .orderItems(order.getOrderItems())
                .build();
    }
}
