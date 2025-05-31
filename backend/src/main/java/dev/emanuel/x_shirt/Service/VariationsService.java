package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Entity.Variations;
import dev.emanuel.x_shirt.Repository.VariationsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class VariationsService {

    private final VariationsRepository variationsRepository;

    public Variations save(Variations variations) {
        return variationsRepository.save(variations);
    }

    public List<Variations> findAll() {
        return variationsRepository.findAll();
    }

    public Optional<Variations> findById(Long id) {
        return variationsRepository.findById(id);
    }

    public void deleteById(Long id) {
        variationsRepository.deleteById(id);
    }

    public Optional<Variations> update(Long id, Variations variations) {
        Optional<Variations> oldVariations = variationsRepository.findById(id);
        if (oldVariations.isPresent()) {
            Variations oldVariationsNew = oldVariations.get();
            oldVariationsNew.setSize(variations.getSize());
            oldVariationsNew.setStock(variations.getStock());
            oldVariationsNew.setColor(variations.getColor());
            oldVariationsNew.setShirts(variations.getShirts());
            variationsRepository.save(oldVariationsNew);
            return Optional.of(oldVariationsNew);
        }
        return Optional.empty();
    }

    public List<Variations> findByShirts(Long id) {
        return variationsRepository.findByShirtsId(id);
    }
}
