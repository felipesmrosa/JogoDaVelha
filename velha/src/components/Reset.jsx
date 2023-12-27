import GameState from "./GameState";

export function Reset({ gameState, handleReset, namesComplete }) {
  // if (gameState === GameState.inProgress) {
  //   return null;
  // }
  return (
    <button
      disabled={!namesComplete}
      onClick={handleReset}
      className={`reset-button ${!namesComplete ? "disabled" : ""}`}
    >
      Start
    </button>
  );
}
