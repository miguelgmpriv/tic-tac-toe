const player = (name, mark)=>{
    const ai = false;
    const win = false;
    return {name, mark, ai, win}
};

const options = (()=>{
    const gameDefault = document.getElementById('game-default');
    const gameClear = document.getElementById('game-restart');
    const gamePlayers = document.getElementById('game-players');
    let playerOne = player('John Doe','O');
    let playerTwo = player('Foo Bar','X');
    gameDefault.addEventListener('click', ()=>{
        playerTwo.ai = true;
        playerTwo.name = 'Foo Bar';
    });        
    gamePlayers.addEventListener('click', ()=>{
        playerOne.name = prompt('Enter player one\'s name', 'John Doe');
        playerTwo.name = prompt('Enter player two\'s name','Jane Doe');
    });
    gameClear.addEventListener('click', ()=>{
        gameBoard.clearBoard();
    });
    return {playerOne, playerTwo}
})();

const gameBoard = (()=>{
    const board = document.getElementById('game-board');
    const cell = 'cell'; //Use class name as name for dataset
    for (let i = 0; i < 9;i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add(cell);
        newDiv.dataset[cell] = i;
        board.appendChild(newDiv);   
    };
    const boardCells = document.querySelectorAll(`[data-${cell}]`)
    const boardArray = Array.from(boardCells);
    const clearBoard = ()=>{
        boardArray.forEach(cell => {
            cell.textContent = '';
        });
    }
    return {board, boardCells, boardArray, clearBoard};
})();

const checkWin = (()=>{

})();

const playGame = (()=>{
    let playerTurn = true; //player one start
    const playerOne = options.playerOne;
    const playerTwo = options.playerTwo;
    const markTest = [playerOne.mark, playerTwo.mark];
    const board = gameBoard.board;
    const markBoard = (event)=>{
        const markCell = event.target
        if ((markTest.includes(markCell.textContent))) return;
        if (playerTurn){
            markCell.textContent = playerOne.mark;
            playerTurn = false;
        } else if (!playerTurn){
            markCell.textContent = playerTwo.mark;
            playerTurn = true;
        }
    };  
    board.addEventListener('click', markBoard);
})();

