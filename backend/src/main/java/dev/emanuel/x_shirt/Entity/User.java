package dev.emanuel.x_shirt.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeUser type;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Order> orders;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Cart> carts;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Review> reviews;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Address> addresses;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<Favorites> favorites;




}
