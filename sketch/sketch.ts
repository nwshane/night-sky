let angle = 0;
let squares = 10;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

const getNorthStarX = () => width / 2;
const getNorthStarY = () => height / 3;

function getRandomIntBetween(min: number, max: number) {
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

interface Star {
  x: number;
  y: number;
}

const createStar = (): Star => ({
  x: chooseRandomXOnPage(),
  y: chooseRandomYOnPage(),
});

const stars: Star[] = [];

function draw() {
  background(50);

  translate(getNorthStarX(), getNorthStarY());
  stroke("purple");
  strokeWeight(10);
  point(0, 0);

  if (!stars[0]) stars.push(createStar());

  for (const star of stars) {
    push();
    stroke("blue");
    strokeWeight(20);
    rotate(frameCount / 200);
    point(star.x, star.y);
    pop();
  }

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
