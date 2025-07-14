// vars
const h1 = document.querySelector('h1')
const canvasInit = '/flappy/canvas-init'
const canvas = fetch(canvasInit, {method:'GET',header:{'Content-Type':'text/html'}}).then(r=>{
    if(r.status===200){
        // console.log(r)
        return r.text();
    } else {
        console.log('status is bad')
    }
}).then(canva => renderCanvas(canva)); // fetch canvas
/*-----------------------------------------------*/



// render canvas
function renderCanvas(canvas){
    let section = document.createElement('section');
    section.innerHTML = canvas;
    // document.body.insertBefore(section,h1);
    document.body.append(section);
    const seconds = 1*.5;
    const vas = [...section.children][0];
}

