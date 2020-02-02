import {Vector2, Vector3} from "./vector.js";

export default class Calculations {
  static deg_to_rad(deg) {
    return deg*(Math.PI/180);
  }

  static rad_to_deg(rad) {
    return rad*(180/Math.PI);
  }

  /**
   * Re-maps a number from one range to another.
   * @param  {Number} n  the incoming value to be converted
   * @param  {Number} start1 lower bound of the value's current range
   * @param  {Number} stop1  upper bound of the value's current range
   * @param  {Number} start2 lower bound of the value's target range
   * @param  {Number} stop2  upper bound of the value's target range
   * @param  {Boolean} withinBounds Optional. Constrain the value to the newly mapped range
   * @return {Number}  remapped number
   */
  static map(n, start1, stop1, start2, stop2, withinBounds) {
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return Calculations.constrain(newval, start2, stop2);
    } else {
      return Calculations.constrain(newval, stop2, start2);
    }
  }

  /**
   * Constrains a value between a minimum and maximum value.
   * @param  {Number} n number to constrain
   * @param  {Number} low minimum limit
   * @param  {Number} high maximum limit
   * @return {Number} constrained number
   */
  static constrain(n, low, high) {
    return Math.max(Math.min(n, high), low);
  }

  /**
   * Converts angle theta into 2 dimensional coordinates on a circle.
   * @param {number} r Radius of the sphere.
   * @param {number} theta Angle in degrees.
   * @returns {Vector2} Vector2 object on the circle.
   */
  static polar_coordinates_2d(r, theta) {
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);

    return new Vector2(x, y);
  }

  /**
   * Converts Latitude and Longitutde values into 3 dimensional coordinates on a sphere.
   * @param {number} r Radius of the sphere.
   * @param {number} lon Longitude value.
   * @param {number} lat Latitude value.
   * @returns {Vector3} Vector3 object on the sphere.
   */
  static polar_coordinates_3d(r, lon, lat) {
    const x = r * Math.sin(lon) * Math.cos(lat);
    const y = r * Math.sin(lon) * Math.sin(lat);
    const z = r * Math.cos(lon);

    return new Vector3(x, y, z);
  }
}
