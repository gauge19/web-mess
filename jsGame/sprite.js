import {Surface, Rect, Color} from "./jsgame.js";

export default class Sprite {
  constructor (x, y, width, height) {
    this._g = [];
    this.rect = new Rect(x, y, width, height);
    this.color = new Color(0, 0, 0);
  }

  set_color (color) {
    this.color = color;
  }

  update () {
    return;
  }

  add (group) {
    if (!group.includes(this)) {
      group.push(this);
      this._g.push(group);
    }
  }

  remove (group) {
    if (group.includes(this)) {
      for (var i = 0; i < group.length; i++) {
        if (group[i] == this) {
          group.splice(i, 1);
        }
      }

      for (var i = 0; i < this._g.length; i++) {
        if (this._g[i] == group) {
          this._g.splice(i, 1);
        }
      }

    }
  }

  kill () {
    for (var i = 0; i < this._g.length; i++) {
      this.remove(this._g[i]);
    };
  }

  alive () {
    return this._g.length > 0;
  }

  groups() {
    return this._g;
  }
}

export class Group {
  constructor () {
    this.sprites = [];
  }

  // returns list of all the sprites in this group
  sprites () {
    return this.sprites;
  }

  //add sprites to this group
  add () {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].add(this);
    }
  }

  // remove sprites from this group
  remove () {
    for (var i = 0; i < arguments.length; i++) {
      if (this.sprites.includes(arguments[i])) {
        arguments[i].remove(this);
      }
    }

  }

  // returns true if every given sprites is in the group
  includes () {
    var r = true;
    for (var i = 0; i < arguments.length; i++) {
      if (!this.sprites.includes(arguments[i])) {
        r = false;
        break;
      }
    }

    return r;
  }

  // call "update" function for every sprite in the group
  update () {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].update();
    }
  }

  // draw all sprites to the surface
  draw (surface) {
    for (var i = 0; i < this.sprites.length; i++) {
      surface.draw(this.sprites[i]);
    }
  }
}
