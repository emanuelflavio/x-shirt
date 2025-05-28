package dev.emanuel.x_shirt.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_images_shirts")
public class ImagesShirts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "url_image", nullable = false)
    private String urlImage;

    private boolean main;

    @ManyToOne
    @JoinColumn(name = "variations_id")
    private Variations variations;

}
