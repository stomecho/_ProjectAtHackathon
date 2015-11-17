var barPosition = {x:2000,y:0};
var barSize = 40;
var pressSec=0;
var hx = -4;

var pressed = false;
var pushed = false;
var startPushPoint = {x:0,y:0};
var opened = false;
var firstPress = false;
var SecoundPress = false;
var buttons = [
    new button('縮小',function(){
        nodeInScreen++;
    }),
    new button('放大',function(){
        nodeInScreen--;
    }),
    new button('升',function(){
        tune++;
    }),
    new button('降',function(){
        tune--;
    }),
    new button('弦波',function(){
        type=0;
        uploadFile(playSong());
    }),
    new button('三角波',function(){
        type=1;
        uploadFile(playSong());
    }),
    new button('方波',function(){
        type=2;
        uploadFile(playSong());
    }),
    new button('鼓聲',function(){
        type=3;
        uploadFile(playSong());
    }),
    new button('儲存',function(){
        
        if(isMaster){
            rec.stop();
            //println(recFile);
            if(recFile!=undefined&&recFile!=null)
            saveSound(recFile, 'test.wav');
        }else saveLocal();
    }),
    new button('播放',function(){
        if(isMaster){
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
        else playSoundFile(playSong());
    })
];

var mPressed = false;
function mousePressed(){
    if(isMobile)fullScreen(true);
    mPressed = true;
    drawToolBar();
}
function mouseReleased(){
    SecoundPress=false;
    mPressed = false;
}
function drawToolBar(){
    
    barSize = min(height,width)*0.1;
    var getFocus = false;
    if(barPosition.x<width*0.5)barPosition.x+=(barSize-barPosition.x)*0.2;
    else barPosition.x+=(width-barSize-barPosition.x)*0.2;
    if(barPosition.y<height*0.5)barPosition.y+=(barSize-barPosition.y)*0.2;
    else barPosition.y+=(height-barSize-barPosition.y)*0.2;
    
    if(mPressed){
        if(!pressed){
            firstPress = true;
                if(!pushed){
                    
                var dx = mouseX-barPosition.x;
                var dy = mouseY-barPosition.y;
                if(dx*dx+dy*dy<barSize*barSize*0.25) {
                    startPushPoint = {x:mouseX,y:mouseY};
                    pushed = true;
                }
                
            }
        }else{
            gotFocus = true;
            if(pushed)
            barPosition = {x:mouseX,y:mouseY};
        }
        pressed = true;
    }else{
        if(pushed){
            gotFocus = true;
            var dx = mouseX-startPushPoint.x;
            var dy = mouseY-startPushPoint.y;
            if(dx*dx+dy*dy<barSize*barSize*0.25) {
                opened = !opened;
                
            }
        }
        if(pressed) gotFocus = true;
        pushed = false;
        pressed = false;
        
        
    }
    if(pushed) pressSec++;
    if(pressSec>200){
        opened=!opened;
        pushed=false;
        pressSec=0;
    }
    
    if(opened||hx>-3){
        if(opened) hx+=(1-hx)*0.2;
        else hx+=(-4-hx)*0.2;
        
        getFocus = true;
        var hr = 2;
        var dw = width*0.618/hr;
        var dh = height*0.618/ceil(buttons.length/hr);
        
        for(var i=0;i<buttons.length;i++){
            var x = width*0.191*hx+dw*(i%hr); 
            var y = height*0.191+dh*floor(i/hr);
            if(firstPress&&!isMobile||SecoundPress&&isMobile){
                if(mouseX>x&&mouseY>y&&mouseX<x+dw&&mouseY<y+dh){
                    buttons[i].noClick();
                    buttons[i].sleep=50;
                }
                pressSec=0;
            }
            SecoundPress = firstPress;
            if(!mousePressed)SecoundPress=false;
            fill(255);
            rect(x,y,dw-1,dh-2);
            
            fill(0,255,0,buttons[i].sleep*2);
            rect(x,y,dw-1,dh-2);
            
            fill(0);
            textSize(dh*0.318);
            textAlign(CENTER,CENTER);
            text(buttons[i].name,x+dw*0.5,y+dh*0.5);
            if(buttons[i].sleep>0)buttons[i].sleep--;
        }
    }
    
    fill(255,64);
    ellipse(barPosition.x,barPosition.y,barSize,barSize);
    firstPress = false;
    return getFocus;
}

function button(name,func){
    this.name=name;
    this.noClick=func;
    this.sleep=0;
}