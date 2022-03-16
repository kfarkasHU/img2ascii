import {
  AppComponentDescriptor,
  HeaderComopnentDescriptor,
  WorkspaceLayoutDescriptor,
  ThumbnailComponentDescriptor,
  FileUploadComponentDescriptor
} from "./component/component.module";

export const AppModule = Object.freeze({
  components: [
    AppComponentDescriptor,
    HeaderComopnentDescriptor,
    WorkspaceLayoutDescriptor,
    ThumbnailComponentDescriptor,
    FileUploadComponentDescriptor
  ]
})