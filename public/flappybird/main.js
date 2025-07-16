
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
}


/*-----------------------------------------------*/
// render canvas
function renderCanvas(canvas){

    //keydown event
    document.onkeydown = handleKeydown
    document.onkeyup = handleKeyUp


    let section = document.createElement('section');
    section.innerHTML = canvas;
    let canvas_element = section.childNodes[0]
    // let canvas_element = document.querySelector('canvas');

    document.body.append(section);

    // board height and width
    let boardWidth = canvas_element.width;
    let boardHeight = canvas_element.height;

    // gamestate & current state
    let GAME_STATE = {
        MENU:'menu',
        PLAYING:'playing',
        GAME_OVER: 'gameOver'
    }
    let currentState = GAME_STATE.MENU;

    // flags
    let FLAG = {
        inputLocked:false,
    }

    // play button
    let playBtn = {
        x: boardWidth / 2 - (120/2),
        y: boardHeight / 2 + (87),
        height: 87,
        width:125,
    }

    let gameOver = {
        x:boardWidth / 2 - (300/2),
        y:boardHeight / 2 - 150,
        height:90,
        width:300
    }

    // logo info
    let logo = {
        x: (boardWidth / 3),
        y: boardHeight / 4,
        width:300,
        height:100
    }

    // flappybird logo
    let backgroundImg = new Image(logo.width,logo.height);
    backgroundImg.src = "./media/flappybird-background.png";

    // flappybird logo
    let flappyBirdTextImg = new Image(logo.width,logo.height);
    flappyBirdTextImg.src = "./media/flappylogo.png";
    
    // gameover
    let gameoverImg = new Image(); 
    gameoverImg.src = "./media/gameover.png";

    // playbutton
    let playBtnImg = new Image(); 
    playBtnImg.src = "./media/playbtn.png"

    const birdImg = new Image();
    birdImg.src = './media/bird-flap-neutral.png'
    

    const topPipeImg = new Image();
    topPipeImg.src = './media/pipe.jpg';

    const bottomPipeImg = new Image();
    bottomPipeImg.src = './media/pipe.jpg';

    // bird object
    const bird = {
        x:boardWidth / 2 - 40,
        y:boardHeight/2,
        height:30,
        width:40,
    }

    let velocityY;
    let velocityX = -2;
    let gravity = 0.5;
    let birdY = boardHeight / 2;
    let pipeWidth = 100;
    let pipeGap = 200;
    let pipeArray = []; // store pipe for any detected collisions
    let pipeIntervalId;

 
    let board = canvas_element;
    board.height = boardHeight;
    board.width = boardWidth;
    const ctx = canvas_element.getContext('2d');

    requestAnimationFrame(update,ctx)
    
    // update fn
    function update(){
        requestAnimationFrame(update)
        ctx.clearRect(0,0,board.width,board.height);
        ctx.drawImage(backgroundImg,0,0,boardWidth,boardHeight)
        // game states (currentstate)
        switch(true){
            case currentState === GAME_STATE.MENU:
                renderMenu()
            break;
            case currentState === GAME_STATE.PLAYING:
                renderGame()
            break;
            case currentState === GAME_STATE.GAME_OVER:
                renderGameOver()
            break;
            default:
            console.log(undefined);
        }
    }

    function renderMenu(){
        if(backgroundImg.complete){
            ctx.drawImage(backgroundImg,0,0,boardWidth,boardHeight)
        }
        if(playBtnImg.complete){
            ctx.drawImage(playBtnImg,playBtn.x,playBtn.y,playBtn.width,playBtn.height)
        }
        if(flappyBirdTextImg.complete){
            let scaledWidth = logo.width;
            let scaledHeight = (flappyBirdTextImg.height / flappyBirdTextImg.width) * scaledWidth
            ctx.drawImage(flappyBirdTextImg,logo.x,logo.y,scaledWidth,scaledHeight)
        }
    }
    function renderGame(){
        console.log("RENDER THE GAME")
        // ctx.drawImage(backgroundImg,0,0,boardWidth,boardHeight)
        velocityY += gravity
        // bird.y = Math.max(bird.y + velocityY,0);
        bird.y = bird.y + velocityY

        // ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
        // ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
        // ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);
        ctx.drawImage(birdImg,bird.x,bird.y,bird.width,bird.height);

        if(bird.y > boardHeight){
            currentState = GAME_STATE.GAME_OVER;
        }

        for(let i = 0; i < pipeArray.length; i++){
            let pipe = pipeArray[i];
            pipe.x += velocityX;
            console.log(pipe)
            console.log(pipe.img.src)
            if(pipe.rotate===true){
                console.log(pipe.img)
                console.log("THIS PIPE IS FLIPPED!")
                pipe.img.classList.add('flipover')
            }
            ctx.drawImage(pipe.img,pipe.x,pipe.y,pipe.width,pipe.height);

            if(!pipe.passed && bird.x > pipe.x + pipe.width){
                score += .5;
                console.log(score)
                pipe.passed = true; // pipe is passed
            }

            if(detectedCollision(bird,pipe)){
                currentState = GAME_STATE.GAME_OVER
            }

            // while(pipeArray.length > 0 && pipeArray[0].x < -pipeWidth){
            //     pipeArray.shift()
            // }

            ctx.fillStyle = '#f00';
            ctx.font = "45px sans-serif"
            ctx.textAlign = 'left';
            ctx.fillText(score,25,40)
        }
    }
    function renderGameOver(){
        if(gameoverImg.complete){
            ctx.drawImage(gameoverImg,gameOver.x,gameOver.y,gameOver.width,gameOver.height)
            let imgWidth = 400;
            let imgHeight = 80;
            let x = (boardWidth - imgWidth) / 2;
            let y = boardHeight / 3;
            // ctx.drawImage(gameoverImg,x,y,imgWidth,imgHeight)
            let scoretext =  `Your score: ${Math.floor(score)}`;
            ctx.fillStyle = '#fff';
            ctx.font = '45px sans-serif';
            ctx.textAlign = 'center'
            ctx.fillText(scoretext,boardWidth/2, y+imgHeight+50);

            ctx.drawImage(playBtnImg,playBtn.x,playBtn.y,playBtn.width,playBtn.height)

            FLAG.inputLocked = true;
            setTimeout(()=>{
                FLAG.inputLocked = false;
            },200)
        }
    }

    function handleKeydown(e){
        const {inputLocked} = FLAG;
        if(inputLocked)return;
        console.log(e.key,e.code)
        if(e.key===' ' && e.code==='Space'){
            if(currentState === GAME_STATE.MENU){
                startGame()
            } else if(currentState === GAME_STATE.GAME_OVER){
                resetGame();
            } else if(currentState === GAME_STATE.PLAYING){
                birdImg.src = './media/bird-flap-up.png'
                velocityY = -8
            }
            else {
                console.log("underfined for keydown")
            }
        }
    }
    function handleKeyUp(e){
        if(e.key===' ' && e.code==='Space'){
        if(currentState === GAME_STATE.PLAYING){
            birdImg.src = './media/bird-flap-down.png'
        }
        }
    }
    let score = 0; 
    function startGame(){
        console.log("GAME STARTED!")
        currentState = GAME_STATE.PLAYING;
        bird.y = birdY;
        velocityY = 0;
        pipeArray = [];
        score = 0;

        if (pipeIntervalId){
            clearInterval(pipeIntervalId)
        }
        placePipe();
        pipeIntervalId = setInterval(placePipe,2500);
    }

    function resetGame(){
        startGame()
    }

    function detectedCollision(a,b){
        return a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    }

    // place the pipe
    function placePipe(){
        console.log("placing a pipe")
        createPipe();
    }

    // create the pipe
    function createPipe(){
        console.log("creating a pipe")
        let maxPipeHeight = boardHeight - pipeGap - 50;
        let topPipeHeight = Math.floor(Math.random()*maxPipeHeight);
        let bottomPipeHeight = boardHeight - topPipeHeight - pipeGap;

        let topPipe = {
            x: canvas_element.clientWidth,
            y:0,
            width:pipeWidth,
            height:topPipeHeight,
            img:topPipeImg,
            rotate:true,
            passed:false,
        }
        let bottomPipe = {
            x: canvas_element.clientWidth,
            y:topPipeHeight + pipeGap,
            width:pipeWidth,
            height:bottomPipeHeight,
            img:bottomPipeImg,
            rotate:false,
            passed:false,
        }

        pipeArray.push(topPipe,bottomPipe)
    }
}
