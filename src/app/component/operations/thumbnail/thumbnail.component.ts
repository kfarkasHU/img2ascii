import * as ko from "knockout";
import { ComponentDescriptor } from "../../../../core/component";
import { ImageProcessor } from "../../../shared/image-processor";
import { Pixel } from "../../../shared/pixel";

interface ThumbnailComponentInput {
  label: string,
  isGrayscale: boolean
}

class ThumbnailComponent {

  public height = ko.observable<number>();
  public label = ko.observable<string>("");    
  public element = ko.observable<HTMLCanvasElement>();

  private context: CanvasRenderingContext2D;
  private contextSize: { width: number, height: number };
  private imageProcessor: ImageProcessor = ImageProcessor.getInstance();

  constructor(params: Partial<ThumbnailComponentInput>) {
    this.label(params.label);
    this.subscribeToImage(params.isGrayscale);
    this.element.subscribe(() => {
      this.initializeCanvas();
      this.imageProcessor.setScale(this.height())
    });      
  }
  
  private subscribeToImage(isGrayscale: boolean) {
    isGrayscale
      ? this.subscribeToGrayscale()
      : this.subscribeToRaw()
  }

  private subscribeToRaw() {
    this.imageProcessor.onImageProcessed$.subscribe(state => {
      if(state) {
        const pixels = ko.unwrap(this.imageProcessor.processedImage);
        this.renderPixels(pixels);
      }
    });
  }

  private subscribeToGrayscale() {
    this.imageProcessor.onGrayscaleImageProcessed$.subscribe((m) => {
      if(m) {
        const pixels = ko.unwrap(this.imageProcessor.processedGrayscaleImage);
        this.renderPixels(pixels);
      }
    });
  }

  private renderPixels(pixels: ReadonlyArray<Pixel>) {
    const width = this.height();
    const height = this.height();
    for(let y = 0; y < height; y++) {
      for(let x = 0; x < width; x++) {
        const index = y * width + x;
        const pixel = pixels[index];
        this.context.fillStyle = `rgba(${pixel.red}, ${pixel.green}, ${pixel.blue}, 1)`;
        this.context.fillRect(x, y, 1, 1);
      }
    }
  }

  private initializeCanvas() {
    const element = ko.unwrap(this.element);
    this.height(element.width);
    this.contextSize = {
      width: element.width,
      height: element.height
    }
    this.context = element.getContext("2d");
    this.drawEmptyCanvas();
  }

  private drawEmptyCanvas() {
    // TODO (FK): Render transparent mesh here.
    this.context.fillStyle = "#989898";
    this.context.fillRect(0, 0, this.contextSize.width, this.contextSize.height);
  }

}

export const ThumbnailComponentDescriptor = new ComponentDescriptor(
  "ascii-thumbnail",
  ThumbnailComponent,
  require("./thumbnail.component.html"),
  require("./thumbnail.component.scss")
);
