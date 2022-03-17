import * as ko from "knockout";
import { ImageWrapper } from "./lib/image-wrapper";
import { Pixel } from "./pixel";

export class ImageProcessor {

  private _image: ImageWrapper = new ImageWrapper();
  private static _instance: ImageProcessor = new ImageProcessor();

  public static getInstance() {
    return this._instance;
  }

  public setScale(standardSize: number) {

  }

  public async processImage(file: File) {
    await this._image.wrapFileAsImage(file);
    this.readRawImage();
    this.readGrayscaleImage();
  }

  public onImageProcessed$ = ko.observable<boolean>();
  public onGrayscaleImageProcessed$ = ko.observable<boolean>();

  public processedImage = ko.observable<ReadonlyArray<Pixel>>();
  public processedASCIIImage = ko.observable<string[]>();
  public processedGrayscaleImage = ko.observable<ReadonlyArray<Pixel>>();

  private readRawImage() {
    const imageData: Pixel[] = [];
    for(let y = 0; y < this._image.imageSize.height; y++) {
      for(let x = 0; x < this._image.imageSize.width; x++) {
        const data = this._image.getPixel(x, y);
        imageData.push(Pixel.createFrom(data));
      }
    }
    this.onRawProcessingCompleted(imageData);
  }

  private readGrayscaleImage() {
    const imageData: Pixel[] = [];
    for(let y = 0; y < this._image.imageSize.height; y++) {
      for(let x = 0; x < this._image.imageSize.width; x++) {
        const data = this._image.getPixel(x, y);
        imageData.push(Pixel.createFrom(data));
      }
    }
    this.onGrayscaleProcessingCompleted(imageData);
  }

  private onRawProcessingCompleted(data: ReadonlyArray<Pixel>) {
    this.processedImage(data);
    this.onImageProcessed$(true);
  }

  private onGrayscaleProcessingCompleted(data: ReadonlyArray<Pixel>) {
    this.processedGrayscaleImage(data);
    this.onGrayscaleImageProcessed$(true);
  }

}
