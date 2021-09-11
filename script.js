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
    const gridSize = 3;
    const cell = 'cell'; //Use class name as name for dataset
    for (let i = 0; i < (gridSize*gridSize);i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add(cell);
        newDiv.dataset[cell] = i;
        board.appendChild(newDiv);   
    };
    const boardArray = Array.from(document.querySelectorAll(`[data-${cell}]`));
    const clearBoard = ()=>{
        boardArray.forEach(cell => {
            cell.textContent = '';
        });
    }
    return {board, boardArray, gridSize, clearBoard};
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
        return gameWin.checkWin()
    };  
    board.addEventListener('click', markBoard);
})();

const gameWin = (()=>{
    const matrix = (arr, size) =>
        arr.reduce((rows, key, index) => (index % size == 0 ? rows.push([key]) 
            : rows[rows.length-1].push(key)) && rows, []); 
    const checkWin = () =>{
        const testArray = matrix(gameBoard.boardArray, gameBoard.gridSize);
        console.log(testArray);
        let win = false;
        for (let i = 0; i < gameBoard.gridSize; i++){
            let won = true;
            for (let x = 0; x < (gameBoard.gridSize - 1); x++){
                if (row[i][x].textContent === '' || won === false){
                    won = false;
                    break;
                }
                if (row[i][x].textContent !== row[i][x+1].textContent){
                    won = false;
                }
            }
            if (won === true){
                win = true;
                break;
            }
        }
        if (win === true){
            console.log('you won');
        }
    }
    return {checkWin}
})();