export class Pixel {

  constructor(
    public readonly red: number,
    public readonly blue: number,
    public readonly green: number,
    public readonly alpha: number
  ) {}

  public static createFrom(imageData: ImageData) {
    const data = imageData.data;
    return new Pixel(data[0], data[1], data[2], data[3]);
  }

}
