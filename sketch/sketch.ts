const MaxStarDiameter = 5;
let NorthStarX: number;
let NorthStarY: number;
const RotationSpeed = 1;
let starCount: number;

/*
todo:
- investigate why north star is not showing up
- from Roby: I think something that could help with depth is making the smaller circles more transparent and maybe making the background a more intense hue, perhaps a dark blue like #001B44 - from there try playing with colors for the stars. I like using this palette as a nice reference for colors that pair well together on a screen http://tachyons.io/docs/themes/skins/ :)
- make stars twinkle
- add Earth
*/

function setup() {
  createCanvas(windowWidth, windowHeight);
  NorthStarX = width / 2;
  NorthStarY = height * (2 / 5);
  starCount = Math.floor(windowWidth * windowHeight * 0.00045);
}

function getRandomIntBetween(min: number, max: number) {
  const difference = max - min;
  return Math.floor(Math.random() * Math.floor(difference) + min);
}

const getDistanceFromNorthStarToFarthestCorner = () => {
  const northStarX = NorthStarX;
  const northStarY = NorthStarY;

  const xMaxDistance = Math.max(northStarX, width - northStarX);
  const yMaxDistance = Math.max(northStarY, height - northStarY);

  return Math.sqrt(xMaxDistance ** 2 + yMaxDistance ** 2);
};

const getRandomXOrYRelativeToNorthStar = () => {
  const distanceToFarthestCorner = getDistanceFromNorthStarToFarthestCorner();

  return getRandomIntBetween(
    -1 * distanceToFarthestCorner,
    distanceToFarthestCorner
  );
};

interface Star {
  x: number;
  y: number;
  diameter: number;
}

const getRandomStarDiameter = () => getRandomIntBetween(1, MaxStarDiameter + 1);

const createStar = ({ x, y, diameter }: Partial<Star>): Star => ({
  x: x !== undefined ? x : getRandomXOrYRelativeToNorthStar(),
  y: y !== undefined ? y : getRandomXOrYRelativeToNorthStar(),
  diameter: diameter || getRandomStarDiameter(),
});

const stars: Star[] = [];
let northStar: Star;

function draw() {
  background(50);

  if (!northStar)
    northStar = createStar({
      x: 0,
      y: 0,
    });

  translate(NorthStarX, NorthStarY);
  stroke("blue");
  strokeWeight(northStar.diameter);
  point(northStar.x, northStar.y);

  // only run the create star code once
  if (!stars[0]) {
    // create stars
    for (let i = 0; i < starCount; i++) {
      stars.push(createStar({}));
    }
  }

  // render stars
  for (const star of stars) {
    push();
    stroke("blue");
    strokeWeight(star.diameter);
    rotate((frameCount / 500) * RotationSpeed);
    point(star.x, star.y);
    pop();
  }
}
