package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.response.AddressResponse;
import dev.emanuel.x_shirt.Entity.Address;
import dev.emanuel.x_shirt.Entity.User;
import dev.emanuel.x_shirt.Mapper.AddressMapper;
import dev.emanuel.x_shirt.Service.AddressService;
import dev.emanuel.x_shirt.exception.AddressNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("xshirt/address")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @GetMapping("/listAll")
    public ResponseEntity<List<AddressResponse>> listAllAddresses(
            @AuthenticationPrincipal User user){

        if(user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Address> addresses = addressService.listByUser(user);
        return ResponseEntity.ok(addresses
                .stream()
                .map(AddressMapper::toAddressResponse)
                .toList();)
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressResponse> findAddressById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user){

        if(user == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        try{
            Address address = addressService.findByIdAndUser(id, user);
            return ResponseEntity.ok(AddressMapper.toAddressResponse(address));
        }
        catch(AddressNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }





}
