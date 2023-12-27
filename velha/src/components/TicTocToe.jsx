import { useState, useEffect } from "react";
import { Board } from "./Board";
import { GameOver } from "./GameOver";
import GameState from "./GameState";
import { Reset } from "./Reset";
import gameOverSoundAsset from "../sounds/gameOver.wav";
import clickSoundAsset from "../sounds/click.wav";
import { Players } from "./Players";

const PLAYER_X = "X";
const PLAYER_O = "O";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.2;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 0.5;

const winningCombinations = [
  //Rows
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },

  //Columns
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-3" },

  //Diagonal
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tileValue1 = tiles[combo[0]];
    const tileValue2 = tiles[combo[1]];
    const tileValue3 = tiles[combo[2]];

    if (
      (tileValue1 !== null) & (tileValue1 === tileValue2) &&
      tileValue1 === tileValue3
    ) {
      setStrikeClass(strikeClass);
      if (tileValue1 === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }

  const areAllTileSfilledIn = tiles.every((tile) => tile !== null);
  if (areAllTileSfilledIn) {
    setGameState(GameState.draw);
  }
}

export function TicTacToe() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState("");
  const [gameState, setGameState] = useState(GameState.chooseName);
  const [namesComplete, setNamesComplete] = useState(false);

  const [showModal, setShowModal] = useState(true);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  function namedPlayer1(e) {
    setPlayer1(e.target.value);
    setNamesComplete(!!e.target.value && !!player2);
  }

  function namedPlayer2(e) {
    setPlayer2(e.target.value);
    setNamesComplete(!!e.target.value && !!player1);
  }

  function resetNames() {
    setPlayer1("");
    setPlayer2("");
    setNamesComplete(false);
    setGameState(GameState.chooseName); // Define o estado do jogo para escolher o nome
  }

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress || tiles[index] !== null) {
      return;
    }

    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X);
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
    closeModal();
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);
  return (
    <div className="containerTotal">
      <h1>Jogo da Velha</h1>
      <Players
        resetNames={resetNames}
        player1={player1}
        player2={player2}
        namedPlayer1={namedPlayer1}
        namedPlayer2={namedPlayer2}
        openModal={openModal}
        showModal={showModal}
        closeModal={closeModal}
        namesComplete={namesComplete}
        gameState={gameState}
        handleReset={handleReset}
      />
      <Board
        strikeClass={strikeClass}
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
      />
      <GameOver
        handleReset={handleReset}
        player1={player1}
        player2={player2}
        gameState={gameState}
      />
    </div>
  );
}
