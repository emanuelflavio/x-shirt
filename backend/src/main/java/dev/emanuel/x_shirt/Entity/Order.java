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
@Table(name = "tb_order")
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    @CreationTimestamp
    @Column(name = "date_order")
    private LocalDateTime DateOrder;

    @Enumerated(EnumType.STRING)
    private StatusOrder status;

    @Column(nullable = false)
    private BigDecimal total;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private User users;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_id", referencedColumnName = "id", unique = true)
    private Payment payment;

    @OneToMany(mappedBy = "orders")
    @JsonIgnore
    private List<OrderItems> orderItems;
}
