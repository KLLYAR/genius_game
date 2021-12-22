const greenPad = document.getElementById("light-green");
const redPad = document.getElementById("light-red");
const yellowPad = document.getElementById("light-yellow");
const bluePad = document.getElementById("light-blue");
const centerPad = document.getElementById("center");
const lightBase = document.getElementById("light-black");
const darkBase = document.getElementById("dark-black");

const lightBaseColor = lightBase.style.fill;
const darkBaseColor = darkBase.style.fill;

let started = false;

let order = [];
let clickedOrder = [];
let score = 0;


const tap = (name, color) =>
{
    if(!started) return;

    const tappedPosition = "translate(0, 0)";
    let pad = document.getElementById(name);
    let origin = pad.style.transform;

    pad.style.transform = tappedPosition; 

    setTimeout(() =>
    {
        pad.style.transform = origin; 
        pad.parentElement.classList.remove('selected');
        checkOrder();
    }, 200);

    clickedOrder[clickedOrder.length] = color;
    pad.parentElement.classList.add('selected');
}

const changeFillColor = (element, newColor, oldColor) => 
{
    element.style.fill = newColor;
    setTimeout(() =>
    {
        element.style.fill = oldColor;
    }, 500);
}

const shuffleOrder = () => 
{
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) 
    {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

const lightColor = (element, number) => 
{
    number = number * 500;
    setTimeout(() => 
    {
        element.parentElement.classList.add('selected');
    }, number + 200);
    
    setTimeout(() => 
    {
        element.parentElement.classList.remove('selected');
    }, number + 400);
}

const checkOrder = () => 
{
    for(let i in clickedOrder) 
    {
        if(clickedOrder[i] != order[i]) 
        {
            gameOver();
            return;
        }
    }

    if(clickedOrder.length == order.length) 
    {
        nextLevel();
    }
}

const createColorElement = (color) => 
{
    if(color == 0) 
    {
        return greenPad;
    } 
    else if(color == 1) 
    {
        return redPad;
    } 
    else if (color == 2) 
    {
        return yellowPad;
    } 
    else if (color == 3) 
    {
        return bluePad;
    }

}

const updateScore = (score) =>
{
    const scoreText = document.getElementById("score");
    scoreText.innerText = `Score: ${score}`;
}

const nextLevel = () => 
{
    score++;

    updateScore(score);
    changeFillColor(lightBase, "#96ffa1", lightBaseColor);
    setTimeout(() =>
    {
        shuffleOrder();
    }, 1000);
}

const gameOver = () => 
{
    started = false;
    changeFillColor(darkBase, "#c95757", darkBaseColor);
}

const playGame = () => 
{
    if(started) return;

    order = [];
    clickedOrder = [];
    score = 0;
    started = true;

    updateScore(score);
    changeFillColor(darkBase, "#5779c9", darkBaseColor);
    setTimeout(() =>
    {
        shuffleOrder();
    }, 1000);
}

greenPad.onclick = () => tap("light-green", 0);
redPad.onclick = () => tap("light-red", 1);
yellowPad.onclick = () => tap("light-yellow", 2);
bluePad.onclick = () => tap("light-blue", 3);
centerPad.onclick = () => playGame();
