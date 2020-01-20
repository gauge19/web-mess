class random {
  static random() {
    return Math.random();
  }

  /**
   * Returns random integer within specified range including min and max.
   * @param {number} min - Minimum of range
   * @param {number} max - Maximum of range
   * @returns {number} Random integer within 'min' and 'max'.
   */
  static randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1)) + min;;
  }

  /**
   * Returns a random element from a given array.
   * @param {Array} array - Array to pick from
   */
  static choice(array) {
    return array[this.randint(0, array.length)];
  }

  /**
   * Shuffles an array.
   * @param {Array} array - Array to be shuffled
   * @returns {Array} New, shuffled array
   */
  static shuffle(array) {
    var new_array = [...array]; // clone given array

    var m = new_array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = new_array[m];
      new_array[m] = new_array[i];
      new_array[i] = t;
    }

    return new_array;
  }

  /**
   * Shuffles an array in place.
   * @param {Array} array - Array to be shuffled
   */
  static shuffle_ip(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return;
  }
}

class Canvas {
  constructor(id, w, h) {
    this.canvas = document.getElementById(id);

    // check for optional parameters
    if (w) {
      this.width = w;
    }
    if (h) {
      this.height = h;
    }

    this.context = this.canvas.getContext("2d");

    this.background = "black";
    this.border = "grey";
  }

  get width() {
    return this.canvas.width;
  }
  set width(v) {
    this.canvas.width = v;
  }
  get height() {
    return this.canvas.height;
  }
  set height(v) {
    this.canvas.height = v;
  }

  clear() {
    //  Select the colour to fill the drawing
    this.context.fillStyle = this.background;
    //  Select the colour for the border of the canvas
    this.context.strokestyle = this.border;
    // Draw a "filled" rectangle to cover the entire canvas
    this.context.fillRect(0, 0, this.width, this.height);
    // Draw a "border" around the entire canvas
    this.context.strokeRect(0, 0, this.width, this.height);
  }
}
