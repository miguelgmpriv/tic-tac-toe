const gameBoard = (()=>{
    const board = document.getElementById('game-board');
    const createBoard = () =>{
    for (let i=0; i < 9;i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        newDiv.dataset.cell = i;
        newDiv.textContent = 'X';
        board.appendChild(newDiv);   
    }};
    const clearBoard = () =>{
        document.querySelectorAll('[data-cell]').forEach(cell => {
            cell.textContent = '';
        });
    }
    document.getElementById('game-restart').addEventListener('click', clearBoard);
    return {createBoard, clearBoard};
})();
gameBoard.createBoard();

const playGame = (()=>{
    document.getElementById('game-board').addEventListener('click', (e)=>{
        e.target.textContent = 'O';
    });
    
})();

