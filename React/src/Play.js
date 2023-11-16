import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';
import './Play.css';

// TODO:
// Nav bar
// Implement split and (double down, maybe?) functionality
// Real time feedback on plays, can take this from Algorith.js
// Stylization changes
// Port tracking to account database, when me make that.
// Card variations other than clubs
// Hole card differentation
// Surrender functionality

// Need to commment everything all functions at least

const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function Play({timerDuration}) {
  const { isAuthenticated, logout } = useAuth();
  const { userDetails } = useAuth();

  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameStatus] = useState("Deal Cards to Start");
  const [timer, setTimer] = useState(10); // Initial timer value in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    let countdown;

    const handleTimeout = () => {
      setTimer(timerDuration); // Reset the timer
      setIsTimeUp(true);
    };

    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000); // Decrease timer every second
    } else {
      handleTimeout();
    }

    return () => {
      clearTimeout(countdown);
    };
  }, [timer, timerDuration]);

  const calculateHandValue = (hand) => {
    let value = 0;
    let aces = 0;
    for (let card of hand) {
      if (['J', 'Q', 'K'].includes(card)) {
        value += 10;
      } else if (card === 'A') {
        value += 11;
        aces += 1;
      } else {
        value += parseInt(card);
      }
    }

    while (value > 21 && aces) {
      value -= 10;
      aces -= 1;
    }

    return value;
  };

  const dealCards = () => {
    setIsTimeUp(false); // Reset the time-up state
    setTimer(10); // Reset the timer
    const playerCards = [cardValues[Math.floor(Math.random() * 13)], cardValues[Math.floor(Math.random() * 13)]];
    const dealerCards = [cardValues[Math.floor(Math.random() * 13)]];
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameStatus("Player's Turn");
  };

  const playerHit = () => {
    if (!isTimeUp) {
      const newCard = cardValues[Math.floor(Math.random() * 13)];
      const newHand = [...playerHand, newCard];
      setPlayerHand(newHand);

      if (calculateHandValue(newHand) > 21) {
        setGameStatus("Player Busted! Dealer Wins!");
      }
      setTimer(10); // Reset the timer
    }
  };

  const playerStand = () => {
    if (!isTimeUp) {
      setGameStatus("Dealer's Turn");
      dealerTurn();
    }
  };

  const dealerTurn = () => {

    

        // Dont change this, we need to use a push() instead of a spreader function here.
        // For some reason I was getting an infinte loop where the dealer would have to just
        // keep drawing cards if the number of cards exceeded two and it would never stop
        // drawing. 
    let currentDealerHand = [...dealerHand];
    let dealerPoints = calculateHandValue(currentDealerHand);

    while (dealerPoints < 17) {
      const newCard = cardValues[Math.floor(Math.random() * 13)];
      currentDealerHand.push(newCard);
      dealerPoints = calculateHandValue(currentDealerHand);
    }
 // Updates the dealer hand on screen.
    setDealerHand(currentDealerHand);

    if (dealerPoints > 21) {
      setGameStatus("Dealer Busted! Player Wins!");
    } else if (dealerPoints === calculateHandValue(playerHand)) {
      setGameStatus("Push!");
    } else if (dealerPoints >= calculateHandValue(playerHand)) {
      setGameStatus("Dealer Wins!");
    } else {
      setGameStatus("Player Wins!");
    }
  };

  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus("Deal Cards to Start");
    setTimer(10); // Reset the timer
    setIsTimeUp(false); // Reset the time-up state
  };

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/calculator">Play Calculator</Link></li>
          <li><Link to="/play">Simulator</Link></li>
          <li><Link to="/rules">Rules</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/account">Account</Link></li>
              <li onClick={logout}>Logout</li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>

      <div className="Play">
        <h1>Blackjack Simulator</h1>
        <h2>{gameState}</h2>

        <div className="play-card-sections">
          <section className="play-dealer-card-section">
            <h2>Dealer's Hand</h2>
            {dealerHand.map((card, index) => (
              <img src={`/resources/${card}.png`} alt={`${card} card`} className="play-card-image" key={index} />
            ))}
          </section>
          <center>Hand Value: {calculateHandValue(dealerHand)}</center>
          <div className="play-middle-display">
            {gameState === "Deal Cards to Start" ? (
              <button className="play-button" onClick={dealCards}>
                Deal Cards
              </button>
            ) : gameState === "Player's Turn" ? (
              <>
                <button className="play-button" onClick={playerHit} disabled={isTimeUp}>
                  Hit
                </button>
                <button className="play-button" onClick={playerStand} disabled={isTimeUp}>
                  Stand
                </button>
                {!isTimeUp && (
                  <div>
                    Timer: {timer} seconds remaining
                  </div>
                )}
                {isTimeUp && (
                  <div className="time-up-message">
                    TIME'S UP!
                    <button className="play-reset-button" onClick={resetGame}>
                      Redeal
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button className="play-reset-button" onClick={resetGame}>
                Reset Game
              </button>
            )}
          </div>

          <section className="play-player-card-section">
            <h2>Player Hand</h2>
            {playerHand.map((card, index) => (
              <img src={`/resources/${card}.png`} className="play-card-image" key={index} />
            ))}
          </section>
          <center>Hand Value: {calculateHandValue(playerHand)}</center>
        </div>
      </div>
    </div>
  );
}

export default Play;