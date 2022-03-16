import * as ko from "knockout";

export function applyExternals() {
  ko.bindingHandlers.readElement = {
    init: (element, accessor) => {
      const target = accessor();
      target(element);
    }
  }
}
