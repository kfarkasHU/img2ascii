import { ComponentDescriptor } from "../../../core/component";

class UploadComponent {

}

export const UploadComponentDescriptor = new ComponentDescriptor(
  "ascii-upload",
  UploadComponent,
  require("./upload.component.html"),
  require("./upload.component.scss")
);
