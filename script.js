const player = (name, mark)=>{
    const ai = false;
    const win = false;
    const active = false;
    return {name, mark, ai, win, active}
};

const options = (()=>{
    //Grid size and button controls here
    const gameDefault = document.getElementById('game-default');
    const gameClear = document.getElementById('game-restart');
    const gamePlayers = document.getElementById('game-players');
    const gameSize = document.getElementById('game-size');
    const playerOne = player('John Doe','O');
    const playerTwo = player('Foo Bar','X');
    playerTwo.ai = true;
    const _restart = ()=>{
        const board = gameBoard.board();
        playerOne.win = false;
        playerOne.active = true;
        playerTwo.win = false;
        gameBoard.clearBoard();
        board.addEventListener('click', playGame.markBoard);
    };
    gameDefault.addEventListener('click', ()=>{
        playerTwo.ai = true;
        playerTwo.name = 'Foo Bar';
        _restart();
    });        
    gamePlayers.addEventListener('click', ()=>{
        playerOne.name = prompt('Enter player one\'s name', 'John Doe');
        playerTwo.name = prompt('Enter player two\'s name','Jane Doe');
        playerTwo.ai = false;
        _restart();
    });
    gameClear.addEventListener('click', _restart);
    gameSize.addEventListener('change', (event)=>{
        gameBoard.createBoard(event.target.value);
        _restart();
    });
    return {
        playerOne, 
        playerTwo
    }
})();

const display = (()=>{
    //Display controller here. Event listener turned off once a tie or win is reached
    const gameDisplay = document.getElementById('game-display');

    const currentPlayer = (player)=>{
        if (playGame.checkBoard() === false) return displayTie();
        gameDisplay.textContent = `${player.name}'s turn!`;
    };
    const displayWinner = (player)=>{
        gameDisplay.textContent = `${player.name} won! Click new game to try again`;
        const board = gameBoard.board();
        board.removeEventListener('click', playGame.markBoard);
    };
    const displayTie = ()=>{
        const board = gameBoard.board();
        gameDisplay.textContent = `It's a tie! Click new game to try again`;
        board.removeEventListener('click', playGame.markBoard);
    };
    return{ 
        currentPlayer, 
        displayWinner,
        displayTie,
    };
})();

const gameBoard = (()=>{
    //Create the board and other board related functions
    //Chose to set up public functions to get the grid size and board just so only need to change here
    //if class name or variable change.
    const root = document.querySelector(':root');
    const board = ()=>{return document.getElementById('game-board')};
    const gridSize = ()=>{return getComputedStyle(root).getPropertyValue('--grid-size')}
    const boardArray = ()=>{return Array.from(document.querySelectorAll(`[data-${cell}]`))};
    const currentBoard = board();
    const defaultSize = gridSize();
    const cell = 'cell'; 

    const createBoard = (size)=>{
        root.style.setProperty('--grid-size', size);
        while(currentBoard.firstChild){
            currentBoard.removeChild(currentBoard.firstChild);
        }
        for (let i = 0; i < (size*size);i++){
            let newDiv = document.createElement('div');
            newDiv.classList.add(cell);
            newDiv.dataset[cell] = i;
            currentBoard.appendChild(newDiv);   
        };
        const currentArray = boardArray();
        currentArray.forEach(cell => {cell.textContent = ''});
    };  
    const clearBoard = ()=>{
        const currentArray = boardArray();
        currentArray.forEach(cell => {cell.textContent = ''});
        display.currentPlayer(options.playerOne);
    };
    createBoard(defaultSize);
    return {
        board, 
        boardArray, 
        clearBoard, 
        createBoard, 
        gridSize};
})();

const playGame = (()=>{
    //Controls flow of the game. The private functions mostly have to do with the AI
    const playerOne = options.playerOne;
    const playerTwo = options.playerTwo;
    const markTest = [playerOne.mark, playerTwo.mark];
    const board = gameBoard.board();

    const _target = (max)=>{return Math.floor(Math.random() * max)}
    const checkBoard = () =>{
        const currentBoard = gameBoard.boardArray();
        for (div = 0; div < currentBoard.length; div++){
            if (currentBoard[div].textContent === '') return true
        }
        return false;
    };
    const _aiMoves = ()=>{
        //Checks the board and if it has space it will loop until a valid move is available
        const currentGrid = gameBoard.boardArray();
        if (checkBoard()){
            while(true){
                const aiMove = _target(currentGrid.length);
                if (currentGrid[aiMove].textContent === ''){
                    currentGrid[aiMove].textContent = playerTwo.mark;
                    break;
                }
            }
        return gameWin.checkWin(playerTwo);
        }
        return false
    };
    const _vsAi = (event)=>{
        //Mark the players mark on the grid and then follow with the AI logic
        event.target.textContent = playerOne.mark;
        if (gameWin.checkWin(playerOne)) return display.displayWinner(playerOne);
        if (!checkBoard()) return display.displayTie();
        board.removeEventListener('click', markBoard);
        if (_aiMoves()){
            return display.displayWinner(playerTwo);
        } 
        board.addEventListener('click', markBoard);
    }
    const markBoard = (event)=>{
        //Check for legal moves and then follow depending on AI or human player
        const markCell = event.target
        const board = gameBoard.board();
        if ((markTest.includes(markCell.textContent)||(markCell === board))) return;
        if (playerTwo.ai) return _vsAi(event);
        if (playerOne.active){
            markCell.textContent = playerOne.mark;
            playerOne.active = false;
            playerTwo.active = true;
            return (gameWin.checkWin(playerOne)) ? display.displayWinner(playerOne) : display.currentPlayer(playerTwo)
        } else if (playerTwo.active){
            markCell.textContent = playerTwo.mark;
            playerTwo.active = false;
            playerOne.active = true;
            return (gameWin.checkWin(playerTwo)) ? display.displayWinner(playerTwo) : display.currentPlayer(playerOne)
        }    
    };  
    board.addEventListener('click', markBoard);
    return{
        markBoard,
        checkBoard
    }
})();

const gameWin = (()=>{
    //Win checking is done by running a recursive function and a combination of 
    //slice/reduce/push/join array manipulation to get the arrays on a row based on grid size.
    //Once they are in a row and returned as a string _check will compare with the regex to see if
    //any truthy conditions are met and update player.win
    const _check = (arr, step, counter, player, direction)=>{

        if (counter === step) return
        _check(arr, step, counter+1, player, direction);

        let testO = new RegExp(`O{${step}}`);
        let testX = new RegExp(`X{${step}}`);
        let testArray = [];

        if (direction === 'row'){
            testArray = arr.slice((counter*step),((counter+1)*step)).join('');
            if (testO.test(testArray) || testX.test(testArray)) return player.win = true;
        }
        if (direction === 'column'){
            testArray = arr.reduce((first, next, index, arr)=>{
                if (index  % step === 0) first.push(arr[index+counter]);
                return first
            },[]).join('');
            if (testO.test(testArray) || testX.test(testArray)) return player.win = true;
        }
        if (direction === 'diagonal'){
            let diag = [];
            let diagReverse = [];
            for (let i = 0, x = step + 1; i <= arr.length; i = i + x){
                diag.push(arr[i]);
            }
            diag = diag.join('');
            for (let i = step-1, x = (arr.length-step); x >= i;  x = x - i){
                diagReverse.push(arr[x]);
            }
            diagReverse = diagReverse.join('');
            if (testO.test(diag) || testX.test(diag)
                || testO.test(diagReverse) || testX.test(diagReverse)) return player.win = true;
        }
    };
    const checkWin = (player) =>{
        //After running _check checkWin returns either true or false to continue the game
        const originalArray = gameBoard.boardArray();
        const size = Number(gameBoard.gridSize());
        let testArray = []
        originalArray.forEach((value)=>{
            testArray.push(value.textContent);
        });
        _check(testArray, size, 0, player,'row');
        _check(testArray, size, 0, player, 'column');
        _check(testArray, size, 0, player, 'diagonal');
        return (player.win) 
    }
    return {
        checkWin
    }
})();