import * as ko from "knockout";
import { ImageWrapper } from "./lib/image-wrapper";
import { Pixel } from "./pixel";

const IMAGE_PROCESSOR_CONFIG = Object.freeze({
  grayscale: {
    amplifiers: {
      red: 0.2126,
      green: 0.7152,
      blue: 0.0722
    }
  }
});

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
    this.readImage(this.onRawProcessingCompleted.bind(this));
  }

  private readGrayscaleImage() {
    this.readImage(this.onGrayscaleProcessingCompleted.bind(this));
  }

  private readImage(callbackFn: Function) {
    const imageData: Pixel[] = [];
    for(let y = 0; y < this._image.imageSize.height; y++) {
      for(let x = 0; x < this._image.imageSize.width; x++) {
        const data = this._image.getPixel(x, y);
        imageData.push(Pixel.createFrom(data));
      }
    }
    callbackFn(imageData);
  }

  private onRawProcessingCompleted(data: ReadonlyArray<Pixel>) {
    this.processedImage(data);
    this.onImageProcessed$(true);
  }

  private onGrayscaleProcessingCompleted(data: ReadonlyArray<Pixel>) {
    const result = this.toGrayscalePixels(data);
    this.processedGrayscaleImage(result);
    this.onGrayscaleImageProcessed$(true);
  }

  private toGrayscalePixels(data: ReadonlyArray<Pixel>) {
    const grayscalePixels: Pixel[] = [];
    for(const item of data) {
      const grayscale = this.toGrayscalePixel(item);
      grayscalePixels.push(new Pixel(grayscale, grayscale, grayscale, 1));
    }
    return grayscalePixels;
  }

  private toGrayscalePixel(pixel: Pixel) {
    const y = 
      pixel.red * IMAGE_PROCESSOR_CONFIG.grayscale.amplifiers.red +
      pixel.green * IMAGE_PROCESSOR_CONFIG.grayscale.amplifiers.green +
      pixel.blue * IMAGE_PROCESSOR_CONFIG.grayscale.amplifiers.blue
    ;
    return y;
  }

}
