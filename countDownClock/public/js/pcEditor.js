var noteHight = [];



var startTime = 0;

var noteLen = 32;

var colors = ['#e61b1b','#e2d219','#1be661','#1b4ae6'];
var types = ['sine','triangle','square','drum'];

var type = 0;
var tune = 0;

function drawPcEditor(){
    var len = width/noteLen;
    var hi  = height/nodeInScreen;
    var time = Math.floor((millis()-startTime)*300/1000/60);
    if(isMaster){
        drawSoundFile(mainSong);
    }else{
        fill(255,16);
        for(var i=0;i<nodeInScreen;i++){
            var n=(i+tune*12-50+12*10)%12;
            if(n==0||n==2||n==4||n==5||n==7||n==9||n==11)
            rect(0,i*hi,width,hi-1);
            
            var tt = (i+tune*12-50+12*10);
            if(tt==60){
                fill(200,0,0);
                rect(0,i*hi,width,2);
                fill(255,16);
            }
            if(type==3&&( tt==66||tt==68||tt==71||tt==72 )){
                fill(0,200,0);
                rect(0,i*hi,width,2);
                fill(255,16);
            }
            
        }
        rect(0*len,0,len*8,height);
        rect(16*len,0,len*8,height);
        for(var i=0;i<noteLen;i++){
            
            
            fill(255);
            if(noteHight[i]!=null){
                var high = noteHight[i]-tune*12;
                rect(i*len,high*hi,len,hi);
            }
        }
        text(tune+" type="+types[type],width*0.5,height-20);
    }
}

function addNoteHight(x,y){
    if(isSave){
        isSave=false;
        return;
    }
    var hi = Math.floor(y*nodeInScreen/height)+tune*12;
    //println('set'+x*noteLen/width+'='+y*nodeInScreen/height);
    if(noteHight[Math.floor(x*noteLen/width)]!=hi)
    noteHight[Math.floor(x*noteLen/width)]=hi;
    else noteHight[Math.floor(x*noteLen/width)]=null;
    
    if(!isMaster){
        startTime=Math.floor(y*nodeInScreen/height);
        uploadFile(playSong());
    }
    
}


function playSong(){
    history[nowHistory]=clone(noteHight);
    
    nowHistory++;
    var soundFile = new SoundFile(300);
    var melodyLine = new PlayLine(types[type]);
    var notes = [];
    for(var i=0;i<noteLen;i++){
        if(noteHight[i]!=null){
            notes[i]=noteHight[i]+50;
        }else notes[i] = 0;
    }
    setNote(melodyLine,notes);
    soundFile.playLines[0]=melodyLine; 
    
    
    return soundFile;
}

function drawSoundFile(file){
    
    var len = width/noteLen;
    var hi  = height/300;
    var time = (millis()-startTime)*bpm/1000/60;
    for(var l=0;l<file.playLines.length;l++){
        var line = file.playLines[l].notes;
        for(var i=0;i<noteLen;i++){
            var c = colors[l%colors.length];
            var r = hexToR(c);
            var g = hexToG(c);
            var b = hexToB(c);
            
            
            if(i<=time){
                fill(r,g,b,max(0,i+100-time)+125);
            }else fill(r,g,b,100);
            
            if(line[i]!=null){
                rect(i*len,sqrt(line[i].freq)*7*hi,len,10);
            }
        }
    }
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function getFile(item){
    //println(item);
    var s = item.data;
    for(var i=0;i<s.length;i++){
        if(s.charAt(i)==',') {
            s=s.substr(i+1);
            break;
        }
    }
    for(var i=s.length;i>=0;i--){
        if(s.charAt(i)=='=') {
            s=s.substr(0,i);
        }
    }
    //println(s);
    
    var file = JSON.parse(decode_base64(s));
    //println(file);
    if(file!=null){
        var note = file.note;
        if(note!=null)noteHight=note;
        var ntype = file.type;
        if(ntype!=null)type=ntype;
    }
    uploadFile(playSong());
}

function decode_base64 (s)
{
    var e = {}, i, k, v = [], r = '', w = String.fromCharCode;
    var n = [[65, 91], [97, 123], [48, 58], [43, 44], [47, 48]];

    for (z in n)
    {
        for (i = n[z][0]; i < n[z][1]; i++)
        {
            v.push(w(i));
        }
    }
    for (i = 0; i < 64; i++)
    {
        e[v[i]] = i;
    }

    for (i = 0; i < s.length; i+=72)
    {
        var b = 0, c, x, l = 0, o = s.substring(i, i+72);
        for (x = 0; x < o.length; x++)
        {
            c = e[o.charAt(x)];
            b = (b << 6) + c;
            l += 6;
            while (l >= 8)
            {
                r += w((b >>> (l -= 8)) % 256);
            }
         }
    }
    return r;
}