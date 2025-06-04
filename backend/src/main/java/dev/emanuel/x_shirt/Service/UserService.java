package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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

    public void deleteById(Long id){
        userRepository.deleteById(id);
    }

    public Optional<User> update(Long id, User user){
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isPresent()){
            User userNew = userOptional.get();
            userNew.setName(userNew.getName());
            userNew.setPassword(passwordEncoder.encode(userNew.getPassword()));
            userNew.setEmail(user.getEmail());
            return Optional.of(userNew);
        }
        return Optional.empty();
    }

}
