import './App.css';
import { useState } from 'react';

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [playerName, setPlayerName] = useState("");

  const [score, setScore] = useState({ player: 0, computer: 0, draw: 0 });
  
  const [gameLog, setGameLog] = useState([]);
  const choices = ["Rock", "Paper", "Scissors"];

  const determineWinner = (player, computer) => {
    if (player === computer) return 'Draw';
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) return 'Win';
    return 'Lose';
  };

  const handlePlayerChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    const result = determineWinner(choice, computerChoice);

    setScore(prevScore => ({
      player: result === 'Win' ? prevScore.player + 1 : prevScore.player,
      computer: result === 'Lose' ? prevScore.computer + 1 : prevScore.computer,
      draw: result === 'Draw' ? prevScore.draw + 1 : prevScore.draw
    }));

    setGameLog(prevScore => [...prevScore, 
      `${playerName}: ${choice} vs Computer: ${computerChoice} → ${result}`
    ]);
  };

  if (!gameStart) {
    return (
      <div className="setup-screen">
        <h1>Rock Paper Scissors</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          required
        />
        <button 
          onClick={() => setGameStart(true)} 
          disabled={!playerName.trim()}
        >
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <h1>{playerName} vs Computer</h1>
      
      <div className="buttons">
        {choices.map(choice => (
          <button key={choice} onClick={() => handlePlayerChoice(choice)}>
            {choice}
          </button>
        ))}
      </div>

      <div className="scoreboard">
        <h2>Score</h2>
        <p>{playerName}: {score.player}</p>
        <p>Computer: {score.computer}</p>
        <p>Draws: {score.draw}</p>
      </div>

      <div className="game-log">
        <h2>History</h2>
        <ul>
          {gameLog.map((log, index) => (
            <li key={index}>{log}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;