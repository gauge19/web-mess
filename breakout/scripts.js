function loadScripts(scripts) {
  // Go through each script in the list
  for (var i = 0; i < scripts.length; i++) {
    // Get the first script element on the page
    var ref = document.getElementsByTagName('script')[0];

    // Create a new script element
    var script = document.createElement('script');

    // Set the script element `src`
    script.src = scripts[i];

    // Inject the script into the DOM
    ref.parentNode.insertBefore(script, ref);
  }
}

var l = ["brick.js", "player_objects.js", "main.js"];
loadScripts(l);
