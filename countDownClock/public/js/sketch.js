function windowResized() {
    if (fullScreen()) {
        //alert('full screened');
        resizeCanvas(displayWidth,displayHeight);
        if(isMobile) resizeCanvas(innerWidth,innerHeight);
    } else resizeCanvas(innerWidth,innerHeight);
    background(0);
}

function setup() {
    msetup();
	canvas=createCanvas(innerWidth, innerHeight);
    canvas.parent('processing');
    canvas.drop(getFile);
    textFont('微軟正黑體');
}

function draw() {
	background(255);
	
	mdraw();
	fill(255);
	//ellipse(mouseX,mouseY,20,20);
	
}