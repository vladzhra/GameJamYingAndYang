/**Create a board with 20 blocks
**Create two of each number to store in cards
**Each chiniese character must match each outher
**Once all cards our match send an congraulation message
**Reset game on button or refresh
*/

const chineseNumbers = ['一','一','二','二','三','三','四','四',
                        '五','五','六','六','七','七','八','八',
                        '九','九','十','十'];

const shuffleCards = shuffleNumbers(chineseNumbers);

const gameBoard = document.querySelector('#gameContainer');
const cardContainer = document.querySelector("#cardContainer");

function createBoard(){
    for(let i = 0; i < chineseNumbers.length; i++){
        const flip = document.createElement('div');
        flip.classList.add('flip');

        const card = document.createElement('div');
        card.classList.add('card');
        flip.appendChild(card);
        const front = document.createElement('div');
        front.classList.add('front');

        card.appendChild(front);

        const back = document.createElement('div');
        back.classList.add('back');

        back.innerHTML = chineseNumbers[i];
        card.appendChild(back);
        cardContainer.appendChild(flip);
    }
}
createBoard();

let matchedPairs = 0;

function shuffleNumbers(arr){
    for(let k = arr.length -1; k > 0; k--){
        const random = Math.floor(Math.random() * (k + 1));
        [arr[k],arr[random]] = [arr[random],arr[k]];
    }
    return arr;
}
let cardOne = [];
let cardTwo = [];

function cardFlip(){
    const flipCard = document.querySelectorAll(".card");

    for(let j = 0; j < flipCard.length; j++){
        flipCard[j].addEventListener("click", function() {
            flipCard[j].classList.toggle("cardFlip");
            if (cardOne.length === 0) {
                cardOne.push(flipCard[j]);
            }else{
                cardTwo.push(flipCard[j]);
                const valueOne = cardOne[0].querySelector('.back').innerHTML;
                const valueTwo = cardTwo[0].querySelector('.back').innerHTML;
            if (valueOne === valueTwo) {
                cardOne = [];
                cardTwo = [];
                matchedPairs++;
                if (matchedPairs === chineseNumbers.length / 2) {
                    const alertBox = document.getElementById("alertBox");
                        alertBox.classList.remove("hidden");
                    const alertButton = document.getElementById('alertButton');
                        alertButton.addEventListener('click', function() {
                        location.reload();
                         })
                    }
                }else{
                     setTimeout(() => {
                        cardOne[0].classList.remove('cardFlip');
                        cardTwo[0].classList.remove('cardFlip');
                        cardOne = [];
                        cardTwo = [];
                    }, 1000);
                }
            }
        })
    }
}
cardFlip();

restartButton.addEventListener("click", function(){
    cardContainer.innerHTML = "";
    createBoard();
    matchedPairs = 0;
    cardOne = [];
    cardTwo = [];
    cardFlip();
});

const themeSettings = evt => {
    const body = document.body
    const theme = evt.currentTarget.selectedOptions[0].value

    switch (theme){
        case 'light':
            body.setAttribute('data-theme', 'light');
            break;
        case 'dark':
            body.setAttribute('data-theme','dark');
            break;
        case 'newYear':
            body.setAttribute('data-theme','newyear');
            break;
        case 'default':
            body.setAttribute('data-theme', 'default');
            break;
    }
}
const toggleTheme = document.getElementById('theme-toggle')

toggleTheme.addEventListener('change', themeSettings)
