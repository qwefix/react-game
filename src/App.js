import React, { useEffect, useState, useRef } from 'react';
import { useInterval } from './useInterval';
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from './constants';

function App() {
  const [lastDir, setLastDir] = useState([0, 0]);
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);


  function startGame() {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  function endGame() {
    setSpeed(null);
    setGameOver(true);
  };

  function moveSnake(e) {
    console.log(lastDir, DIRECTIONS[e.keyCode])
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      if (!(lastDir[0] == -DIRECTIONS[e.keyCode][0] && lastDir[1] == -DIRECTIONS[e.keyCode][1])) {
        setDir(DIRECTIONS[e.keyCode]);
      }
      e.preventDefault();
    }
  };

  function createApple() {

  };
  function checkHitWalls(piece) {
    return (
      piece[0] >= CANVAS_SIZE || piece[0] < 0 ||
      piece[1] >= CANVAS_SIZE || piece[1] < 0
    )
  }
  function checkHitSnake(piece, snk = snake) {
    return snk.findIndex((s) => s[0] === piece[0] && s[1] === piece[1]) !== -1
  };

  function checkAppleHit(snakeHead) {
    return snakeHead[0] === apple[0] && snakeHead[1] === apple[1]
  }

  function gameLoop() {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const snakeNewHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    if (checkHitWalls(snakeNewHead, snakeCopy)) { endGame(); return };

    if (checkAppleHit(snakeNewHead)) {
      createApple(snakeNewHead, snakeCopy)
    } else {
      snakeCopy.pop();
    };
    if (checkHitSnake(snakeNewHead, snakeCopy)) { endGame(); return };

    snakeCopy.unshift(snakeNewHead);
    setSnake(snakeCopy);
    setLastDir(JSON.parse(JSON.stringify(dir)));

  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    context.fillStyle = 'green';
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = 'red';
    context.fillRect(apple[0], apple[1], 1, 1)
  }, [snake, apple, gameOver]);


  useInterval(gameLoop, speed);

  return (
    <div id='app' onKeyDown={moveSnake}>
      <canvas
        ref={canvasRef}
        width={`${CANVAS_SIZE * SCALE}px`}
        height={`${CANVAS_SIZE * SCALE}px`}
      />
      { gameOver && <div id='gameover'>Game Over</div>}
      <button onClick={startGame}>start</button>
    </div >
  )
}

export default App;
