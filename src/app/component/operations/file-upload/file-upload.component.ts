import * as ko from "knockout";
import { ComponentDescriptor } from "../../../../core/component";
import { ImageProcessor } from "../../../shared/image-processor";
import { FILE_UPLOAD_CONFIG } from "./file-upload.config";

class FileUploadComponent {

  public allowedFileTypes = ko.observable<string>();

  private imageProcessor: ImageProcessor = ImageProcessor.getInstance();

  constructor() {
    this.allowedFileTypes(FILE_UPLOAD_CONFIG.allowedFileTypes.join(", "));
  }

  public imageSelected(file: File) {
    this.imageProcessor.processImage(file);
  }

}

export const FileUploadComponentDescriptor = new ComponentDescriptor(
  "ascii-file-upload",
  FileUploadComponent,
  require("./file-upload.component.html"),
  require("./file-upload.component.scss")
);
