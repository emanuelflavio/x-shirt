package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.request.CategoriesRequest;
import dev.emanuel.x_shirt.Controller.response.CategoriesResponse;
import dev.emanuel.x_shirt.Entity.Categories;
import lombok.experimental.UtilityClass;

@UtilityClass
public class CategoriesMapper {

    public static Categories toCategories(CategoriesRequest request) {
        return Categories.builder()
                .name(request.name())
                .description(request.description())
                .build();
    }

    public static CategoriesResponse toCategoriesResponse(Categories categories) {
        return CategoriesResponse.builder()
                .id(categories.getId())
                .name(categories.getName())
                .description(categories.getDescription())
                .shirts(categories.getShirts())
                .build();
    }
}
