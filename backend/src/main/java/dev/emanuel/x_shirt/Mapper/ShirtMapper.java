package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.request.ShirtRequest;
import dev.emanuel.x_shirt.Controller.response.ShirtResponse;
import dev.emanuel.x_shirt.Entity.*;
import lombok.RequiredArgsConstructor;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ShirtMapper {


    public static Shirt toShirt(ShirtRequest request) {

        Categories category = Categories.builder().id(request.categoriesId()).build();


        return Shirt.builder()
                .name(request.name())
                .description(request.description())
                .genre(request.genre())
                .price(request.price())
                .mark(request.mark())
                .categories(category)
                .build();
    }

    public static ShirtResponse toShirtResponse(Shirt shirt) {

        return ShirtResponse.builder()
                .id(shirt.getId())
                .name(shirt.getName())
                .description(shirt.getDescription())
                .genre(shirt.getGenre())
                .rating(shirt.getRating())
                .price(shirt.getPrice())
                .mark(shirt.getMark())
                .categorie(shirt.getCategories().getName())
                .favorites(shirt.getFavorites())
                .reviews(shirt.getReviews())
                .variations(shirt.getVariations())
                .build();
    }


}
