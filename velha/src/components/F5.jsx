import GameState from "./GameState";

export function F5({ gameState, handleReset, namesComplete }) {
  if (gameState === GameState.inProgress) {
    return;
  }
  return (
    <button onClick={handleReset} className="reset-button">
      Start
    </button>
  );
}
