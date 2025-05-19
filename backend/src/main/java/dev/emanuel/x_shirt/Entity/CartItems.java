package dev.emanuel.x_shirt.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_cart_items")
public class CartItems {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart carts;

    @ManyToOne
    @JoinColumn(name = "variations_id")
    private Variations variations;


}
