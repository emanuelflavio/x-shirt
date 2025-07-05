package dev.emanuel.x_shirt.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.aspectj.weaver.ast.Or;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "tb_payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private MethodPayment method;

    @Enumerated(EnumType.STRING)
    private StatusPayment status;

    @Column(nullable = false)
    private BigDecimal value;

    @CreationTimestamp
    @Column(name = "date_payment")
    private LocalDateTime datePayment;

    @Column(name = "transaction_id")
    private String transactionId;

    @OneToMany(mappedBy = "payment")
    @JsonIgnore
    private List<Order> order;

}
