package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.request.CategoriesRequest;
import dev.emanuel.x_shirt.Controller.response.CategoriesResponse;
import dev.emanuel.x_shirt.Entity.Categories;
import dev.emanuel.x_shirt.Mapper.CategoriesMapper;
import dev.emanuel.x_shirt.Mapper.ShirtMapper;
import dev.emanuel.x_shirt.Service.CategoriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("xshirt/categories")
@RequiredArgsConstructor
public class CategoriesController {

    private final CategoriesService categoriesService;

    @PostMapping
    public ResponseEntity<CategoriesResponse> saveCategories(@RequestBody CategoriesRequest request) {
        Categories savedCategories = categoriesService.save(CategoriesMapper.toCategories(request));
        return ResponseEntity.ok(CategoriesMapper.toCategoriesResponse(savedCategories));
    }

    @GetMapping()
    public ResponseEntity<List<CategoriesResponse>> findAllShirts() {
        return ResponseEntity.ok(categoriesService.findAll()
                .stream()
                .map(CategoriesMapper::toCategoriesResponse)
                .toList()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriesResponse> update(@PathVariable Long id, @RequestBody CategoriesRequest request) {
        return categoriesService.update(id, CategoriesMapper.toCategories(request))
                .map(categories -> ResponseEntity.ok(CategoriesMapper.toCategoriesResponse(categories)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Categories> optMovie = categoriesService.findById(id);
        if (optMovie.isPresent()) {
            categoriesService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }


}
