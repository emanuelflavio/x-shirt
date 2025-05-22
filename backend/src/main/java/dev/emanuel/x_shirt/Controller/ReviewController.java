package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.request.ReviewRequest;
import dev.emanuel.x_shirt.Controller.response.ReviewResponse;
import dev.emanuel.x_shirt.Entity.Review;
import dev.emanuel.x_shirt.Mapper.ReviewMapper;
import dev.emanuel.x_shirt.Service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("xshirt/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping()
    public ResponseEntity<ReviewResponse> saveReview(@RequestBody ReviewRequest reviewRequest) {
        Review savedReview = reviewService.save(ReviewMapper.toReview(reviewRequest));
        return ResponseEntity.ok(ReviewMapper.toReviewResponse(savedReview));
    }

    @GetMapping()
    public ResponseEntity<List<ReviewResponse>> findAllReviews() {
        return ResponseEntity.ok(reviewService.findAll()
                .stream()
                .map(ReviewMapper::toReviewResponse)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponse> findById(@PathVariable Long id) {
        return reviewService.findById(id)
                .map(review -> ResponseEntity.ok(ReviewMapper.toReviewResponse(review)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponse> updateReview(@PathVariable Long id, @RequestBody ReviewRequest reviewRequest) {
        return reviewService.update(id, ReviewMapper.toReview(reviewRequest))
                .map(review -> ResponseEntity.ok(ReviewMapper.toReviewResponse(review)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Review> review = reviewService.findById(id);
        if (review.isPresent()) {
            reviewService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
