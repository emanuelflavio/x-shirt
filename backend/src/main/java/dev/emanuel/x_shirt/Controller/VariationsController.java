package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.request.VariationsRequest;
import dev.emanuel.x_shirt.Controller.response.VariationsResponse;
import dev.emanuel.x_shirt.Entity.Variations;
import dev.emanuel.x_shirt.Mapper.VariationsMapper;
import dev.emanuel.x_shirt.Repository.VariationsRepository;
import dev.emanuel.x_shirt.Service.VariationsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("xshirt/variations")
@RequiredArgsConstructor
public class VariationsController {

    private final VariationsService variationsService;

    @PostMapping()
    public ResponseEntity<VariationsResponse> saveVariations(@RequestBody VariationsRequest request) {
        Variations savedVariations = variationsService.save(VariationsMapper.toVariations(request));
        return ResponseEntity.ok(VariationsMapper.toVariationsResponse(savedVariations));
    }

    @GetMapping()
    public ResponseEntity<List<VariationsResponse>> findAllVariations() {
        return ResponseEntity.ok(variationsService.findAll()
                .stream()
                .map(VariationsMapper::toVariationsResponse)
                .toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VariationsResponse> findVariationById(@PathVariable Long id) {
        return variationsService.findById(id)
                .map(variations -> ResponseEntity.ok(VariationsMapper.toVariationsResponse(variations)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<VariationsResponse> updateVariation(@PathVariable Long id, @RequestBody VariationsRequest request) {
        return variationsService.update(id, VariationsMapper.toVariations(request))
                .map(variations -> ResponseEntity.ok(VariationsMapper.toVariationsResponse(variations)))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVariation(@PathVariable Long id) {
        Optional<Variations> variations = variationsService.findById(id);
        if (variations.isPresent()) {
            variationsService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("shirt/{id}")
    public ResponseEntity<List<VariationsResponse>> findByShirt(@PathVariable Long id) {
        return ResponseEntity.ok(variationsService.findByShirts(id)
                .stream()
                .map(VariationsMapper::toVariationsResponse)
                .toList());
    }



}
