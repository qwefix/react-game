const CANVAS_SIZE = 10;
const SNAKE_START = [
  [8, 7],
  [8, 8],
];
const APPLE_START = [8, 3];
const SCALE = 50;
const SPEED = 300;
const DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
};
