var noteHight = [];
var startTime = 0;

var noteLen = 32;

var colors = ['#e61b1b','#e2d219','#1be661','#1b4ae6','#f52aed','#c35815','#2a8ff5','#88f52a','#9f113c'];
var types = ['sine','triangle','square'];

function drawPcEditor(){
    var len = width/noteLen;
    var hi  = height/12;
    var time = Math.floor((millis()-startTime)*300/1000/60);
    if(isMaster){
        drawSoundFile(mainSong);
    }else{
        for(var i=0;i<noteLen;i++){
            fill(255);
            if(i==time)fill(0,255,0);
            if(noteHight[i]!=null){
                
                rect(i*len,noteHight[i]*hi,len,hi);
                fill(0);
                text(noteHight[i],i*len+len*0.5,noteHight[i]*hi+hi*0.5)
            }
        }
    }
}

function addNoteHight(x,y){
    var hi = Math.floor(y*12/height);
    println('set'+x*noteLen/width+'='+y*12/height);
    if(noteHight[Math.floor(x*noteLen/width)]!=hi)
    noteHight[Math.floor(x*noteLen/width)]=hi;
    else noteHight[Math.floor(x*noteLen/width)]=null;
    
    if(!isMaster)uploadFile(playSong());
}

function playSong(){
    var soundFile = new SoundFile(300);
    var melodyLine = new PlayLine(types[Math.floor(random(types.length))]);
    var notes = [];
    for(var i=0;i<noteLen;i++){
        if(noteHight[i]!=null){
            notes[i]=noteHight[i]+50;
        }else notes[i] = 0;
    }
    setNote(melodyLine,notes);
    soundFile.playLines[0]=melodyLine; 
    if(isMaster)
    startTime=millis();
    //playSoundFile(soundFile);
    return soundFile;
}

function drawSoundFile(file){
    
    var len = width/noteLen;
    var hi  = height/1000;
    var time = Math.floor((millis()-startTime)*300/1000/60);
    for(var l=0;l<file.playLines.length;l++){
        var line = file.playLines[l].notes;
        for(var i=0;i<noteLen;i++){
            fill(colors[l%colors.length]);
            if(i==time)fill(0,255,0);
            if(line[i]!=null){
                rect(i*len,line[i].freq*hi,len,10);
            }
        }
    }
}

