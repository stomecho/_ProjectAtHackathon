

function msetup() {
    startjoin();
}

function mdraw(){
	background(0);
	noStroke();
	//fill(255);
	//textAlign(CENTER);
	//text('click to play', width/2, height/2);
    
//    note.pan((mouseX-width*0.5)/width*2);
//    note.freq(mouseY/height*800);
    drawPcEditor();
}

function mouseClicked() {
//    note.stop();
//    note.start();
    addNoteHight(mouseX,mouseY);
}

function keyPressed(){
    println(keyCode);
    if(keyCode ==77) {
        alert('you are master');
        isMaster = true;
        socket.emit('master');
    }
    if(keyCode == 85){
        if(!isMaster)
        uploadFile(playSong());
        else{
            if(isMaster)startTime=millis();
            playSoundFile(mainSong);
        }
    }
    
}