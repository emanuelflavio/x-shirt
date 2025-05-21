package dev.emanuel.x_shirt.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_favorites")
public class Favorites {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime date_favorite;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private User users;

    @ManyToOne
    @JoinColumn(name = "shirt_id")
    private Shirt shirts;
}
