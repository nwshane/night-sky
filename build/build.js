var angle = 0;
var squares = 10;
function setup() {
    createCanvas(windowWidth, windowHeight);
}
var getNorthStarX = function () { return width / 2; };
var getNorthStarY = function () { return height / 3; };
function getRandomIntBetween(min, max) {
    var difference = max - min;
    return Math.floor(Math.random() * Math.floor(difference) + min);
}
var randomlyGeneratedAreaModifier = 0.5;
function chooseRandomXOnPage() {
    return getRandomIntBetween(-1 * randomlyGeneratedAreaModifier * getNorthStarX(), randomlyGeneratedAreaModifier * getNorthStarX());
}
function chooseRandomYOnPage() {
    return getRandomIntBetween(-1 * randomlyGeneratedAreaModifier * getNorthStarY(), randomlyGeneratedAreaModifier * getNorthStarY());
}
var starX, starY;
function draw() {
    background(50);
    translate(getNorthStarX(), getNorthStarY());
    stroke("purple");
    strokeWeight(10);
    point(0, 0);
    if (!starX)
        starX = chooseRandomXOnPage();
    if (!starY)
        starY = chooseRandomYOnPage();
    push();
    stroke("blue");
    strokeWeight(20);
    rotate(frameCount / 200);
    point(starX, starY);
    pop();
}
//# sourceMappingURL=build.js.map