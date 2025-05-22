package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.Categories;
import dev.emanuel.x_shirt.Repository.CategoriesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoriesService {

    private final CategoriesRepository categoriesRepository;

    public Categories save(Categories categories) {
        return categoriesRepository.save(categories);
    }

    public List<Categories> findAll() {
        return categoriesRepository.findAll();
    }

    public Optional<Categories> findById(Long id) {
        return categoriesRepository.findById(id);
    }

    public void deleteById(Long id) {
        categoriesRepository.deleteById(id);
    }

    public Optional<Categories> update(Long id, Categories categoriesNew) {
        Optional<Categories> categoriesOptional = categoriesRepository.findById(id);
        if (categoriesOptional.isPresent()) {
            Categories categories = categoriesOptional.get();
            categories.setName(categoriesNew.getName());
            categories.setDescription(categoriesNew.getDescription());
            categoriesRepository.save(categories);
            return Optional.of(categories);
        }
        return Optional.empty();
    }
}
