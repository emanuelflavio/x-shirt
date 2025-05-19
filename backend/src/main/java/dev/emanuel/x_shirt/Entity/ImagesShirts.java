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

    @Column(name = "url_image", nullable = false)
    private String urlImage;

    private boolean main;

    @ManyToOne
    @JoinColumn(name = "variation_id")
    private Variations variations;

}
