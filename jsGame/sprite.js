class Sprite {
  constructor () {
    this.groups = [];
  }

  update () {
    return;
  }

  add (group) {
    if (!group.includes(this)) {
      group.push(this);
      this.groups.push(group);
    }
  }

  remove (group) {
    if (group.includes(this)) {
      for (var i = 0; i < group.length; i++) {
        if (group[i] == this) {
          group.splice(i, 1);
        }
      }

      for (var i = 0; i < this.groups.length; i++) {
        if (this.groups[i] == group) {
          this.groups.splice(i, 1);
        }
      }

    }
  }

  kill () {
    for (var i = 0; i < this.groups.length; i++) {
      this.remove(this.groups[i]);
    };
  }

  alive () {
    return this.groups.length > 0;
  }

  groups() {
    return this.groups;
  }
}

class Group {
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
