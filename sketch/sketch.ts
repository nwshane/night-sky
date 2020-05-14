const MaxStarDiameter = 5;
const RotationSpeed = 1 / 2;
const NorthStarHorizontalPosition = 1 / 2;
const NorthStarVerticalPosition = 2 / 5;
const StarColor = "rgba(249, 255, 0, 0.4)";

// 500 stars on a 1440 x 900 pixel laptop screen
// (with space for menus etc. at top of screen).
// The number of stars will change according to the screen size.
const StarDensityPerSqPixel = 500 / (1440 * 760);

const TwinkleStarColor = "rgba(249, 255, 0, 0.8)";
const TwinkleProbability = 1 / 5000;
const TwinkleFrameCount = 10;

const EarthCircleDiameterInScreenHeights = 5;
const EarthCirclePeakVerticalPosition = 2 / 3;

let NorthStarX: number;
let NorthStarY: number;
let starCount: number;

function setup() {
  createCanvas(windowWidth, windowHeight);
  NorthStarX = width * NorthStarHorizontalPosition;
  NorthStarY = height * NorthStarVerticalPosition;
  starCount = Math.floor(windowWidth * windowHeight * StarDensityPerSqPixel);
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
  // if remainingTwinkleFrames > 0, then the star is twinkling
  remainingTwinkleFrames: number;
}

const getRandomStarDiameter = () => getRandomIntBetween(1, MaxStarDiameter + 1);

const createStar = ({ x, y, diameter }: Partial<Star>): Star => ({
  x: x !== undefined ? x : getRandomXOrYRelativeToNorthStar(),
  y: y !== undefined ? y : getRandomXOrYRelativeToNorthStar(),
  diameter: diameter || getRandomStarDiameter(),
  remainingTwinkleFrames: 0,
});

const stars: Star[] = [];
let northStar: Star;

function draw() {
  background("#001B44");

  if (!northStar)
    northStar = createStar({
      x: 0,
      y: 0,
    });

  translate(NorthStarX, NorthStarY);
  stroke(StarColor);
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
    const twinkling = star.remainingTwinkleFrames > 0;

    if (twinkling) {
      star.remainingTwinkleFrames--;
    } else {
      if (getRandomIntBetween(1, Math.ceil(1 / TwinkleProbability)) === 1)
        star.remainingTwinkleFrames += TwinkleFrameCount;
    }

    stroke(twinkling ? TwinkleStarColor : StarColor);
    strokeWeight(twinkling ? star.diameter + 1 : star.diameter);
    rotate((frameCount / 500) * RotationSpeed);
    point(star.x, star.y);
    pop();
  }

  // render Earth
  translate(-1 * NorthStarX, -1 * NorthStarY);
  circle(
    windowWidth * (1 / 2),
    windowHeight * EarthCircleDiameterInScreenHeights * (1 / 2) +
      EarthCirclePeakVerticalPosition * windowHeight,
    EarthCircleDiameterInScreenHeights * windowHeight
  );
}
