package dev.emanuel.x_shirt.Mapper;

import dev.emanuel.x_shirt.Controller.request.AddressRequest;
import dev.emanuel.x_shirt.Controller.response.AddressResponse;
import dev.emanuel.x_shirt.Entity.Address;
import lombok.experimental.UtilityClass;

@UtilityClass
public class AddressMapper {

    public static Address toAddress(AddressRequest request) {
        return Address.builder()
                .street(request.street())
                .city(request.city())
                .state(request.state())
                .zipCode(request.zipCode())
                .number(request.number())
                .complement(request.complement())
                .build();
    }

    public static AddressResponse toAddressResponse(Address address) {
        return AddressResponse.builder()
                .street(address.getStreet())
                .city(address.getCity())
                .state(address.getState())
                .zipCode(address.getZipCode())
                .number(address.getNumber())
                .complement(address.getComplement())
                .build();
    }
}
