const gameBoard = (()=>{
    const board = document.getElementById('game-board');
    const cell = 'cell';
    for (let i=0; i < 9;i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add(cell);
        newDiv.dataset[cell] = i;
        board.appendChild(newDiv);   
    };
    const boardCells = document.querySelectorAll(`[data-${cell}]`)
    const boardArray = Array.from(boardCells);
    console.log(boardArray);
    const clearBoard = () =>{
        boardArray.forEach(cell => {
            cell.textContent = '';
        });
    }
    document.getElementById('game-restart').addEventListener('click', clearBoard);
    return {boardCells, boardArray, clearBoard};
})();

const playGame = ((condition)=>{

    if (condition === true) return;
    const board = document.getElementById('game-board');
    board.addEventListener('click', (e)=>{
        if (e.target.textContent !== '') return (false);
        e.target.textContent = '0';
        console.log('works');
    });    
})();

