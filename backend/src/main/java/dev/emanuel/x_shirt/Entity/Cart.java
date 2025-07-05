package dev.emanuel.x_shirt.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_carts")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean active;

    private BigDecimal total;

    @CreationTimestamp
    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private User users;

    @OneToMany(mappedBy = "carts", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CartItems> cartItems;


    @Transient
    public BigDecimal getTotal() {
        if (cartItems == null || cartItems.isEmpty()) {
            return BigDecimal.ZERO;
        }
        return cartItems.stream()
                .map(CartItems::getSubtotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
