package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional; // Importar

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User save(User user){
        String password = user.getPassword();
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id){
        return userRepository.findById(id);
    }

    public List<User> findAll(){
        return userRepository.findAll();
    }

    @Transactional
    public void deleteById(Long id){
        userRepository.deleteById(id);
    }

    @Transactional
    public Optional<User> update(Long id, User updatedUserRequest){
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isPresent()){
            User existingUser = userOptional.get();


            if (updatedUserRequest.getName() != null && !updatedUserRequest.getName().isEmpty()) {
                existingUser.setName(updatedUserRequest.getName());
            }

            if (updatedUserRequest.getEmail() != null && !updatedUserRequest.getEmail().isEmpty()) {
                existingUser.setEmail(updatedUserRequest.getEmail());
            }

            if (updatedUserRequest.getPassword() != null && !updatedUserRequest.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(updatedUserRequest.getPassword()));
            }

            if (updatedUserRequest.getType() != null && !updatedUserRequest.getType().isEmpty()) {
                existingUser.setType(updatedUserRequest.getType());
            }


            return Optional.of(userRepository.save(existingUser));
        }
        return Optional.empty();
    }
}