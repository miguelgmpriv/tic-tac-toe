const player = (name, mark)=>{
    const ai = false;
    const win = false;
    const active = false;
    return {name, mark, ai, win, active}
};

const options = (()=>{
    const gameDefault = document.getElementById('game-default');
    const gameClear = document.getElementById('game-restart');
    const gamePlayers = document.getElementById('game-players');
    const gameSize = document.getElementById('game-size');
    const playerOne = player('John Doe','O');
    const playerTwo = player('Foo Bar','X');
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
        _restart();
    });
    gameClear.addEventListener('click', _restart);
    gameSize.addEventListener('change', (event)=>{
        gameBoard.createBoard(event.target.value);
        _restart();
    });
    return {playerOne, playerTwo}
})();

const display = (()=>{
    const gameDisplay = document.getElementById('game-display');
    const playerOne = options.playerOne;
    const playerTwo = options.playerTwo;
    const currentPlayer = (player)=>{
        gameDisplay.textContent = `${player.name}'s turn!`;
    };
    const displayWinner = (player)=>{
        gameDisplay.textContent = `${player.name} won!`;
        const board = gameBoard.board();
        board.removeEventListener('click', playGame.markBoard);
    };
    return{currentPlayer, displayWinner};
})();

const gameBoard = (()=>{
    const board = ()=>{return document.getElementById('game-board')};
    const currentBoard = board();
    const cell = 'cell'; //Use class name as name for dataset
    const root = document.querySelector(':root');
    const gridSize = ()=>{return getComputedStyle(root).getPropertyValue('--grid-size')}
    const defaultSize = gridSize();
    const boardArray = ()=>{return Array.from(document.querySelectorAll(`[data-${cell}]`))};
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
        clearBoard();
    };  
    const clearBoard = ()=>{
        const currentArray = boardArray();
        currentArray.forEach(cell => {cell.textContent = ''});
        display.currentPlayer(options.playerOne);
    };
    createBoard(defaultSize);
    return {board, boardArray, clearBoard, createBoard, gridSize};
})();

const playGame = (()=>{
    const playerOne = options.playerOne;
    const playerTwo = options.playerTwo;
    const markTest = [playerOne.mark, playerTwo.mark];
    const board = gameBoard.board();
    const _target = (max)=>{return Math.floor(Math.random() * max)}
    const _aiMoves = ()=>{
        const currentGrid = gameBoard.boardArray();
        while(true){
            const aiMove = _target(currentGrid.length);
            if (currentGrid[aiMove].textContent === ''){
                currentGrid[aiMove].textContent = playerTwo.mark;
                break;
            }
        }
        return gameWin.checkWin(playerTwo);
    };
/*     const _vsAi = (event)=>{
        event.target.textContent = playerOne.mark;
        board.removeEventListener('click', markBoard);

        //setTimeout();

    } */
    const markBoard = (event)=>{
        const markCell = event.target
        if ((markTest.includes(markCell.textContent))) return;
        if (playerTwo.ai) _vsAi(event);
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
    return{markBoard}
})();

const gameWin = (()=>{
    const _matrix = (arr, size) =>
        arr.reduce((rows, key, index) => (index % size == 0 ? rows.push([key]) 
            : rows[rows.length-1].push(key)) && rows, []); 
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



/* 
    const _check = (arr, step, counter, player, direction) =>{

        if (counter === step) return

        _check(arr, step, counter+1, player, direction);

        if (direction === 'row'){
            for (let i = 0; i < step-1; i++){
            if (arr[counter][i].textContent === '') break;
            if (arr[counter][i].textContent !== arr[counter][i+1].textContent) break;
            if (i === step-2 &&
                arr[counter][i].textContent === arr[counter][0].textContent) player.win = true;
        }
        } else if (direction === 'column'){
            for (let i = 0; i < step-1; i++){
                if (arr[i][counter].textContent === '') break;
                if (arr[i][counter].textContent !== arr[i+1][counter].textContent) break;
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
    } */
    const checkWin = (player) =>{
        const originalArray = gameBoard.boardArray();
        let testArray = []

        originalArray.forEach((value)=>{
            testArray.push(value.textContent);
        });
        //const testArray = _matrix(originalArray, size);
        const step = Number(gameBoard.gridSize());
        _check(testArray, step, 0, player,'row');
        _check(testArray, step, 0, player, 'column');
        _check(testArray, step, 0, player, 'diagonal');
        console.log(player);
        return (player.win) 
    }
    return {checkWin}
})();