import GameState from "./GameState";

export function GameOver({ gameState, player1, player2 }) {
  switch (gameState) {
    case GameState.inProgress:
      return <></>;
    case GameState.playerOWins:
      return <div className="game-over">{player2} Wins</div>;
    case GameState.playerXWins:
      return <div className="game-over">{player1} Wins</div>;
    case GameState.draw:
      return <div className="game-over">Empate</div>;
    default:
      return <></>;
  }
}
