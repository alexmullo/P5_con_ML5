let song;
let isPlaying = false;

let handPose;
let video;
let hands = [];

function preload() {
  handPose = ml5.handPose();
  song = loadSound('sanidonavidad.mp3');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  song.setLoop(true);
  song.amp(0.0);
  
  // Configuración del texto
  textSize(32);
  textAlign(CENTER, TOP);
}

function draw() {
  image(video, 0, 0, width, height);
 
  fill(255, 215, 0);
  text("Acerca tu mano hacia arriba", width / 2, 10);
  
  if (hands.length >= 1) {
    if (!isPlaying) {
      song.play();
      isPlaying = true;
    }
    
    // Obtener puntos de la mano
    let finger = hands[0].index_finger_tip;
    let thumb = hands[0].thumb_tip;
    
    // Calcular el centro de la mano
    let handCenterX = (finger.x + thumb.x) / 2;
    let handCenterY = (finger.y + thumb.y) / 2;
    
    // Calcular distancia desde arriba (la "cabeza")
    let distanceFromTop = handCenterY;
    
    let amplitude = map(distanceFromTop, 50, height - 50, 1.5, 0.1, true);
    amplitude = constrain(amplitude, 0, 1.0);
    song.amp(amplitude);
    
    // Mapear distancia al tamaño del círculo
    let circleSize = map(distanceFromTop, 50, height - 50, 300, 50, true);
    
    // Dibujar círculo en el centro
    fill(255, 215, 0, 150);
    stroke(0);
    strokeWeight(2);
    circle(handCenterX, handCenterY, circleSize);
    
  } else {
    if (isPlaying) {
      song.pause();
      song.amp(0.0);
      isPlaying = false;
    }
    
  }
}

function gotHands(results) {
  hands = results;
}
