let size=16;
let content = document.querySelector('.content');
let rainbow = false;
let colorCode='rgb(0, 0, 0)';
createDivs();
initializeDivs();

function createDivs(){
    for (let i = 0; i < Math.pow(size,2); i++){
        let d = document.createElement('div');
        d.style.cssText=`width:${(640/size)}px;
            height: ${(640/size)}px;
            flex:1 1 auto; 
            margin: 0px;
            box-sizing: border-box;
            padding: 0px; 
            justify-content:evenly;
            content-align: center;`
        content.appendChild(d);  
    }
}

function initializeDivs () {
    let divs = Array.from(document.querySelectorAll('.content div'));
    divs.forEach((div) => div.addEventListener('mouseover',colorDiv));
    displaySize();
}

function colorDiv (e){
    e.target.style.backgroundColor = rainbow ? rainbowColor() : colorCode;
}

function displaySize (value = size){
    let s = document.querySelector('#size');
    s.textContent=value;
}

function askSize() {
    do {
        size=prompt("Enter size (default is 16 max 100)",16);
    }
    while (size>100 || size<4);
}

function removeDivs (){
    let divs = Array.from(document.querySelectorAll('.content div'));
    divs.forEach((div) => content.removeChild(div));
}

function changeColorCode (r,g,b){
    colorCode=`rgb(${r}, ${g}, ${b})`;
    return colorCode;
}

let erazeBtn=document.querySelector("[name='erazeBtn']");
erazeBtn.addEventListener('click', erazeDiv);

function erazeDiv (){
    rainbow = false;
    changeColorCode(255,255,255);
}

function rainbowColor (){
    let str = changeColorCode(Math.floor(Math.random()*255), Math.floor(Math.random()*255),Math.floor(Math.random()*255));
    return str;
}

let clearBtn=document.querySelector("[name='clearBtn']");
clearBtn.addEventListener('click',clearDiv);

function clearDiv() {
    let divs = Array.from(document.querySelectorAll('.content div'));
    divs.forEach((div) => {
        if (div.style.backgroundColor === '') {
            return;
        }
        div.style.backgroundColor='';
    });
}

let slider=document.querySelector('#slider');
slider.addEventListener('input',(e) =>{
    size=e.target.value;
    displaySize(size);
    removeDivs();
    createDivs();
    initializeDivs();
});

let rainbowBtn=document.querySelector("[name='rainbowBtn']");
rainbowBtn.addEventListener('click', (e) => {
    rainbow = rainbow? false : true;
    e.target.style.backgroundColor= rainbow? 'grey': 'rgb(211, 202, 192)';
    if (!rainbow) 
        colorCode='rgb(0, 0, 0)'
    }
);

let inputSize=document.querySelector("[name='inputSize']");
inputSize.addEventListener('click',(e) => {
    askSize();
    removeDivs();
    createDivs();
    initializeDivs();
    displaySize(size);
    slider.value=size;
});

const buttons = Array.from(document.querySelectorAll('button'));
console.log(buttons);
buttons.forEach((button) => button.addEventListener('mouseover',changeBorder));
buttons.forEach((button) => button.addEventListener('mouseout',removeChangeButton));

function changeBorder (e) {
    e.target.classList.add('clickedButton');
}

function removeChangeButton (e) {
    this.classList.remove('clickedButton');
}