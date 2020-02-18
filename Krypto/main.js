class FK_Krypto {
  constructor() {
    this.plain = "";
    this.secret = "";
  }

  clear_string() {
    // console.log("clearing: " + this.plain);
    var specialchars = " !?_-\"\'#$&%/()[]{}=";
    var temp = "";
    for (var i = 0; i < this.plain.length; i++) {
      var char = this.plain.charAt(i);
      if (!specialchars.includes(char)) {
        temp += char;
      }
    }
    this.plain = temp;
    this.secret = "";

    console.log("cleared:", this.plain);
  }

  caesar(key) {
    key = parseInt(key);
    var plainalphabet = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < this.plain.length; i++) {

      // find position of the letter in the alphabet
      var alphabet_pos;
      for (var j = 0; j < plainalphabet.length; j++) {
        if (this.plain.charAt(i) == plainalphabet.charAt(j)) {
          alphabet_pos = j;
          break;
        }
      }

      var newletter_pos = key + alphabet_pos;
      if (newletter_pos < 0) {
        newletter_pos = 25-newletter_pos;
      }
      if (newletter_pos > 25) {
        newletter_pos = newletter_pos % 26;
      }
      //console.log("newletter_pos: " + newletter_pos + ", adding letter: " + plainalphabet.charAt(newletter_pos));

      this.secret += plainalphabet.charAt(newletter_pos);

    }
    return this.secret;
  }

  set_plain(text) {
    this.plain = text;
    this.clear_string();
  }
}

krypto = new FK_Krypto();

function action_encode() {
  var v = document.getElementById("input_in").value;
  krypto.set_plain(v);
  var output = document.getElementById("div_out");
  var key = document.getElementById("input_key").value;
  output.innerHTML = krypto.caesar(key);
}

function action_decode() {
  var v = document.getElementById("input_in").value;
  krypto.set_plain(v);
  var output = document.getElementById("div_out");
  var key = document.getElementById("input_key").value;
  output.innerHTML = krypto.caesar(-key);
}
