package dev.emanuel.x_shirt.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_cart_items")
public class CartItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false, name = "price_unitary")
    private BigDecimal priceUnitary;

    @Column(nullable = false, name = "subtotal_price")
    private BigDecimal subtotalPrice;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    private Cart carts;

    @ManyToOne
    @JoinColumn(name = "variations_id")
    private Variations variations;


    @Transient
    public Shirt getProduct() {
        return this.variations != null ? this.variations.getShirts() : null;
    }

}
