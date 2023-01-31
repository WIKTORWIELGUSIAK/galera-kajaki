/** @format */

export const generateColors = (numColors: number) => {
  var colors = [];
  while (colors.length < numColors) {
    var color = randomColor();
    if (colors.indexOf(color) === -1) {
      colors.push(color);
    }
  }
  return colors;
};

function randomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
