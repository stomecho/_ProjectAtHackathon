var socket = io();
var myId = 0;
var isMaster = false;
var mainSong = new SoundFile(300);

function startjoin(){
    socket.emit('join', {  });
}

function singleFile(){
    
}

function uploadFile(data){
    if(myId!=-1){
        console.log('uploaded');
        if(data.playLines!=null)
        socket.emit('upload', { id: myId, playLine: data.playLines[0] });
    }
}

socket.on('update', function (data) {
    
    if(isMaster){
        
        for(var i=0;i<data.id;i++){
            if(mainSong.playLines[i]==undefined) mainSong.playLines[i] = setNote(new PlayLine('sine'),[0]);
        }
        mainSong.playLines[data.id] = data.playLine;
        console.log(data.playLine);
        console.log(mainSong);
    }
});

socket.on('join', function(data){
    myId = data.id;
    console.log('join');
    alert('your id is '+myId);
});