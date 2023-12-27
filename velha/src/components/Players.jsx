import { Reset } from "./Reset";

export function Players({
  namedPlayer1,
  namedPlayer2,
  openModal,
  showModal,
  closeModal,
  namesComplete,
  gameState,
  handleReset,
}) {
  return (
    <div className="players">
      <button className="resetName" onClick={openModal}>
        Trocar Nomes
      </button>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Set Player Names</h2>
            <input
              type="text"
              placeholder="Player 1 (X)"
              onChange={namedPlayer1}
            />
            <input
              type="text"
              placeholder="Player 2 (O)"
              onChange={namedPlayer2}
            />
            <Reset
              namesComplete={namesComplete}
              gameState={gameState}
              handleReset={handleReset}
            />
          </div>
        </div>
      )}
    </div>
  );
}
