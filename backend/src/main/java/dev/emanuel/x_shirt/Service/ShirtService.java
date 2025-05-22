package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.Shirt;
import dev.emanuel.x_shirt.Repository.ShirtRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ShirtService {

    private final ShirtRepository shirtRepository;

    public Shirt save(Shirt shirt) {
        Double rating = shirt.getRating() != null ? shirt.getRating() : 0.0;
        shirt.setRating(rating);
        return shirtRepository.save(shirt);
    }

    public List<Shirt> findAll() {
        return shirtRepository.findAll();
    }

    public Optional<Shirt> findById(Long id) {
        return shirtRepository.findById(id);
    }

    public void deleteById(Long id) {
        shirtRepository.deleteById(id);
    }

    public Optional<Shirt> update(Long id, Shirt shirtNew) {
        Optional<Shirt> oldShirt = shirtRepository.findById(id);
        if (oldShirt.isPresent()) {
           Shirt oldShirtNew = oldShirt.get();
           oldShirtNew.setName(shirtNew.getName());
           oldShirtNew.setDescription(shirtNew.getDescription());
           oldShirtNew.setPrice(shirtNew.getPrice());
           oldShirtNew.setMark(shirtNew.getMark());
           oldShirtNew.setGenre(shirtNew.getGenre());
           oldShirtNew.setCategories(shirtNew.getCategories());
           shirtRepository.save(oldShirtNew);
           return Optional.of(oldShirtNew);
        }
        return Optional.empty();
    }
}
