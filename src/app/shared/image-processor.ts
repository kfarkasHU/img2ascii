import * as ko from "knockout";

export class ImageProcessor {

  private static _instance: ImageProcessor = new ImageProcessor();

  public static getInstance() {
    return this._instance;
  }

  public processImage(file: File) {
    this.processedImage(file);
    this.onImageProcessed$(true);
  }

  public onImageProcessed$ = ko.observable<boolean>();
  public onGrayscaleImageProcessed$ = ko.observable<boolean>();

  public processedImage = ko.observable<File>();
  public processedASCIIImage = ko.observable<string[]>();
  public processedGrayscaleImage = ko.observable<Uint8ClampedArray>();

}
