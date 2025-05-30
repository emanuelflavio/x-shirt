package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Entity.Address;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Repository.AddressRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {

    private final AddressRepository addressRepository;

    public List<Address> listByUser(User user){
        return addressRepository.findByUsers(user);
    }

    public Address findByIdAndUser(Long id, User user){
        return addressRepository.findByIdAndUsers(id, user);
    }

    @Transactional
    public Address save(User user, Address address){
        address.setUsers(user);
        return addressRepository.save(address);
    }

    @Transactional
    public Address update(Address address, Long id){
        Address oldAddress = addressRepository.findByIdAndUsers(id, address.getUsers());

        oldAddress.setCity(address.getCity());
        oldAddress.setState(address.getState());
        oldAddress.setZipCode(address.getZipCode());
        oldAddress.setComplement(address.getComplement());
        oldAddress.setNumber(address.getNumber());
        oldAddress.setStreet(address.getStreet());

        return addressRepository.save(oldAddress);
    }

    @Transactional
    public void delete(Long id, User user){
        Address address = addressRepository.findByIdAndUsers(id, user);
        addressRepository.delete(address);
    }


}
