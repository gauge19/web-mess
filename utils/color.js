import {Calculations} from "./utils/utils.js";

export default class Color {

  /**
   * Returns string with RGBA color values.
   *
   * @param  {number} r   Red value. Should be between 0 and 255.
   * @param  {number} g   Green value. Should be between 0 and 255.
   * @param  {number} b   Blue value. Should be between 0 and 255.
   * @param  {number} a   Alpha value. Should be between 0 (fully opaque) and 1 (fully visible). Default is 1.
   * @return {String}     String with color values. Example: "rgba(255, 0, 0, 0.5)"
   */
  static rgb(r, g, b, a=1) {
    // constrain all values into their desired range.
    r = Calculations.constrain(r, 0, 255);
    g = Calculations.constrain(g, 0, 255);
    b = Calculations.constrain(b, 0, 255);
    a = Calculations.constrain(a, 0, 1);

    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
  }

  /**
   * Returns string with RGBA color values.
   *
   * @param  {number} h   Hue value. Should be between 0 and 360. red=0, green=120, blue=240.
   * @param  {number} s   Saturation value. Should be between 0 and 100. Default is 100%.
   * @param  {number} l   Ligthness value. Should be between 0 and 100. Default is 50%.
   * @param  {number} a   Alpha value. Should be between 0 (fully opaque) and 1 (fully visible). Default is 1.
   * @return {String}     String with color values. Example: "hsla(120, 100, 75, 0.2)"
   */
  static hsl(h, s=100, l=50, a=1) {
    // constrain all values into their desired range.
    h = Calculations.constrain(h, 0, 360);
    s = Calculations.constrain(s, 0, 100);
    l = Calculations.constrain(l, 0, 100);
    a = Calculations.constrain(a, 0, 1);

    return "hsla(" + h + ", " + s + "%, " + l + "%, " + a + ")";
  }

  static lerp(c1, c2, step) {
    let a = lerp(c1[0], c2[0], step);
    let b = lerp(c1[1], c2[1], step);
    let c = lerp(c1[2], c2[2], step);

    return [a, b, c];
  }
}
