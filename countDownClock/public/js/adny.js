var baX=0;
var s=100;
var bgT=0;
function backgroundA(rate){
    bgT++;
    background(0);
    noStroke();
    for(var i=0;i<=height;i+=s)
    {
        for(var j=0;j<20;j++){
            fill(225-j*22.5,115-j*22.5,115-j*5);
            rect(baX-j*s-i,i,s,s);
        }
    }
    for(var i=0;i<=height;i+=s)
    {
        for(var j=0;j<20;j++){
            fill(225-j*22.5,115-j*22.5,115-j*5);
            rect(baX+j*s-i,i,s,s);
        }
    }
    if(bgT%4==0){
        if(baX>width+s*20)baX=-s*20;
        baX+=s;   
    }
    
}