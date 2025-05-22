package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.Review;
import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Repository.ReviewRepository;
import dev.emanuel.x_shirt.Repository.ShirtRepository;
import dev.emanuel.x_shirt.Repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final ShirtRepository shirtRepository;

    public Review save(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> findAll() {
        return reviewRepository.findAll();
    }

    public Optional<Review> findById(Long id) {
        return reviewRepository.findById(id);
    }

    public void deleteById(Long id) {
        reviewRepository.deleteById(id);
    }

    public Optional<Review> update(Long id, Review reviewNew) {
        Optional<Review> oldReview = reviewRepository.findById(id);
        if (oldReview.isPresent()) {
            Review review = oldReview.get();
            review.setRating(reviewNew.getRating());
            review.setComment(reviewNew.getComment());
            review.setDate(reviewNew.getDate());
            reviewRepository.save(review);
            return Optional.of(review);
        }
        return Optional.empty();
    }
}
