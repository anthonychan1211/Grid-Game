// Create level number and step number
let currLevel = 1;
let levelTitle = `Level ${currLevel}`
const level = document.getElementById('level');
level.textContent = levelTitle;
let step = 0;
const stepCount = document.getElementById('step-count');
stepCount.innerText = `Step: ${step}`
const modalBox = document.getElementById('modal-box');
const winningBox = document.getElementById('winning-modal-box');
const randomChallengeWinningBox = document.getElementById('random-modal-box')
let randomizedArr = [];
// Create check pass record
let lit = [];
let stepRecord = [];

// Create Undo function

const undoButton = document.getElementById('undo');
undoButton.addEventListener('click', function(e){
    let lastStep = stepRecord[stepRecord.length -1];
    let lastbox = document.getElementById(lastStep);
    colorToggle(lastbox);
    chain(lastbox)
    stepRecord.pop()
    let status = lit.includes(lastStep)
    if(status){
        lit.splice(lit.indexOf(lastStep), 1)
    }
    if(!status){
        lit.push(lastStep)
    }
})

function stepStack(target){
    stepRecord.push(target.id);  
}

// Create Reset function
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function(){
        if(randomChallengeButton.innerText === 'Random Challenge'){
            for(let i=0; i<lit.length;i++){
                let litBox = document.getElementById(lit[i])
                colorToggle(litBox)
                chain(litBox)
            }
            lit = [];
            for(let i=0; i<levelArr[currLevel-1].length;i++){
                let startingBox = document.getElementById(levelArr[currLevel-1][i]);
                colorToggle(startingBox);
                chain(startingBox);
                lit.push(startingBox.id);
            }
            stepRecord = [];
            step = 0;
            stepCount.innerText = `Step: ${step}`
        }
        if(randomChallengeButton.innerText === 'Level Challenge'){
            for(let i=0; i<lit.length;i++){
                let litBox = document.getElementById(lit[i])
                colorToggle(litBox)
                chain(litBox)
            }
            lit = [];
            for(let i=0; i<randomizedArr.length;i++){
                let startingBox = document.getElementById(randomizedArr[i]);
                colorToggle(startingBox);
                chain(startingBox);
                lit.push(startingBox.id);
            }
            stepRecord = [];
            step = 0;
            stepCount.innerText = `Step: ${step}`
        }
    })

// Create color toggle function
function colorToggle(target){
    if(target.style.backgroundColor == 'rgb(30, 0, 26)'){
        target.style.backgroundColor = 'rgb(86, 186, 56)'
        return;
    }
    if(target.style.backgroundColor == 'rgb(86, 186, 56)'){ 
        target.style.backgroundColor = 'rgb(30, 0, 26)'
        return; 
    }
}

// Create chain function
function chain (target){
    const boxID = target.id
    const split = boxID.split('\,').map(x => parseInt(x,10))
    for(let i=0 ; i < 10; i++){
        const flipboxHorizontal = document.getElementById(`${split[0]},${i}`);
        const flipboxVertical = document.getElementById((`${i},${split[1]}`))
        colorToggle(flipboxHorizontal)
        colorToggle(flipboxVertical)
        colorToggle(target)
    }
}

//Create check pass function

function litList(target){
    let currstep = target.id;
    let status = lit.includes(currstep)
    
    if(status){
        let targetIndex = lit.indexOf(currstep);
        lit.splice(targetIndex, 1)
    }
    if(!status){
        lit.push(currstep)
    }
    if(lit.length === 0 && currLevel < 10 && randomChallengeButton.innerText !== 'Level Challenge'){
        modalBox.style.display = 'block'
        stepRecord = [];
    }
    if(lit.length === 0 && currLevel === 10 && randomChallengeButton.innerText !== 'Level Challenge'){
        winningBox.style.display = 'block'
    }
    if(lit.length === 0 && randomChallengeButton.innerText === 'Level Challenge'){
        randomChallengeWinningBox.style.display = 'block'
    }
}
// Create Box
for(let i = 0 ; i < 10 ; i++){
    for(let j = 0 ; j < 10 ; j++){
        const box = document.createElement('div');
        box.id = `${i},${j}`;
        box.className = 'box'
        box.style.backgroundColor = 'rgb(86, 186, 56)'
        const mainGrid = document.querySelector('#main-grid');

        // Create 'click to change function'
        box.addEventListener('click', function(e){
            e.preventDefault();
            colorToggle(e.target)
            chain(e.target)
            litList(e.target)
            stepStack(e.target)
            step += 1;
            stepCount.innerText = `Step: ${step}`
            console.log(lit);
        })





        mainGrid.appendChild(box);
    }
    }
    

   // Create Replay Function

   const replayButton = document.getElementById('modal-replay');
   replayButton.addEventListener('click', function(e){
       modalBox.style.display = 'none';
       for(let i=0; i<levelArr[currLevel-1].length;i++){
           let startingBox = document.getElementById(levelArr[currLevel-1][i]);
           colorToggle(startingBox);
           chain(startingBox);
           lit.push(startingBox.id);
       }
       stepRecord = [];
       step = 0;
       stepCount.innerText = `Step: ${step}`
   })

//    Create final Replay Function
const finalReplayButton = document.getElementById('final-replay');
finalReplayButton.addEventListener('click', function(e){
    winningBox.style.display = 'none';
    for(let i=0; i<levelArr[currLevel-1].length;i++){
        let startingBox = document.getElementById(levelArr[currLevel-1][i]);
        colorToggle(startingBox);
        chain(startingBox);
        lit.push(startingBox.id);
    }
    stepRecord = [];
    step = 0;
    stepCount.innerText = `Step: ${step}`
})


// Create next level function

const nextLevelButton = document.getElementById('modal-next')
nextLevelButton.addEventListener('click', function (e){
    modalBox.style.display = 'none';
    nextLevel(currLevel)
    currLevel += 1;
    let levelTitle = `Level ${currLevel}`
    level.textContent = levelTitle;
    stepRecord = [];
    step = 0;
    stepCount.innerText = `Step: ${step}`
})

// Level 1 
const level1box1 = document.getElementById('5,5')
colorToggle(level1box1)
chain(level1box1)
lit.push(level1box1.id);  


// Next level function
const levelArr = [['5,5'], 
                ['3,5', '6,8'],
                ['0,0', '7,4', '3,6'],
                ['3,6', '2,2', '8,1', '5,5'],
                ['9,2', '5,3', '8,2', '3,8', '8,3'],
                ['1,2', '1,1', '9,3', '0,1', '1,8', '1,9'],
                ['0,5', '2,0', '6,4', '8,9', '9,0', '9,2', '1,9'],
                ['9,3', '6,4', '9,7', '3,3', '8,8', '1,7', '5,4', '1,0'],
                ['2,1', '7,2', '0,0', '2,5', '3,4', '8,9', '6,4', '4,4', '3,2'],
                ['0,3', '3,4', '2,1', '8,7', '5,6', '9,2', '1,8', '5,2', '7,7', '2,2']];

function nextLevel(level){

    for(let i = 0; i < levelArr[level].length; i++){
        let startingBox = document.getElementById(levelArr[level][i]);
        colorToggle(startingBox);
        chain(startingBox);
        lit.push(startingBox.id);
    }
}


//  Create Random Function
function getRandomBox(){
    for(let i = 0 ; i < 8 ; i++){
        let x = Math.floor(Math.random()*9);
        let y = Math.floor(Math.random()*9);
        let boxCo = `${x},${y}`
        let thisBox = document.getElementById(boxCo);
        colorToggle(thisBox)
        chain(thisBox)
        lit.push(boxCo)
        randomizedArr.push(boxCo)
        ;
    }
   console.log(randomizedArr);
   console.log(lit);
}
//  Create Random Challenge

const randomChallengeButton = document.getElementById('random-challenge')

randomChallengeButton.addEventListener('click', function(){
    if(randomChallengeButton.innerText === 'Level Challenge'){
        randomChallengeButton.innerText = 'Random Challenge'
        currLevel = 1 ;
        level.innerText = `Level ${currLevel}`
        for(let i=0; i<lit.length;i++){
            let litBox = document.getElementById(lit[i])
            colorToggle(litBox)
            chain(litBox)
        }
        lit = [];
        colorToggle(level1box1)
        chain(level1box1)
        lit.push(level1box1.id);    
        stepRecord = [];
        step = 0;
        stepCount.innerText = `Step : ${step}`;
        return;
    }
    if(randomChallengeButton.innerText === 'Random Challenge'){
        randomChallengeButton.innerText = 'Level Challenge'
        level.innerText = 'Level Random'
        getRandomBox();
        return;
    }
    
})

//  Create Random Challenge winning modal

// Back to Level
const backToLevelChallenge = document.getElementById('level-challenge');
backToLevelChallenge.addEventListener('click', function (){
    for(let i=0; i<lit.length;i++){
        let litBox = document.getElementById(lit[i])
        colorToggle(litBox)
        chain(litBox)
    }
    lit = [];
    colorToggle(level1box1)
    chain(level1box1)
    lit.push(level1box1.id);    
    stepRecord = [];
    step = 0;
    stepCount.innerText = `Step : ${step}`;
    randomChallengeWinningBox.style.display = 'none';
    currLevel = 1 ;
    level.innerText = `Level ${currLevel}`
    randomChallengeButton.innerText = 'Random Challenge'
}
);

// New Random Challenge

const newRandomChallenge = document.getElementById('new-random');

newRandomChallenge.addEventListener('click', function(){
    getRandomBox();
    randomChallengeWinningBox.style.display = 'none';
    step = 0;
    stepCount.innerText = `Step: ${step}`
})
