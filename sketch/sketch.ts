let angle = 0;
let squares = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  console.log({ windowWidth, windowHeight });
}

const getNorthStarX = () => width / 10;
const getNorthStarY = () => height / 10;

function getRandomIntBetween(min: number, max: number) {
  const difference = max - min;
  return Math.floor(Math.random() * Math.floor(difference) + min);
}

function getRandomXRelativeToNorthStar() {
  const northStarX = getNorthStarX();

  // Horizontal distance from north star to most distant side of page.
  const xMaxDistance = Math.max(northStarX, width - northStarX);

  return getRandomIntBetween(-1 * xMaxDistance, xMaxDistance);
}

function getRandomYRelativeToNorthStar() {
  const northStarY = getNorthStarY();

  // Vertical distance from north star to either bottom or top of page,
  // whichever is farther away.
  const yMaxDistance = Math.max(northStarY, height - northStarY);

  return getRandomIntBetween(-1 * yMaxDistance, yMaxDistance);
}

interface Star {
  startingXRelativeToNorthStar: number;
  startingYRelativeToNorthStar: number;
  diameter: number;
}

const createStar = (): Star => ({
  startingXRelativeToNorthStar: getRandomXRelativeToNorthStar(),
  startingYRelativeToNorthStar: getRandomYRelativeToNorthStar(),
  diameter: getRandomIntBetween(1, 10),
});

const starCount = 500;
const stars: Star[] = [];

function draw() {
  background(50);

  translate(getNorthStarX(), getNorthStarY());
  stroke("purple");
  strokeWeight(10);
  point(0, 0);

  // only run the create star code once
  if (!stars[0]) {
    // create stars
    for (let i = 0; i < starCount; i++) {
      stars.push(createStar());
    }
  }

  // render stars
  for (const star of stars) {
    push();
    stroke("blue");
    strokeWeight(star.diameter);
    rotate(frameCount / 200);
    point(star.startingXRelativeToNorthStar, star.startingYRelativeToNorthStar);
    pop();
  }
}
