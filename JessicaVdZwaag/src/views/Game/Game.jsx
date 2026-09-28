import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Game() {

    return (
        <section>
            <aside>
                <Link to="/">
                <button>Back</button>
                </Link>
            </aside>
            <DinoGame />
        </section>
    )
}

function DinoGame() {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let gameScore = 0;
        let isJumping = false;
        let jumpVelocity = 0;
        const gravity = 0.6;
        const dino = { x: 50, y: 130, width: 20, height: 30, vy: 0 };
        const obstacle = { x: 600, y: 130, width: 15, height: 30, speed: 5 };

        const handleKeyDown = (e) => {
            if ((e.code === 'Space' || e.code === 'ArrowUp') && !isJumping && dino.y === 130) {
                isJumping = true;
                dino.vy = -10;
            }
            if (e.code === 'KeyR' && gameOver) {
                setGameOver(false);
                gameScore = 0;
                obstacle.x = 600;
                setScore(0);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        const update = () => {

            dino.vy += gravity;
            dino.y += dino.vy;
            if (dino.y > 130) {
                dino.y = 130;
                isJumping = false;
                dino.vy = 0;
            }

            obstacle.x -= obstacle.speed;
            if (obstacle.x < -obstacle.width) {
                obstacle.x = 600;
                gameScore += 10;
                setScore(gameScore);
            }

            if (
                dino.x < obstacle.x + obstacle.width &&
                dino.x + dino.width > obstacle.x &&
                dino.y < obstacle.y + obstacle.height &&
                dino.y + dino.height > obstacle.y
            ) {
                setGameOver(true);
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#555';
            ctx.fillRect(0, 160, canvas.width, 2);

            ctx.fillStyle = '#333';
            ctx.fillRect(dino.x, dino.y, dino.width, dino.height);

            ctx.fillStyle = '#d9534f';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        };

        const loop = () => {
            if (!gameOver) {
                update();
                draw();
                animationFrameId = requestAnimationFrame(loop);
            }
        };

        animationFrameId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            cancelAnimationFrame(animationFrameId);
        };
    }, [gameOver]);

    return (
        <div style={{ textAlign: 'center', fontFamily: 'sans-serif' }}>
            <h2>React Dino Game</h2>
            <p>Press <strong>Spacebar</strong> or <strong>Up Arrow</strong> to jump.</p>
            <h3>Score: {score}</h3>
            <canvas
                ref={canvasRef}
                width={600}
                height={200}
                style={{ border: '2px solid #333', background: '#f7f7f7' }}
            />
            {gameOver && <p style={{ color: 'red', fontWeight: 'bold' }}>Game Over! Press 'R' to restart.</p>}
        </div>
    );
}