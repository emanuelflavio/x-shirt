package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.request.ShirtRequest;
import dev.emanuel.x_shirt.Controller.response.ShirtResponse;
import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Mapper.ShirtMapper;
import dev.emanuel.x_shirt.Service.ShirtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("xshirt/shirt")
@RequiredArgsConstructor
public class ShirtController {

    private final ShirtService shirtService;

    @PostMapping()
    public ResponseEntity<ShirtResponse> saveShirt(@RequestBody ShirtRequest shirtRequest) {
        Shirt savedShirt = shirtService.save(ShirtMapper.toShirt(shirtRequest));
        return ResponseEntity.ok(ShirtMapper.toShirtResponse(savedShirt));
    }

    @GetMapping()
    public ResponseEntity<List<ShirtResponse>> findAllShirts() {
        return ResponseEntity.ok(shirtService.findAll()
                .stream()
                .map(ShirtMapper::toShirtResponse)
                .toList()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShirtResponse> update(@PathVariable Long id, @RequestBody ShirtRequest request) {
        return shirtService.update(id, ShirtMapper.toShirt(request))
                .map(movie -> ResponseEntity.ok(ShirtMapper.toShirtResponse(movie)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Optional<Shirt> optMovie = shirtService.findById(id);
        if (optMovie.isPresent()) {
            shirtService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }



}
