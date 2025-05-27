package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.ImagesShirts;
import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Entity.Variations;
import dev.emanuel.x_shirt.Repository.ImagesShirtsRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RequiredArgsConstructor
@Service
public class ImagesShirtService {

    private final ImagesShirtsRepository imagesShirtsRepository;

    public List<ImagesShirts> findByCamisaId(Long variationsId){
        return imagesShirtsRepository.findByVariations(Variations.builder().id(variationsId).build());
    }





}
