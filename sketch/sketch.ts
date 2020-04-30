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

// This modifier constant modifies the space in which a star can be generated.
// If it is set to 1, then a star can be generated anywhere within the page. However,
// the problem with only generating stars within the area of the page is that when they rotate,
// blank parts farther away from the north star will appear that were not present on the
// screen beforehand.
// The way to fix this would be to generate stars in relation to the North Star, I think, and to
// allow them to be generated as far away as the north star is distant from a corner of the page.
const AreaModifier = 2;

// between the left side of the page and the right side of the page
function chooseRandomXOnPage() {
  return getRandomIntBetween(
    -1 * AreaModifier * getNorthStarX(),
    AreaModifier * (width - getNorthStarX())
  );
}

function chooseRandomYOnPage() {
  return getRandomIntBetween(
    -1 * AreaModifier * getNorthStarY(),
    AreaModifier * (height - getNorthStarY())
  );
}

interface Star {
  x: number;
  y: number;
  diameter: number;
}

const createStar = (): Star => ({
  x: chooseRandomXOnPage(),
  y: chooseRandomYOnPage(),
  diameter: getRandomIntBetween(1, 10),
});

const starCount = 50;
const stars: Star[] = [];

function draw() {
  background(50);

  translate(getNorthStarX(), getNorthStarY());
  stroke("purple");
  strokeWeight(10);
  point(0, 0);

  // only run the create star code once
  if (!stars[0])
    // create stars
    for (let i = 0; i < starCount; i++) {
      stars.push(createStar());
    }

  // render stars
  for (const star of stars) {
    push();
    stroke("blue");
    strokeWeight(star.diameter);
    rotate(frameCount / 200);
    point(star.x, star.y);
    pop();
  }
}
