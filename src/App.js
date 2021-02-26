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

import gameoverSound from './sounds/gameover.wav';
import newAppleSound from './sounds/newApple.wav';
import music from './sounds/music.mp3';


const audioGameOver = new Audio(gameoverSound);
const audioNewApple = new Audio(newAppleSound);
const audioMusic = new Audio(music);


function App() {
  const [lastDir, setLastDir] = useState([0, 0]);
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);


  function startGame() {
    audioMusic.currentTime = 0;
    audioMusic.play()
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  function endGame() {
    audioGameOver.currentTime = 0;
    audioGameOver.play();
    audioMusic.pause();
    setSpeed(null);
    setGameOver(true);
  };

  function moveSnake(e) {
    if (e.keyCode >= 37 && e.keyCode <= 40) {
      if (!(lastDir[0] == -DIRECTIONS[e.keyCode][0] && lastDir[1] == -DIRECTIONS[e.keyCode][1])) {
        setDir(DIRECTIONS[e.keyCode]);
      }
      e.preventDefault();
    }
  };
  function random(n) {
    return Math.floor(Math.random() * n)
  }

  function createApple(head, snake) {
    let fullsnake = snake.slice();
    fullsnake.push(head);
    let res = [random(CANVAS_SIZE), random(CANVAS_SIZE)];
    while (fullsnake.findIndex(([x, y]) => x == res[0] && y == res[1]) >= 0) {
      res = [random(CANVAS_SIZE), random(CANVAS_SIZE)];
    };
    return (res)
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
      audioNewApple.currentTime = 0;
      audioNewApple.play()
      setApple(createApple(snakeNewHead, snakeCopy));
      setSpeed(Math.ceil(speed * 0.98));
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
    context.fillRect(apple[0], apple[1], 1, 1);
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
      <button onClick={startGame} className='start-btn'>START<br />(R)</button>

    </div >

  )
}

export default App;
