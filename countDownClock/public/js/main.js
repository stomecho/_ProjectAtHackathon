var note = new p5.Oscillator(440,'sinWave');

function msetup() {
}

function mdraw(){
	background(0);
	noStroke();
	fill(255);
	textAlign(CENTER);
	text('click to play', width/2, height/2);
    
    note.pan((mouseX-width*0.5)/width*2);
    note.freq(mouseY/height*800);
}

function mouseClicked() {
    note.stop();
    note.start();
}