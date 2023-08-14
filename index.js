const box = document.querySelectorAll('.box');
const turntext = document.querySelector('.turn');
const boxtext = document.querySelectorAll('.boxtext');

let isWin = false;
let playerXTurn = true;  // declare it here
const img = document.querySelector('img');
const ting = new Audio('ting.mp3');
const music = new Audio("music.mp3");
const gameOver = new Audio("gameover.mp3");

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWin() {
    const boxtexts = [...document.querySelectorAll('.boxtext')];
    return winningCombos.some(combo => {
        return boxtexts[combo[0]].innerText !== '' &&
            boxtexts[combo[0]].innerText === boxtexts[combo[1]].innerText &&
            boxtexts[combo[1]].innerText === boxtexts[combo[2]].innerText;
    });
}

function konsaColor(element) {
   return element == 'X' ? 'lightblue' : 'pink';
}

function turn(element) {
  return element === 'X' ? 'O' : 'X';
}

function attachStartListeners() {
    document.querySelector('.btnx').addEventListener('click', (e) => {
        playerXTurn = true;
        turntext.innerText = ' Turn for X';
        music.play();
    });

    document.querySelector('.btny').addEventListener('click', (e) => {
        playerXTurn = false;
        turntext.innerText = ' Turn for O';
        music.play();
    });
}

box.forEach((b, i) => {
    b.addEventListener('click', () => {
        const boxtext = b.querySelector('.boxtext');
        if (!boxtext.innerText && !isWin) {
            boxtext.innerText = playerXTurn ? 'X' : 'O';
            b.style.color = konsaColor(boxtext.innerText);
            ting.play();
            music.play();
            isWin = checkWin();
            if (isWin) {
                turntext.innerText = `${boxtext.innerText} is Winner`;
                img.style.width = "14vw";
                music.pause();
                gameOver.play();
            } else {
                playerXTurn = !playerXTurn;
                turntext.innerText = `Turn for ${playerXTurn ? 'X' : 'O'}`;
            }
        }
    });
});

document.querySelector('.reset').addEventListener('click', () => {
    document.querySelectorAll('.boxtext').forEach(bt => bt.innerText = '');
    turntext.textContent = "Turn for X";
    playerXTurn = true;
    isWin = false;
    img.style.width = "0vw";
    music.pause();
    turntext.innerHTML = 'who wants <br> play first <span class="btns btnx">X</span><span class="btns btny">O</span>';
    attachStartListeners();
});

attachStartListeners();
