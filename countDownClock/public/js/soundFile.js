function defaultSong(){
    var soundFile = new SoundFile();
}

//撥放器群組 - 限制音符數量
var noteGroup = [];
var noteGroupPointer = 0;
var maxNotes = 1000;

//資料格式
function SoundFile(bpm){
    this.bpm = bpm;
    this.playLines = [];
}

function PlayLine(type){
    this.type=type;
    this.notes = [];
}

function Note(freq, len){
    this.freq=freq;
    this.len=len;
}

//播放方法
function playSoundFile(soundFile){
    var playLines = soundFile.playLines;
    var amountOfPlayLines = playLines.length;
    for(var i = 0; i<amountOfPlayLines;i++){
        playPlayLine(playLines[i], soundFile.bpm);
    }
}

function playPlayLine(playLine, bpm){
    var type=playLine.type;
    var notes = playLine.notes;
    
    var lenOfNote = 60/bpm;
    var amountOfNotes = notes.length;
    for(var i = 0;i<amountOfNotes;i++){
        var note = note[i];
        playNote(note, type, i*lenOfNote, note.len*lenOfNote );
    }
}

function playNote(note, type, start, end){
    var newNote = noteGroup[noteGroupPointer];
    newNote = new p5.Oscillator(note.freq , type);
    newNote.start(start);
    newNote.stop(end);
    noteGroupPointer=(noteGroupPointer+1)%maxNotes;
}
