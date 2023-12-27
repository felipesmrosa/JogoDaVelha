import GameState from "./GameState";
import { Reset } from "./Reset";

export function GameOver({ gameState, player1, player2, handleReset }) {
  switch (gameState) {
    case GameState.inProgress:
      return <></>;
    case GameState.playerOWins:
      return (
        <div className="game__over">
          <div className="game__over__modal">
            <p>{player2} Wins</p>
            <button onClick={handleReset} className="reset-button">
              Start
            </button>
          </div>
        </div>
      );
    case GameState.playerXWins:
      return (
        <div className="game__over">
          <div className="game__over__modal">
            <p>{player1} Wins</p>
            <button onClick={handleReset} className="reset-button">
              Start
            </button>
          </div>
        </div>
      );
    case GameState.draw:
      return (
        <div className="game__over">
          <div className="game__over__modal">
            <p>Empate</p>
            <button onClick={handleReset} className="reset-button">
              Start
            </button>
          </div>
        </div>
      );
    default:
      return <></>;
  }
}
