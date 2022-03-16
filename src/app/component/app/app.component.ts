import { ComponentDescriptor } from "../../../core/component";

class AppComponent {

}

export const AppComponentDescriptor = new ComponentDescriptor(
  "ascii-app",
  AppComponent,
  require("./app.component.html"),
  require("./app.component.scss")
)