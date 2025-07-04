let container = document.getElementById("container");
let widthHeight = 96;

container.style.setProperty("--grid-size", widthHeight + 1);

for (i = 0; i < widthHeight; i++) {
  for (j = 0; j <= widthHeight; j++) {
    container.insertAdjacentHTML("beforeend", "<div class='gridSquare'></div>");
    console.log("square created");
  }
  console.log("row created");
}

let squares = document.getElementsByClassName("gridSquare");

for (const el of squares) {
  el.addEventListener("mouseenter", (e) => {
    if (el.style.getPropertyValue('background-color') == "black") {
      el.style.setProperty('background-color', "white");
    } else {
      el.style.setProperty('background-color', "rgba(0, 0, 0, 0.6)");
    }
  });
}