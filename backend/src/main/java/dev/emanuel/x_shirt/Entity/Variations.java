package dev.emanuel.x_shirt.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_variations")
public class Variations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String size;

    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private int stock;

    @ManyToOne
    @JoinColumn(name = "shirt_id")
    private Shirt shirts;

    @OneToMany(mappedBy = "variations")
    @JsonIgnore
    private List<OrderItems> orderItems;

    @OneToMany(mappedBy = "variations")
    @JsonIgnore
    private List<CartItems> cartItems;

    @OneToMany(mappedBy = "variations")
    @JsonIgnore
    private List<ImagesShirts> imagesShirts;
}
