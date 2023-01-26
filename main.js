// Size of Character
const CHRHEIGHT = 9;                      
const CHRWIDTH = 8;
// Size of Virtual Screen
const HEIGHT = 120;                       
const WIDTH = 128;
// Size of Map
const MAP_WIDTH = 32;                     
const MAP_HEIGHT = 32;
// Starting Position
const START_X = 15;
const START_Y = 17;
//Half of Screen Tile Size
const SCR_WIDTH = 8;
const SCR_HEIGHT = 8;

const FONT = "12px monospace";            // Font
const FONTSTYLE = "white";              // Color of Font
const SMOOTH = 0;                         // Retouching
const TILECOLUMN = 4;                      // Tile column
const TILEROW = 4;                         // Tile row
const TILESIZE = 8;                       // Tile Size 
const WNDSTYLE = "rgba( 0, 0, 0, 0.75)";  // Window Style 


let gScreen;                           // Virtual Screen
let gFrame = 0;                            // Internal Counter
let gImgMap;                               // Map Image
let gImgPlayer;                            // Player Image
let gWidth;                                // Size of window
let gHeight;
let gPlayerX = START_X * TILESIZE;         // Position of Player
let gPlayerY = START_Y * TILESIZE;

const gFileMap = "img/map.png";
const gFilePlayer = "img/player.png";

// Map
//  1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32
const gMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 1
    0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 2
    0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 3
    0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  // 4
    0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,  // 5
    0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,  // 6
    0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,  // 7
    0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,  // 8
    0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,  // 9
    0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,  //10
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,  //11
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,  //12
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,  //13
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,  //14
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,  //15
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,  //16
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,  //17
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,  //18
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,  //19
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,  //20
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,  //21
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,  //22
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,  //23
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,  //24
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,  //25
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  //26
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,  //27
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,  //28
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,  //29
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,  //30
    7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,  //31
    7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,  //32
];

function DrawMain() {
    // get 2d drawing context of Virtual Screen
    const g = gScreen.getContext("2d"); 
    
    // Player Position on Tile
    let mx = Math.floor( gPlayerX / TILESIZE );     
    let my = Math.floor( gPlayerY / TILESIZE );

    for( let dy = -SCR_HEIGHT; dy <= SCR_HEIGHT; dy++) {
        let ty = my + dy                            // Tile Position Y
        let py = (ty + MAP_HEIGHT) % MAP_HEIGHT;    // Position Y after Loop
        for( let dx = -SCR_WIDTH; dx <= SCR_WIDTH; dx ++){
            let tx = mx + dx;                       // Tile Position X
            let px = (tx + MAP_WIDTH) % MAP_WIDTH;  // Position X after Loop
            DrawTile( g,
                  tx * TILESIZE + WIDTH / 2 - gPlayerX,
                  ty * TILESIZE + HEIGHT / 2 - gPlayerY,
                  gMap[ py * MAP_WIDTH + px]);
            
        }
    }

    g.fillStyle = "#ff0000";
    g.fillRect( 0, HEIGHT / 2 - 1, WIDTH, 2);
    g.fillRect( WIDTH / 2, 0, 2, HEIGHT);

    g.drawImage( gImgPlayer, 
        0, 0, CHRWIDTH, CHRHEIGHT, 
        WIDTH/2 - CHRWIDTH / 2, HEIGHT / 2 - CHRHEIGHT + TILESIZE / 2, CHRWIDTH, CHRHEIGHT);

    g.fillStyle = WNDSTYLE; // Color of Window
    g.fillRect(20, 103, 105, 15);

    g.font = FONT;                              // Set Basic Font
    g.fillStyle = FONTSTYLE;                    // Color of Font
    g.fillText("x=" + gPlayerX + " y=" + gPlayerY + " m=" + gMap[ my * MAP_WIDTH + mx], 25, 115);
}

function DrawTile (g, x, y, idx) {
    const ix = (idx % TILECOLUMN) * TILESIZE;
    const iy = Math.floor(idx / TILECOLUMN) * TILESIZE;
    g.drawImage( gImgMap, ix, iy, TILESIZE, TILESIZE, x, y, TILESIZE, TILESIZE);
}

function LoadImage() {
    gImgMap = new Image();
    gImgMap.src = gFileMap;                // Read Map source
    gImgPlayer = new Image();
    gImgPlayer.src = gFilePlayer;          // Read Player source
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

// Key Down Event
window.onkeydown = function( ev ) {
    let c = ev.keyCode;     // Get Key code

    if (c == 37) gPlayerX--; // Left
    if (c == 38) gPlayerY--; // Up
    if (c == 39) gPlayerX++; // Right
    if (c == 40) gPlayerY++; // Down

    // Operating Map Loop
    gPlayerX += ( MAP_WIDTH * TILESIZE );
    gPlayerX %= ( MAP_WIDTH * TILESIZE );
    gPlayerY += ( MAP_HEIGHT * TILESIZE );
    gPlayerY %= ( MAP_HEIGHT * TILESIZE );
}

// browser start event
window.onload = function() {
    LoadImage();
    
    gScreen = document.createElement("canvas"); // Create Virtual Screen
    // Set Size of Virtual Screen
    gScreen.width = WIDTH; 
    gScreen.height = HEIGHT;

    WmSize();                                   // Initialize Window size
    window.addEventListener("resize", function(){ WmSize() }); // Respond to Changed Window
    setInterval( function() { WmTimer() }, 33); // call WmTimer every 33ms (About 30.3fps)
}