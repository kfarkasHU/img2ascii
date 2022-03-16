import { ComponentDescriptor } from "../../../core/component";

class HeaderComponent {

}

export const HeaderComopnentDescriptor = new ComponentDescriptor(
  "ascii-header",
  HeaderComponent,
  require("./header.component.html"),
  require("./header.component.scss")
);