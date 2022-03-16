import { ComponentDescriptor } from "../../../core/component";

class WorkspaceLayout {

}

export const WorkspaceLayoutDescriptor = new ComponentDescriptor(
  "ascii-workspace-layout",
  WorkspaceLayout,
  require("./workspace-layout.component.html"),
  require("./workspace-layout.component.scss")
);
