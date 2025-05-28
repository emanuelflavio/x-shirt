package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.ImagesShirts;
import dev.emanuel.x_shirt.Entity.Variations;
import dev.emanuel.x_shirt.Repository.ImagesShirtsRepository;
import dev.emanuel.x_shirt.Repository.VariationsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ImagesShirtService {

    private final ImagesShirtsRepository imagesShirtsRepository;
    private final FileStorageService fileStorageService;
    private final VariationsRepository variationsRepository;

    // Criar regra para escolher a principal


    public List<ImagesShirts> findByVariationId(Long variationsId) {
        return imagesShirtsRepository.findByVariations(Variations.builder().id(variationsId).build());
    }


    public String addImagesToShirts(Long variationId, MultipartFile image) {
        Variations variations = variationsRepository.findById(variationId)
                .orElseThrow(() -> new IllegalArgumentException("Variação não encontrada"));

        if (image.isEmpty()) {
            throw new IllegalArgumentException("Arquivo de imagem vazio");
        }
            String name = fileStorageService.storeFile(image);
            ImagesShirts imageShirt = new ImagesShirts();
            imageShirt.setName(name);
            imageShirt.setUrlImage("/Users/emanu/Desktop/x-shirt/backend/src/main/resources/static/images" + name);
            imageShirt.setVariations(variations);
            imagesShirtsRepository.save(imageShirt);
        return name;

    }


}




