document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameEnded = false;
  
    // Add event listener to each cell
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });
  
    function handleCellClick() {
      if (gameEnded || this.textContent !== '') return;
  
      this.textContent = currentPlayer;
      if (checkWinner()) {
        alert(`${currentPlayer} wins!`);
        gameEnded = true;
        return;
      }
      if (checkDraw()) {
        alert("It's a draw!");
        gameEnded = true;
        return;
      }
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6] // Diagonal
      ];
  
      return winningCombos.some(combo => {
        const [a, b, c] = combo;
        return cells[a].textContent &&
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent;
      });
    }
  
    function checkDraw() {
      return [...cells].every(cell => cell.textContent !== '');
    }
  
    // Reset the game
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetGame);
    document.body.appendChild(resetButton);
  
    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = '';
      });
      currentPlayer = 'X';
      gameEnded = false;
    }
  });
  