/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 0;
dice = randomNumber();

function randomNumber() {
    return Math.floor(Math.random() * 6) + 1;
}

document.querySelector('#current-' + activePlayer).textContent = dice;

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

let x = document.querySelector('#score-0').textContent;
document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){

    var diceDOM = document.querySelector('.dice');
    // 1. Random number
    var dice = randomNumber();

    // 2. display the result
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3. Update the round score IF the rolled number was NOT a 1.
    if (dice !== 1) {
        // Add score
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    // add the current score to the global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game.
    if (scores[activePlayer] >= 100) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.getElementsByClassName('btn-roll').disabled = true;
    } else {
        // next player
        nextPlayer();
    }




});

function nextPlayer() {
    // Next player
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}