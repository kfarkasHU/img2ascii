import * as ko from "knockout";
import { bootstrap } from "./bootstrap";

class Main {
  public startup() {
    bootstrap();
    ko.applyBindings(document.body);
  }
}

const main = new Main();
main.startup();
