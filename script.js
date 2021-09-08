const gameBoard = (()=>{
    const board = document.getElementById('game-board');
    for (let i=0; i < 9;i++){
        let newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        board.appendChild(newDiv);   
    }
})();