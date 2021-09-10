const player = (name, mark)=>{
    const ai = false;
    return {name, mark,ai}
};

const options = (()=>{
    const gameOptions = document.getElementById('game-options');
    const gameDefault = document.getElementById('game-default');
    const gameClear = document.getElementById('game-restart');
    const gamePlayers = document.getElementById('game-players');
    gameClear.disabled = true;
    let playerOne = player('John Doe','0');
    let playerTwo = player('Foo Bar','X');
    gameOptions.addEventListener('click', (e)=>{
        if (e.target.nodeName !== 'BUTTON') return;
        if (e.target === gameDefault){
            gameClear.disabled = false;
            playerTwo.ai = true;
            console.log(players);
        }else if(e.target === gamePlayers){
            playerOne.name = prompt('Enter player one\'s name', 'John Doe');
            playerTwo.name = prompt('Enter player two\'s name','Jane Doe');
            console.log(players);
        }
        if (e.target === gameClear) gameBoard.clearBoard();
    });
    let players = [playerOne,playerTwo];
    return {players}
})();



const gameBoard = (()=>{
    const board = document.getElementById('game-board');
    const cell = 'cell'; //Use class name as name for dataset

    for (let i=0; i < 9;i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add(cell);
        newDiv.dataset[cell] = i;
        newDiv.textContent = 'X';
        board.appendChild(newDiv);   
    };
    const boardCells = document.querySelectorAll(`[data-${cell}]`)
    const boardArray = Array.from(boardCells);
    const clearBoard = () =>{
        boardArray.forEach(cell => {
            cell.textContent = '';
        });
    }

    return {board, boardCells, boardArray, clearBoard};
})();


const checkWin = (()=>{

})();

/* const playGame = ((condition)=>{
    if (condition === true) return;
    const board = gameBoard.board;
    board.addEventListener('click', (e)=>{
        if (e.target.textContent !== '') return (false);
        e.target.textContent = '0';
        console.log('works');
    });    
})(); */

