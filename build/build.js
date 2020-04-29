var angle = 0;
var squares = 10;
function setup() {
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    background(50);
    translate(width / 2, height / 3);
    stroke("purple");
    strokeWeight(10);
    point(0, 0);
    push();
    stroke("blue");
    strokeWeight(5);
    rotate(frameCount / 200);
    point(width / 4, height / 4);
    pop();
    push();
    stroke("blue");
    strokeWeight(5);
    rotate(frameCount / 200);
    point(width / -8, height / 4);
    pop();
    push();
    stroke("blue");
    strokeWeight(5);
    rotate(frameCount / 200);
    point(width / -2, height / -4);
    pop();
}
//# sourceMappingURL=build.js.map