let inputDir ={x:0,y:0}
const foodSound = new Audio('../audio/eating.wav')
const gameOverSound = new Audio('../audio/game_over.wav')
const moveSound = new Audio('../audio/direction_change.wav')
const musicSound = new Audio('../audio/bg_music.mp3')
let score=0;
let speed = 5;
let lastPaintTime=0;
let snakeArr = [{x:13,y:15}]
let pause_option = true;
food={x:6,y:7}
//game func
function main(ctime)
{
    window.requestAnimationFrame(main)
    if((ctime-lastPaintTime)/1000<1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    //console.log(ctime)
    if(pause_option)
        gameEngine();
}

function isCollide() {
    for (let i = 1; i < snakeArr.length; i++) {
        //own
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y)
        {
            gameOverSound.play();
            return true;
        }
    }
    //go outside
    //console.log(sArr[0].x,sArr[0].y);
    if(snakeArr[0].x<=0 || snakeArr[0].x>=18 || snakeArr[0].y<=0 ||snakeArr[0].y>=18)
    {
        gameOverSound.play();
        return true;
    }
}

function gameEngine()
{

    //collision
    if(isCollide())
    {
        musicSound.pause();
        inputDir ={x:0,y:0}
        alert("Game Over")
        snakeArr = [{x:13,y:15}]
        //musicSound.play();
        score=0;
        speed=5;
        scoreBox.innerHTML="Score: "+score;

    }
    
    //after eating food

    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        score+=1;
        speed+=.3;
        val = speed.toFixed(2)
        scoreBox.innerHTML="Score: "+score //+"<br>"+" Speed: "+val;
        //score.innerHTML="Score: " + score;
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x , y:snakeArr[0].y+inputDir.y})
        let a=2
        let b=16
        food = {x: Math.round(a+(b-a)*Math.random()),y: Math.round(a+(b-a)*Math.random())}

    }

    //moving the snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]= {...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";

    //snake display
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if(index===0)
        {
            snakeElement.classList.add('head')
        }
        else{

            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement)
    })

    //food display
    foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    board.appendChild(foodElement)
}


//musicSound.play();
//main logic
window.requestAnimationFrame(main)
window.addEventListener('keydown',e=>{
     inputDir = { x:0 ,y:1}
     //console.log(e);
     moveSound.play();
     console.log("Hello"+e.key+"No");
     if(e.key==="ArrowUp")
     {
        pause_option=true;
        console.log("ArrowUp")
        inputDir.x=0
        inputDir.y=-1
     }
     else if(e.key==="ArrowDown")
     {
        pause_option=true;
        console.log("ArrowDown")
        inputDir.x=0
        inputDir.y=1
     }
     else if(e.key==="ArrowLeft")
     {
        pause_option=true;
        console.log("ArrowLeft")
        inputDir.x=-1
        inputDir.y=0
     }
     else if(e.key==="ArrowRight")
     {
        pause_option=true;
        console.log("ArrowRight")
        inputDir.x=1
        inputDir.y=0
     }
     else if(e.key===" ")
     {
         console.log("Hi this");
         pause_option=!pause_option;
     }
     /*
     switch (e.key) {
         case 'ArrowUp':
             console.log("ArrowUp")
             inputDir.x=0
             inputDir.y=-1
             break;
        case 'ArrowDown':
            console.log("ArrowDown")
            inputDir.x=0
            inputDir.y=1
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft")
            inputDir.x=-1
            inputDir.y=0
            break;
        case 'ArrowRight':
            console.log("ArrowRight")
            inputDir.x=1
            inputDir.y=0
            break;
        case 'Space':
            console.log("Spacebar")
            pause_option=!pause_option;
            break;
         default:
             break;
     }
     */
})
