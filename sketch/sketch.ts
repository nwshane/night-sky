let angle = 0;
let squares = 10;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

const getNorthStarX = () => width / 2;
const getNorthStarY = () => height / 3;

function getRandomIntBetween(min, max) {
  const difference = max - min;
  return Math.floor(Math.random() * Math.floor(difference) + min);
}

const randomlyGeneratedAreaModifier = 0.5;

// between the left side of the page and the right side of the page
function chooseRandomXOnPage() {
  return getRandomIntBetween(
    -1 * randomlyGeneratedAreaModifier * getNorthStarX(),
    randomlyGeneratedAreaModifier * getNorthStarX()
  );
}

function chooseRandomYOnPage() {
  return getRandomIntBetween(
    -1 * randomlyGeneratedAreaModifier * getNorthStarY(),
    randomlyGeneratedAreaModifier * getNorthStarY()
  );
}

let starX, starY;

function draw() {
  background(50);

  translate(getNorthStarX(), getNorthStarY());
  stroke("purple");
  strokeWeight(10);
  point(0, 0);

  if (!starX) starX = chooseRandomXOnPage();
  if (!starY) starY = chooseRandomYOnPage();

  push();
  stroke("blue");
  strokeWeight(20);
  rotate(frameCount / 200);
  point(starX, starY);
  pop();

  //   push();
  //   stroke("blue");
  //   strokeWeight(5);
  //   rotate(frameCount / 200);
  //   point(width / -8, height / 4);
  //   pop();

  //   push();
  //   stroke("blue");
  //   strokeWeight(5);
  //   rotate(frameCount / 200);
  //   point(width / -2, height / -4);
  //   pop();
}
