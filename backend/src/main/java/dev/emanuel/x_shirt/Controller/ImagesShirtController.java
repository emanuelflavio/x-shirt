package dev.emanuel.x_shirt.Controller;

import dev.emanuel.x_shirt.Controller.response.UploadFileResponse;
import dev.emanuel.x_shirt.Service.FileStorageService;
import dev.emanuel.x_shirt.Service.ImagesShirtService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("xshirt/images/")
@RequiredArgsConstructor
public class ImagesShirtController {

    public final ImagesShirtService imageShirtService;

    public UploadFileResponse uploadFile(MultipartFile file, Long id) {
        String fileName = imageShirtService.addImagesToShirts(id, file);
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("xshirt/image/")
                .path(fileName)
                .toUriString();
        return new UploadFileResponse(fileName, fileDownloadUri, file.getContentType(), file.getSize());
    }

    @PostMapping("/{id}")
    public List<UploadFileResponse> uploadFiles(@RequestParam("files") List<MultipartFile> files,
                                                @PathVariable Long id) {
        return files
                .stream()
                .map(file -> uploadFile(file, id))
                .toList();
    }
}
