function setup() {
  createCanvas(windowWidth, windowHeight);
}

const getNorthStarX = () => width / 2;
const getNorthStarY = () => height * (2 / 5);

function getRandomIntBetween(min: number, max: number) {
  const difference = max - min;
  return Math.floor(Math.random() * Math.floor(difference) + min);
}

const getDistanceFromNorthStarToFarthestCorner = () => {
  const northStarX = getNorthStarX();
  const northStarY = getNorthStarY();

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

const getRandomStarDiameter = () => getRandomIntBetween(1, 10);

const createStar = ({
  x,
  y,
  diameter,
}: {
  x?: number;
  y?: number;
  diameter?: number;
}): Star => ({
  x: x || getRandomXOrYRelativeToNorthStar(),
  y: y || getRandomXOrYRelativeToNorthStar(),
  diameter: diameter || getRandomStarDiameter(),
});

const starCount = 500;
const stars: Star[] = [];
let northStar: Star;

function draw() {
  background(50);

  if (!northStar)
    northStar = createStar({ x: getNorthStarX(), y: getNorthStarY() });
  translate(northStar.x, northStar.y);
  stroke("blue");
  strokeWeight(northStar.diameter);
  point(0, 0);

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
    rotate(frameCount / 500);
    point(star.x, star.y);
    pop();
  }
}
