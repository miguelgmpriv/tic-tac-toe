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
            return gameWin.checkWin(playerOne)
        } else if (!playerTurn){
            markCell.textContent = playerTwo.mark;
            playerTurn = true;
            return gameWin.checkWin(playerTwo);
        }
        
    };  
    board.addEventListener('click', markBoard);
})();

const gameWin = (()=>{
    const _matrix = (arr, size) =>
        arr.reduce((rows, key, index) => (index % size == 0 ? rows.push([key]) 
            : rows[rows.length-1].push(key)) && rows, []); 
    const _check = (arr, step, counter, player, direction) =>{

        if (counter === step) return

        _check(arr, step, counter+1, player, direction);

        if (direction === 'row'){
        for (let i = 0; i < step-1; i++){
            if (arr[counter][i].textContent === '') continue;
            if (arr[counter][i].textContent !== arr[counter][i+1].textContent) continue;
            if (i === step-2 &&
                arr[counter][i].textContent === arr[counter][0].textContent) player.win = true;
        }
        } else if (direction === 'column'){
            for (let i = 0; i < step-1; i++){
                if (arr[i][counter].textContent === '') continue;
                if (arr[i][counter].textContent !== arr[i+1][counter].textContent) continue;
                if (i === step-2 &&
                    arr[i][counter].textContent === arr[0][counter].textContent) player.win = true;
            }
        } else if (direction === 'diagonal'){
            for (let i = 0; i < step-1; i++){
                if (arr[i][i].textContent === '') continue;
                if (arr[i][i].textContent !== arr[i+1][i+1].textContent) continue;
                if (i === step-2 &&
                    arr[i][i].textContent === arr[0][0].textContent) player.win = true;
            }
            for (let i = step-1, x = 0; i >= 1; i--, x++){
                if (arr[i][x].textContent === '') continue;
                if (arr[i][x].textContent !== arr[i-1][x+1].textContent) continue;
                if (i === 1 &&
                    arr[i-1][x+1].textContent === arr[step-1][0].textContent) player.win = true;
            }
        }
    }
    const checkWin = (player) =>{
        const testArray = _matrix(gameBoard.boardArray, gameBoard.gridSize);
        const step = testArray.length;
        _check(testArray, step, 0, player,'row');
        _check(testArray, step, 0, player, 'column');
        _check(testArray, step, 0, player, 'diagonal');
        console.log(player);   
    }
    return {checkWin}
})();