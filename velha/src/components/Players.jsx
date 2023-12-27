export function Players({
  player1,
  player2,
  namedPlayer1,
  namedPlayer2,
  resetNames,
}) {
  return (
    <div className="players">
      <label htmlFor="">Player 01</label>
      <input
        type="text"
        placeholder="Nome do Player 01"
        value={player1}
        onChange={namedPlayer1}
        autoComplete="off"
      />
      <label htmlFor="">Player 02</label>
      <input
        type="text"
        placeholder="Nome do Player 02"
        value={player2}
        onChange={namedPlayer2}
        autoComplete="off"
      />
      <button className="resetName" onClick={resetNames}>Trocar Nomes</button>
    </div>
  );
}
