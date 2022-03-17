const IMAGE_WRAPPER_CONFIG = Object.freeze({
  pixelSize: {
    width: 1,
    height: 1
  }
})

export class ImageWrapper {

  public imageSize: { width: number; height: number } = { width: 0, height: 0 };

  private _facadedImage: HTMLImageElement;
  private _facadedContainer: HTMLCanvasElement;
  private _facadedContext: CanvasRenderingContext2D;

  constructor() {
    this._facadedImage = new Image();
    this._facadedContainer = document.createElement("canvas");
    this._facadedContext = this._facadedContainer.getContext("2d");
  }

  public wrapFileAsImage(file: File) {
    const promise = new Promise(resolve => {
      const url = URL.createObjectURL(file);
      this._facadedImage.addEventListener("load", () => {
        this.renderImageToContext();
        resolve(true);
      })
      this._facadedImage.src = url;
    });
    return promise;
  }

  public getPixel(x: number, y: number): ImageData {
    return this._facadedContext.getImageData(x, y, IMAGE_WRAPPER_CONFIG.pixelSize.width, IMAGE_WRAPPER_CONFIG.pixelSize.height);
  }

  private renderImageToContext() {
    this.imageSize.width = this._facadedContainer.width = this._facadedImage.width;
    this.imageSize.height = this._facadedContainer.height = this._facadedImage.height;
    this._facadedContext.drawImage(this._facadedImage, 0, 0);
  }

}
