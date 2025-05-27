package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.request.ImagesShirtRequest;
import dev.emanuel.x_shirt.Controller.response.ImagesShirtResponse;
import dev.emanuel.x_shirt.Entity.ImagesShirts;
import dev.emanuel.x_shirt.Entity.Variations;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ImagesShirtMapper {

    public static ImagesShirts toImagesShirts(ImagesShirtRequest request) {

        Variations variations = Variations.builder().id(request.variationsId()).build();

        return ImagesShirts.builder()
                .urlImage(request.urlImage())
                .main(request.main())
                .variations(variations)
                .build();
    }

    public static ImagesShirtResponse toImagesShirtResponse(ImagesShirts imagesShirts) {

        return ImagesShirtResponse.builder()
                .id(imagesShirts.getId())
                .urlImage(imagesShirts.getUrlImage())
                .main(imagesShirts.isMain())
                .variationsId(imagesShirts.getVariations().getId())
                .build();
    }
}
