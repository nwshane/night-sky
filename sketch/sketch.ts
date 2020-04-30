function setup() {
  createCanvas(windowWidth, windowHeight);
}

const getNorthStarX = () => width / 10;
const getNorthStarY = () => height / 10;

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
  startingXRelativeToNorthStar: number;
  startingYRelativeToNorthStar: number;
  diameter: number;
}

const createStar = (): Star => ({
  startingXRelativeToNorthStar: getRandomXOrYRelativeToNorthStar(),
  startingYRelativeToNorthStar: getRandomXOrYRelativeToNorthStar(),
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
