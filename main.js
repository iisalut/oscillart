const input = document.getElementById('input');

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
    gainNode.gain.setValueAtTime(100,audioCtx.currentTime); // sets volume to 100% at start time
    oscillator.frequency.setValueAtTime(pitch,audioCtx.currentTime);// pitch is user input and that will determine if the sound is high or low
    gainNode.gain.setValueAtTime(0,audioCtx.currentTime +1);// "turns volume off"/ sets it to 0 after 1 sec or it wont stop

}
function handle(){
    var user_note= String(input.value);// takes in the notenames key values from user input and converts it to string
    audioCtx.resume();
    gainNode.gain.value=0;
    frequency(notenames.get(user_note)); // plays corresponding frequency based number entered by user
}