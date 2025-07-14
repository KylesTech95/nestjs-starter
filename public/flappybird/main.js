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
    document.body.append(section);

    let boardWidth = canvas.width;
    let boardHeight = canvas.height;

    let GAME_STATE = {
        MENU:'menu',
        PLAYYING:'playing',
        GAME_OVER: 'gameOver'
    }
    let currentState = GAME_STATE.MENU;

    let FLAG = {
        inputLocked:false,
    }

    document.onkeydown = handleKeydown

    let playBtn = {
        x: boardWidth / 2 - (120/2),
        y: boardHeight / 2 - (70 /2),
        height: 120,
        width:70
    }

    let logo = {
        x: boardWidth / 2 - 300 / 2,
        y: boardHeight / 4,
        width:300,
        height:100
    }
    let flappyBirdTextImg = new Img();
    flappyBirdTextImg.src = ""
}


function handleKeydown(e){

}