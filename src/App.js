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
  const canvasRef = useRef();
  const [snake, useSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  function startGame() {

  };

  function endGame() {

  };

  function moveSnake() {

  };

  function createApple() {

  };

  function checkCollision() {

  };

  function checkAppleHit() {

  }

  function gameLoop() {

  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = 'green';
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = 'red';
    context.fillRect(apple[0], apple[1], 1, 1)
  }, [snake, apple, gameOver]);

  return (
    <div role='button' tabIndex='0' onKeyDown={e => moveSnake(e)}>
      <canvas
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && <div>Game Over</div>}
      <button onClick={startGame}>start</button>
    </div>
  )
}

export default App;
