const input = document.getElementById('input');

var interval=null;

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



function drawWave(){
    ctx.clearRect(0,0,width,height); // clears canvas so new wave can be drawn
    x=0;
    y=height/2;
    ctx.moveTo(x,y); // moves pointer to the left most middle of the canvas, so we always start drawing a new wave from here
    ctx.beginPath(); // tells comp that ready to start painting
    counter=0;
    interval=setInterval(line,20); // calls line function every 20 seconds
}

function line(){
    y=height/2+(amplitude*Math.sin(x*2*Math.PI*freq)); // y value is determined by amplitude and frequency
    ctx.lineTo(x,y);// pointer draws line from og spot to new (x,y)
    ctx.stroke();// line is filled
    x+=1; // x increases by 1 pixel each time
    counter++;// increase counter by 1 to show how long interval has been run
    if(counter>50)
    {
        clearInterval(interval);
    }
}

// simple key values thats user can use to get different pitches
notenames=new Map();
notenames.set("0",100);
notenames.set("1",150);
notenames.set("2",200);
notenames.set("3",250);
notenames.set("4",300);
notenames.set("5",350);
notenames.set("6",400);
notenames.set("7",450);
notenames.set("8",500);
notenames.set("9",550);

function frequency(pitch){

    freq=pitch/10000; // divided by 10000 to actually see the wave or too big
    gainNode.gain.setValueAtTime(100,audioCtx.currentTime); // sets volume to 100% at start time
    oscillator.frequency.setValueAtTime(pitch,audioCtx.currentTime);// pitch is user input and that will determine if the sound is high or low
    gainNode.gain.setValueAtTime(0,audioCtx.currentTime +1);// "turns volume off"/ sets it to 0 after 1 sec or it wont stop

}
function handle(){
    var user_note= String(input.value);// takes in the notenames key values from user input and converts it to string
    audioCtx.resume();
    gainNode.gain.value=0;
    frequency(notenames.get(user_note)); // plays corresponding frequency based number entered by user
    drawWave();
}
   