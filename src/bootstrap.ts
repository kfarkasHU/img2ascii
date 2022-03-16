import * as ko from "knockout";
import { AppModule } from "./app/app.module";
import { ComponentDescriptor } from "./core/component";
import { applyExternals } from "./core/ko.externals";

const cssAppended: string[] = [];

export function bootstrap() {
  initializeKo();
  bootstrapComponents();
}

function initializeKo() {
  applyExternals();
}

function bootstrapComponents() {
  const components = AppModule.components;
  components.forEach(m => bootstrapComponent(m));
}

function bootstrapComponent(component: ComponentDescriptor) {
  ko.components.register(
    component.selector,
    {
      template: component.template.default,
      viewModel: component.component,
    }
  );

  applyCss(component.selector, component.style.default);
}

function applyCss(name: string, url: string) {
  const cssName = `component-css_${name}`;
  if(cssAppended.includes(cssName)) return;
  const link = createCssLink(url);
  // document.head.appendChild(link);
}

function createCssLink(url: string) {
  const element = document.createElement("link");
  element.rel = "stylesheet";
  element.type = "text/css";
  element.href = url;
  element.media = 'all';
  return element;
}