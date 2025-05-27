package dev.emanuel.x_shirt.Controller.response;

import java.io.Serializable;

public record UploadFileResponse(
        String fileName,
        String fileDownloadUri,
        String fileType,
        long size
){
}
