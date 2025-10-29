const input = document.getElementById('input');
var reset= false;
var interval=null;
var timepernote=0;
var length=0;
var x=0;
var freq=0;

//create web audio api elements
const audioCtx=new AudioContext(); //object that controls playing/pausing in computer(i think based on time)
const gainNode=audioCtx.createGain();// another object that controls volume of audioCtx

//create oscillator node
const oscillator= audioCtx.createOscillator();//object that plays frequencies
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type="sine";
oscillator.start();
gainNode.gain.value=0;

// defining canvas variables
var canvas=document.getElementById("canvas");
var ctx= canvas.getContext("2d"); // ctx is the pasrt of the canvas box we draw on
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var amplitude=40;
var counter=0;

// simple key values thats user can use to get different pitches
var notenames = new Map();
notenames.set("a", 440); // A4
notenames.set("b", 493); // B4
notenames.set("c", 261); // C4
notenames.set("d", 293); // D4
notenames.set("e", 329); // E4
notenames.set("f", 349); // F4
notenames.set("g", 392); // G4

function frequency(pitch){

    freq=pitch/10000; // divided by 10000 to actually see the wave or too big
    gainNode.gain.setValueAtTime(1,audioCtx.currentTime); // sets volume to 100% at start time
    oscillator.frequency.setValueAtTime(pitch,audioCtx.currentTime);// pitch is user input and that will determine if the sound is high or low
    gainNode.gain.setValueAtTime(0,audioCtx.currentTime +(timepernote/1000)-0.1);// "turns volume off"/ sets it to 0 after 1 sec or it wont stop

}
function handle()
{
    reset = true;
    audioCtx.resume();
    gainNode.gain.value = 0;

    var user_note = String(input.value); // takes in the notenames key values from user input and converts it to string
    var noteslist = [];

   length = user_note.length; // length of noteslist
   timepernote = 6000 / length; // how long each note will play for based on length of noteslist
   
    
    for (let i = 0; i < user_note.length; i++) // plays corresponding frequency based on user input
    {
        noteslist.push(notenames.get(user_note.charAt(i))); // use user_note (not usernotes)
    }
    let j = 0;
    let repeat = setInterval(() => {
        if (j < noteslist.length) {
            frequency(parseInt(noteslist[j])); 
            drawWave();
        j++;
        } else {
            clearInterval(repeat);
        }
    }, timepernote); // interval in ms
}
var counter=0;
function drawWave(){
    clearInterval(interval); // clears previous interval so waves dont overlap
    if (reset){
        ctx.clearRect(0,0,width,height); // clears canvas so new wave can be drawn
        x=0;
        y=height/2;
        ctx.moveTo(x,y); // moves pointer to the left most middle of the canvas, so we always start drawing a new wave from here
        ctx.beginPath(); // tells comp that ready to start painting
    }
    counter=0;
    interval=setInterval(line,20); // calls line function every 20 seconds
    reset=false;
}

function line(){
    y=height/2+(amplitude*Math.sin(x*2*Math.PI*freq* (0.5*length))); // y value is determined by amplitude and frequency
    ctx.lineTo(x,y);// pointer draws line from og spot to new (x,y)
    ctx.stroke();// line is filled
    x+=1; // x increases by 1 pixel each time
    counter++;// increase counter by 1 to show how long interval has been run
    if(counter>(timepernote/20))
    {
        clearInterval(interval);
    }
}

   