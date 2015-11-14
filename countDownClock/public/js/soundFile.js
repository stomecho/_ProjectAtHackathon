var noteTable = [
16.35	, //C0			 index=0
17.32	, // C#0/Db0 	 index=1
18.35	, //D0			 index=2
19.45	, // D#0/Eb0 	 index=3
20.6	, //E0			 index=4
21.83	, //F0			 index=5
23.12	, // F#0/Gb0 	 index=6
24.5	, //G0			 index=7
25.96	, // G#0/Ab0 	 index=8
27.5	, //A0			 index=9
29.14	, // A#0/Bb0 	 index=10
30.87	, //B0			 index=11
32.7	, //C1			 index=12
34.65	, // C#1/Db1 	 index=13
36.71	, //D1			 index=14
38.89	, // D#1/Eb1 	 index=15
41.2	, //E1			 index=16
43.65	, //F1			 index=17
46.25	, // F#1/Gb1 	 index=18
49		, //G1			 index=19
51.91	, // G#1/Ab1 	 index=20
55		, //A1			 index=21
58.27	, // A#1/Bb1 	 index=22
61.74	, //B1			 index=23
65.41	, //C2			 index=24
69.3	, // C#2/Db2 	 index=25
73.42	, //D2			 index=26
77.78	, // D#2/Eb2 	 index=27
82.41	, //E2			 index=28
87.31	, //F2			 index=29
92.5	, // F#2/Gb2 	 index=30
98		, //G2			 index=31
103.83	, // G#2/Ab2 	 index=32
110		, //A2			 index=33
116.54	, // A#2/Bb2 	 index=34
123.47	, //B2			 index=35
130.81	, //C3			 index=36
138.59	, // C#3/Db3 	 index=37
146.83	, //D3			 index=38
155.56	, // D#3/Eb3 	 index=39
164.81	, //E3			 index=40
174.61	, //F3			 index=41
185		, // F#3/Gb3 	 index=42
196		, //G3			 index=43
207.65	, // G#3/Ab3 	 index=44
220		, //A3			 index=45
233.08	, // A#3/Bb3 	 index=46
246.94	, //B3			 index=47
261.63	, //C4			 index=48
277.18	, // C#4/Db4 	 index=49
293.66	, //D4			 index=50
311.13	, // D#4/Eb4 	 index=51
329.63	, //E4			 index=52
349.23	, //F4			 index=53
369.99	, // F#4/Gb4 	 index=54
392		, //G4			 index=55
415.3	, // G#4/Ab4 	 index=56
440		, //A4			 index=57
466.16	, // A#4/Bb4 	 index=58
493.88	, //B4			 index=59
523.25	, //C5			 index=60
554.37	, // C#5/Db5 	 index=61
587.33	, //D5			 index=62
622.25	, // D#5/Eb5 	 index=63
659.25	, //E5			 index=64
698.46	, //F5			 index=65
739.99	, // F#5/Gb5 	 index=66
783.99	, //G5			 index=67
830.61	, // G#5/Ab5 	 index=68
880		, //A5			 index=69
932.33	, // A#5/Bb5 	 index=70
987.77	, //B5			 index=71
1046.5	, //C6			 index=72
1108.73	, // C#6/Db6 	 index=73
1174.66	, //D6			 index=74
1244.51	, // D#6/Eb6 	 index=75
1318.51	, //E6			 index=76
1396.91	, //F6			 index=77
1479.98	, // F#6/Gb6 	 index=78
1567.98	, //G6			 index=79
1661.22	, // G#6/Ab6 	 index=80
1760	, //A6			 index=81
1864.66	, // A#6/Bb6 	 index=82
1975.53	, //B6			 index=83
2093	, //C7			 index=84
2217.46	, // C#7/Db7 	 index=85
2349.32	, //D7			 index=86
2489.02	, // D#7/Eb7 	 index=87
2637.02	, //E7			 index=88
2793.83	, //F7			 index=89
2959.96	, // F#7/Gb7 	 index=90
3135.96	, //G7			 index=91
3322.44	, // G#7/Ab7 	 index=92
3520	, //A7			 index=93
3729.31	, // A#7/Bb7 	 index=94
3951.07	, //B7			 index=95
4186.01	, //C8			 index=96
4434.92	, // C#8/Db8 	 index=97
4698.63	, //D8			 index=98
4978.03	, // D#8/Eb8 	 index=99
5274.04	, //E8			 index=100
5587.65	, //F8			 index=101
5919.91	, // F#8/Gb8 	 index=102
6271.93	, //G8			 index=103
6644.88	, // G#8/Ab8 	 index=104
7040	, //A8			 index=105
7458.62	, // A#8/Bb8 	 index=106
7902.13	, //B8			 index=107
];

function defaultSong(){
    var soundFile = new SoundFile(480);
    var melodyLine = new PlayLine('square');
    var bassLine = new PlayLine('sinWave');
    setNote(melodyLine,[76,76,0 ,76,0 ,72,76,0 ,79,0 ,0 ,0 ,67,0 ,0 ,0 ]);
    setNote(bassLine,  [38,38,0 ,38,0 ,0 ,38,0 ,43,0 ,0 ,0 ,31,0 ,0 ,0 ]);
    soundFile.playLines[0]=melodyLine; 
    soundFile.playLines[1]=bassLine; 
    playSoundFile(soundFile);
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
//編輯方法
function setNote(playLine, noteIds){
    var lenOfNotes = noteIds.length;
    playLine.notes = [];
    var notes = playLine.notes;
    for(var i=0;i<lenOfNotes;i++){
        if(noteIds[i]!=0)
        notes[i] = new Note(noteTable[noteIds[i]],0.8 );
    }
}

//播放方法
function playSoundFile(soundFile){
    println('playFile');
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
    
    println('playLine '+amountOfNotes);
    for(var i = 0;i<amountOfNotes;i++){
        var note = notes[i];
        if(note!=null)
        playNote(note, type, i*lenOfNote, note.len*lenOfNote );
    }
}

function playNote(note, type, start, end){
    var newNote = noteGroup[noteGroupPointer];
    newNote = new p5.Oscillator(note.freq , type);
    console.log("playNote "+note.freq+" s= "+start);
    newNote.start(start);
    newNote.stop(start+end);
    noteGroupPointer=(noteGroupPointer+1)%maxNotes;
}
