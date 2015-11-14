var bgX=0;
function backgroundA(){
    background(0);
    noStroke();
    for(var i=0;i<=height;i+=50)
    {
        for(var j=0;j<3;j++)
            fill(j*75,j*35,j*7);
            rect(baX-j*50,i,50,50);
    }
    if(baX>width)baX=0;
    baX+=50;
    
}