const gameBoard = (()=>{
    const board = document.getElementById('game-board');
    const cell = 'cell'; //Use class name as name for dataset
    const resetButton = document.getElementById('game-restart');
    for (let i=0; i < 9;i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add(cell);
        newDiv.dataset[cell] = i;
        board.appendChild(newDiv);   
    };
    const boardCells = document.querySelectorAll(`[data-${cell}]`)
    const boardArray = Array.from(boardCells);
    const clearBoard = () =>{
        boardArray.forEach(cell => {
            cell.textContent = '';
        });
    }
    resetButton.addEventListener('click', clearBoard);
    return {board, boardCells, boardArray, clearBoard};
})();

const player = ()=>{

};

const playGame = ((condition)=>{
    if (condition === true) return;
    const board = gameBoard.board;
    board.addEventListener('click', (e)=>{
        if (e.target.textContent !== '') return (false);
        e.target.textContent = '0';
        console.log('works');
    });    
})();

