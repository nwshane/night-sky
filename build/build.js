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
var createStar = function () { return ({
    x: chooseRandomXOnPage(),
    y: chooseRandomYOnPage(),
    diameter: getRandomIntBetween(1, 10),
}); };
var starCount = 3;
var stars = [];
function draw() {
    background(50);
    translate(getNorthStarX(), getNorthStarY());
    stroke("purple");
    strokeWeight(10);
    point(0, 0);
    if (!stars[0])
        for (var i = 0; i < starCount; i++) {
            stars.push(createStar());
        }
    for (var _i = 0, stars_1 = stars; _i < stars_1.length; _i++) {
        var star = stars_1[_i];
        push();
        stroke("blue");
        strokeWeight(star.diameter);
        rotate(frameCount / 200);
        point(star.x, star.y);
        pop();
    }
}
//# sourceMappingURL=build.js.map