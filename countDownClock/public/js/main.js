var history = [];
var nowHistory = 0;

var bpm = 300;
var nodeInScreen = 12;

var rec=new p5.SoundRecorder();
var recFile=new p5.SoundFile();

function msetup() {
    checkMobile();
    if(isMobile) barSize*=4;
    else dpreload();
    startjoin();
    
}
var ballGetFocus = false;
var clicked = false;

function mdraw(){
	background(0);
	noStroke();
	//fill(255);
	//textAlign(CENTER);
	//text('click to play', width/2, height/2);
    
//    note.pan((mouseX-width*0.5)/width*2);
//    note.freq(mouseY/height*800);
    drawPcEditor();
    if(drawToolBar())clicked=false;
    
    
    var dx = mouseX-barPosition.x;
    var dy = mouseY-barPosition.y;
    if(dx*dx+dy*dy<barSize*barSize*0.25) {
        clicked = false;
    }
    if(clicked){
        clicked=false;
        addNoteHight(mouseX,mouseY);
    }
}



function mouseClicked() {
//    note.stop();
//    note.start();
    clicked = true;
}

var ctrlKey = false;

function keyPressed(){
    if(keyCode==16)ctrlKey=true;
    
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
            startTime=millis();
            
            if(rec!=null){
                delete rec;
                delete recFile;
                rec=new p5.SoundRecorder();
                recFile=new p5.SoundFile();
                rec.setInput();
                
                rec.record(recFile);
                mainSong.bpm=bpm;
                playSoundFile(mainSong);
            }
        }
    }
    if(keyCode==86){
        if(isMaster){
            rec.stop();
            //println(recFile);
            if(recFile!=undefined&&recFile!=null)
            saveSound(recFile, 'test.wav');
        }
    }
    if(keyCode==80)playSoundFile(playSong());
    if(keyCode==UP_ARROW)tune--;
    if(keyCode==DOWN_ARROW)tune++;
    if(keyCode==LEFT_ARROW){
        type=(type-1+4)%4;
        uploadFile(playSong());
    }
    if(keyCode==RIGHT_ARROW){
        type=(type+1)%4;
        uploadFile(playSong());
    }
    if(keyCode==67){
            noteHight=[];
            uploadFile(playSong());
    }
    if(keyCode==109) nodeInScreen--;
    if(keyCode==107) nodeInScreen++;
    if(ctrlKey&&keyCode==90){
        if(nowHistory>=2)
            
            nowHistory-=1;
            history[nowHistory]=undefined;
            nowHistory-=1;
            noteHight = history[nowHistory];
            playSong();
        if(nowHistory==1) noteHight=[];
        println(history);
    } 
    if(keyCode==69&&ctrlKey) saveLocal();
}

function keyReleased(){
    if(keyCode==16) ctrlKey = false;
}

function mouseWheel(event) {
  print(event.delta);
    if(ctrlKey)
  tune += event.delta;
    else
        nodeInScreen += floor(event.delta);
}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
var isSave = false;
function saveLocal(){
    isSave = true;
    save({
        note: noteHight,
        type: type
    },'playLine.json');
}