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
@Table(name = "tb_address")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;

    private String city;

    private String state;

    @Column(name = "zip_code")
    private String zipCode;

    private String number;

    private String complement;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private User users;

    @OneToMany(mappedBy = "address")
    @JsonIgnore
    private List<Order> orders;

}
