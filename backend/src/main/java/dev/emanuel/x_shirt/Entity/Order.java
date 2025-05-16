package dev.emanuel.x_shirt.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

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
}
