let size=16; //size of grid
let content = document.querySelector('.content');
let rainbow = false; //random color mode
let eraze = false; //erazor mode
let colorCode='rgb(0,0,0)';//color of pen
let chooseColor=document.querySelector('#chooseColor');

createDivs();
initializeDivs();

//Create grid in content 
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
//adds drawing functions 
function initializeDivs () {
    let divs = Array.from(document.querySelectorAll('.content div'));
    divs.forEach((div) => div.addEventListener('mouseover',colorDiv));
    displaySize();
}

//changes color 
function changeColorCode (r,g,b){
    colorCode = typeof(r) === 'string' ? convertColorToDec(r) : `rgb(${r},${g},${b})`;
    return colorCode;
}

//Randomize color
function rainbowColor (){
    let str = changeColorCode(Math.floor(Math.random()*255), Math.floor(Math.random()*255),Math.floor(Math.random()*255));
    chooseColor.value=rgbStringColorToHex(str);
}

//coloring single cell
function colorDiv (e){
    if (eraze){ //if eraze mode is switched - change backgrount to white
        colorCode='rgb(255,255,255)';
    }
    else if (!eraze && rainbow){ //if rainbow mode is switched randomoze background-color
        rainbowColor();
    }
    else {
        colorCode=convertColorToDec(chooseColor.value);// simple mode uses last color code
    }
    e.target.style.backgroundColor = colorCode; //change background-color property
}

// displays size of grid in controll panel
function displaySize (value = size){
    document.querySelector('#size').textContent = value;
}

//changes size of grid by prompt
function askSize() {
    do {
        size=prompt("Enter size (default is 16 max 100)",16);
    }
    while (size>100 || size<4);
}

//removes greed
function removeDivs (){
    let divs = Array.from(document.querySelectorAll('.content div'));
    divs.forEach((div) => content.removeChild(div));
}

//returnes hex color mode from rgb
function rgbStringColorToHex(str){
    let start=str.slice(str.indexOf('(')+1,str.indexOf(')'));
    let hexString='#';
    let array=start.split(',');
    for (let i=0; i<array.length;i++){
        if (parseInt(array[i],10) < 16)
            hexString+='0';
        hexString+=parseInt(array[i],10).toString(16);  
    }
    return hexString.toUpperCase();
}

//returnes rgb color mode from hex
function convertColorToDec (str){
    let rgbString=`rgb(`; 
    for (let i=1; i<str.length; i+=2){
        rgbString+=parseInt(str.slice(i,i+2),16).toString(10)+',';
     }
    rgbString=rgbString.slice(0,rgbString.length-1)+')';
    return rgbString;
}

//BUTTONS AND INPUTS SECTION

let rainbowBtn=document.querySelector("[name='rainbowBtn']");
rainbowBtn.addEventListener("click",changeStyleClickedButton);
rainbowBtn.addEventListener('click', () => {
    rainbow = !rainbow;
});

let erazeBtn=document.querySelector("[name='erazeBtn']");
erazeBtn.addEventListener("click",changeStyleClickedButton);
erazeBtn.addEventListener('click', () => {
    eraze = !eraze;
});

function changeStyleClickedButton (e){
    console.log(e.target.className);
    if (e.target.className === 'hooveredButton'){
        e.target.classList.add ('clickedButton');
    }
    else e.target.classList.remove('clickedButton');
}

let clearBtn=document.querySelector("[name='clearBtn']");
clearBtn.addEventListener('click',clearDiv);

//Removes background-color property of the grid
function clearDiv() {
    let divs = Array.from(document.querySelectorAll('.content div'));
    divs.forEach((div) => {
        if (div.style.backgroundColor === '') {
            return;
        }
        div.style.backgroundColor='';
    });
}

//Resizing grid with slider
let slider=document.querySelector('#slider');
slider.addEventListener('input',(e) =>{
    size=e.target.value;
    displaySize(size);
    removeDivs();
    createDivs();
    initializeDivs();
});

//Resizing grid with button
let inputSize=document.querySelector("[name='inputSize']");
inputSize.addEventListener('click',(e) => {
    askSize();
    removeDivs();
    createDivs();
    initializeDivs();
    displaySize(size);
    slider.value=size;
});

chooseColor.addEventListener('input', (e)=>{
    changeColorCode((e.target.value));
    if(rainbow){
        rainbow=false;
        rainbowBtn.classList.remove('clickedButton')
    }
});
//Animating all buttons on mouseover and mouseout
const buttons = Array.from(document.querySelectorAll('button'));
buttons.forEach((button) => button.addEventListener('mouseover',changeBorder));
buttons.forEach((button) => button.addEventListener('mouseout',removeChangeButton));

function changeBorder (e) {
    e.target.classList.add('hooveredButton');
}

function removeChangeButton () {
    this.classList.remove('hooveredButton');
}

