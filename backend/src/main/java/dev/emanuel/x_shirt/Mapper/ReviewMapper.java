package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.request.ReviewRequest;
import dev.emanuel.x_shirt.Controller.response.ReviewResponse;
import dev.emanuel.x_shirt.Entity.Review;
import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Entity.User;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ReviewMapper {

    public static Review toReview(ReviewRequest request) {

        User user = User.builder().id(request.userId()).build();
        Shirt shirt = Shirt.builder().id(request.shirtId()).build();

        return Review.builder()
                .rating(request.rating())
                .comment(request.comment())
                .users(user)
                .shirts(shirt)
                .build();
    }

    public static ReviewResponse toReviewResponse(Review review) {

        return ReviewResponse.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .date(review.getDate())
                .userId(review.getUsers().getId())
                .shirtId(review.getShirts().getId())
                .build();
    }


}
