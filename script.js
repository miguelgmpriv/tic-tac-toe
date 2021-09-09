const gameBoard = (()=>{
    const createBoard = () =>{
    let board = document.getElementById('game-board');
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
    return {createBoard, clearBoard};
})();

gameBoard.createBoard();
gameBoard.clearBoard();