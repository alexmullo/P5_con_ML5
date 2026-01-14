let song;
let isPlaying = false;

let handPose;
let video;
let hands = [];

let cian = [0, 243, 255];
let blanco = [255, 255, 255];

function preload() {
  handPose = ml5.handPose();
  song = loadSound('sanidonavidad.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  
  handPose.detectStart(video, gotHands);
  
  song.setLoop(true);
  song.amp(0.0);
}

function draw() {
  background(5, 5, 10);
  
  push();
  translate(width, 0);
  scale(-1, 1); 
  tint(100, 200, 255, 50); // Filtro azulado
  image(video, 0, 0, width, height);
  pop();

  if (hands.length > 0) {
    let hand = hands[0];
    
    if (!isPlaying) {
      song.play();
      isPlaying = true;
    }
    
    let index = hand.index_finger_tip;
    let thumb = hand.thumb_tip;
    
    let x = width - ((index.x + thumb.x) / 2);
    let y = (index.y + thumb.y) / 2;
    
    let vol = map(y, height - 100, 100, 0, 1, true);
    song.amp(vol);

    noFill();
    stroke(cian);
    strokeWeight(2);
    circle(x, y, 60); 
    
    // Pequeño punto central
    fill(cian);
    noStroke();
    circle(x, y, 5);

    // --- BARRA LATERAL DE VOLUMEN ---
    fill(255, 255, 255, 20);
    rect(30, height/4, 5, height/2);
    
    // Barra de nivel
    let barHeight = map(vol, 0, 1, 0, height/2);
    fill(cian);
    rect(30, (height/4) + (height/2) - barHeight, 5, barHeight);
    
  } else {
    if (isPlaying) {
      song.pause();
      isPlaying = false;
    }
    
    textAlign(CENTER);
    noStroke();
    fill(cian);
    textSize(16);
    text("ESPERANDO SEÑAL GESTUAL...", width/2, height/2);
  }
}

function gotHands(results) {
  hands = results;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
}