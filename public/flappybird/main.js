// fetch canvas
const canvasInit = '/flappy/canvas-init'
if(!document.querySelector('canvas')){
    console.log('canvas does not exist')
    const canvas = fetch(canvasInit, {method:'GET',header:{'Content-Type':'text/html'}}).then(r=>{
    if(r.status===200){
        // console.log(r)
        return r.text();
    } else {
        console.log('status is bad')
    }
}).then(canva => renderCanvas(canva)); // fetch canvas
} else {
    console.log('canvas exists')
}
/*-----------------------------------------------*/
// render canvas
function renderCanvas(canvas){
    let section = document.createElement('section');
    section.innerHTML = canvas;
    let canvas_element = section.childNodes[0];

    document.body.append(section);

    // board height and width
    let boardWidth = section.width;
    let boardHeight = section.height;

    // gamestate & current state
    let GAME_STATE = {
        MENU:'menu',
        PLAYYING:'playing',
        GAME_OVER: 'gameOver'
    }
    let currentState = GAME_STATE.MENU;

    // flags
    let FLAG = {
        inputLocked:false,
    }

    //keydown event
    document.onkeydown = handleKeydown

    // play button
    let playBtn = {
        x: boardWidth / 2 - (120/2),
        y: boardHeight / 2 - (70 /2),
        height: 120,
        width:70
    }

    // logo info
    let logo = {
        x: (boardWidth / 2),
        y: boardHeight / 3,
        width:300,
        height:100
    }

    // flappybird logo
    let flappyBirdTextImg = new Image(logo.width,logo.height);
    flappyBirdTextImg.src = "./media/flappylogo.png";
    
    let gameoverImg = new Image();
    gameoverImg.src = "./media/gameover.png";

}


function handleKeydown(e){

}