package dev.emanuel.x_shirt.Service;

import dev.emanuel.x_shirt.Config.FileStorageConfig;
import dev.emanuel.x_shirt.Controller.FileController;
import dev.emanuel.x_shirt.exception.FileStorageException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);

    private final Path fileStorageLocation;

    @Autowired
    public FileStorageService(FileStorageConfig config) {
        this.fileStorageLocation = Paths.get(config.getUploadDir()).toAbsolutePath()
                .toAbsolutePath().normalize();
        try {
            logger.info("Creating Directories");
            Files.createDirectories(this.fileStorageLocation);
        }
        catch (Exception ex) {
            logger.error("Could not create the directory where the uploaded files will be stored.");
            throw new FileStorageException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public String storeFile(MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try{
            if (fileName.contains("..")) {
                logger.error("Sorry! Filename contains invalid path sequence " + fileName);
                throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
            }
            logger.info("Saving file in disk");
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        }
        catch (Exception ex) {
            logger.error("Could not store the file " + fileName + ". Please try again.", ex);
            throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }



}
