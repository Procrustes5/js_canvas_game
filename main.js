// Font
const FONT = "48px monospace";
const HEIGHT = 120;  // Size of Virtual Screen
const WIDTH = 128;
const SMOOTH = 0;    // Retouching

let gScreen = 0;     // Virtual Screen
let gFrame = 0;      // Internal Counter
let gImgMap;         // Map Image
let gWidth;          // Size of window
let gHeight;

function DrawMain() {
    // get 2d drawing context of Virtual Screen
    const g = gScreen.getContext("2d");  
    for( let y = 0; y < 32; y++) {
        for( let x = 0; x < 64; x ++){
            g.drawImage( gImgMap, x*32, y*32);
        }
    }
    g.font = FONT;                              // Set Basic Font
    g.fillText("Hello World " + gFrame, gFrame/10, 64);
}

function WmPaint() {

    DrawMain();
    const ca = document.getElementById("main");
    const g = ca.getContext("2d");              // get 2d drawing context
    // Send Image of Virtual Screen to Main Canvas
    g.drawImage( gScreen, 0 , 0, gScreen.width, gScreen.height, 0, 0, gWidth, gHeight);
}

// Changing Browser Size Event
function WmSize() {
    const ca = document.getElementById("main"); // get element of main canvas
    ca.width = window.innerWidth;               // Change Canvas width for Browser width
    ca.height = window.innerHeight;

    const g = ca.getContext("2d");              // get 2d drawing context
    g.imageSmoothingEnabled = g.msImageSmoothingEnabled = SMOOTH; // Clear the Window

    // Measure Size of the Window, 
    // Measure Maximum Size with maintaining aspect ratio of dot image
    gWidth = ca.width;
    gHeight = ca.height;
    if( gWidth / WIDTH < gHeight  / HEIGHT) {
        gHeight = gWidth * HEIGHT / WIDTH;
    } else {
        gWidth = gHeight * WIDTH / HEIGHT;
    }
}
// Timer Event
function WmTimer() {
    // Set Internal Counter
    gFrame++;
    WmPaint();
}

// browser start event
window.onload = function() {
    gImgMap = new Image();
    gImgMap.src = "img/map.png";                // Read Map source
    gScreen = document.createElement("canvas"); // Create Virtual Screen
    // Set Size of Virtual Screen
    gScreen.width = WIDTH; 
    gScreen.height = HEIGHT;

    WmSize();                                   // Initialize Window size
    window.addEventListener("resize", function(){ WmSize() }); // Respond to Changed Window
    setInterval( function() { WmTimer() }, 33); // call WmTimer every 33ms (About 30.3fps)
}