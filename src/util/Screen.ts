interface initProps {
  height: number;
  width: number;
  fontSize: number;
  animationDuration?: number;
}
class ScreenClass {
  private _pixelRatio = 1;
  private _height = 1080;
  private _width = 1920;
  private _animationDuration = 0.1; // in seconds

  constructor() {}
  init({ height, width, fontSize, animationDuration = 0.1 }: initProps) {
    this._width = height;
    this._width = width;
    this._animationDuration = animationDuration;
    this.setStyle("--height", `${this._height}px`);
    this.setStyle("--width", `${this._width}px`);
    this.setStyle("font-size", `${fontSize}px`);
    this.setStyle("--animation-duration", `${this._animationDuration}s`);
    this.generatePixelRatio();
  }
  private generatePixelRatio() {
    const urlParams = new URLSearchParams(window.location.search);
    const screenSize = urlParams.get("size") || "default";
    this._pixelRatio =
      {
        "720": 0.666667,
        "1080": 1,
        "4k": 2,
        default: window.innerHeight / this._height,
      }[screenSize] || 1;
    this.setStyle("--pixel-ratio", this.pixelRatio.toString());
  }

  private setStyle(property: string, value: string | null, priority?: string) {
    document.body.style.setProperty(property, value, priority);
  }

  get pixelRatio() {
    return this._pixelRatio;
  }
  get height() {
    return this._height;
  }
  get width() {
    return this._width;
  }
}

const screen = new ScreenClass();
export default screen;
