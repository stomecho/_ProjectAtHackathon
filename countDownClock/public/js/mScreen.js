var isMobile = false;

function checkMobile(){
    function checkserAgent(){
    
        var flag=false;

        if(navigator.userAgent.match(/Android|iPhone|iPad/i)) {
           flag=true;
        }return flag;
    }
    if(checkserAgent()){    
        isMobile = true;
    }
}

function windowResized() {
    if (fullScreen()) {
        alert('full screened');
        resizeCanvas(displayWidth,displayHeight);
        if(isMobile) resizeCanvas(innerWidth,innerHeight);
    } else resizeCanvas(innerWidth,innerHeight);
    background(0);
}
