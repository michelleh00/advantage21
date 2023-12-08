import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';
import { useSettings } from './Settings';
import './Play.css';
import { get_best_action } from './Algorithm';


// TODO:
// Nav bar
// Implement split and (double down, maybe?) functionality
// Real-time feedback on plays, can take this from Algorith.js
// Stylization changes
// Port tracking to account database, when we make that.
// Card variations other than clubs
// Hole card differentiation
// Surrender functionality


// Need to comment everything all functions at least


const suits = ['H', 'D', 'C', 'S'];
const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Function to deal a single card
const dealCard = () => {
  const cardValue = cardValues[Math.floor(Math.random() * cardValues.length)];
  const suit = suits[Math.floor(Math.random() * suits.length)];
  return `${cardValue}-${suit}`;
};


function Play() {
  const { settings, setSettings } = useSettings();
  const timerDuration = settings.timerDuration;
  const { isAuthenticated, logout } = useAuth();
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameStatus] = useState("Deal Cards to Start");
  const [timer, setTimer] = useState(timerDuration);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [correctMoves, setCorrectMoves] = useState(0);
  let deckNum = settings.numDecks;
  let surrender = settings.surrender;
  let soft17 = settings.soft17;
  let handTimer = settings.handTimer;


  useEffect(() => {
    let countdown;

    const handleTimeout = () => {
      setTimer(timerDuration);
      setIsTimeUp(true);
    };

    if (handTimer && timer > 0 && timerEnabled) {
      countdown = setTimeout(() => setTimer((prevTimer) => prevTimer - 1), 1000);
    } else if (handTimer && timer === 0) {
      handleTimeout();
    }

    return () => {
      clearTimeout(countdown);
    };
  }, [timer, timerDuration, timerEnabled, handTimer]);


  //load correctMoves count for streak counter
  useEffect(() => {
    const savedCorrectMoves = localStorage.getItem('correctMoves');
    if (savedCorrectMoves) {
      setCorrectMoves(parseInt(savedCorrectMoves, 10));
    }
  }, []);

  //update correctMoves count for streak counter
  useEffect(() => {
    localStorage.setItem('correctMoves', correctMoves);
  }, [correctMoves]);


  const calculateHandValue = (hand) => {
    let value = 0;
    let aces = 0;

    for (let card of hand) {
      const cardValue = card.split('-')[0];

      if (['J', 'Q', 'K'].includes(cardValue)) {
        value += 10;
      } else if (cardValue === 'A') {
        value += 11;
        aces += 1;
      } else {
        value += parseInt(cardValue);
      }
    }

    // Adjust for Aces
    while (value > 21 && aces) {
      value -= 10;
      aces -= 1;
    }

    return value;
  };


  const canSplit = (hand) => {
    if (hand.length === 2) {
      const firstCardValue = hand[0].split('-')[0];
      const secondCardValue = hand[1].split('-')[0];
      return firstCardValue === secondCardValue;
    }
    return false;
  };


  const dealCards = () => {
    setIsTimeUp(false);
    if (handTimer) {
      setTimer(timerDuration);
    }
    const playerCards = [dealCard(), dealCard()];
    const dealerCards = [dealCard()];
    setPlayerHand(playerCards);
    setDealerHand(dealerCards);
    setGameStatus("Player's Turn");
  };

  const updateStreakCounter = (isCorrectMove) => {
    if (isCorrectMove) {
      setCorrectMoves((prevMoves) => {
        const updatedMoves = prevMoves + 1;
        const highestMoves = Math.max(updatedMoves, parseInt(localStorage.getItem('highestMoves'), 10) || 0);
        localStorage.setItem('highestMoves', highestMoves);
        return updatedMoves;
      });
    } else {
      setCorrectMoves(0);
    }
  };

  const playerHit = () => {
    if (!isTimeUp) {
      const bestMove = get_best_action(playerHand, dealerHand[0], deckNum, surrender, soft17);
      console.log(`Best move before hitting: ${bestMove}`);

      const isCorrectMove = bestMove === 'Hit' || bestMove === 'Double Down / Hit';
      if (isCorrectMove) {
        console.log("Correct move: Hit");
        updateStreakCounter(true);
      } else {
        console.log(`Incorrect move. Best move was: ${bestMove}`);
        updateStreakCounter(false);
      }

      const newCard = dealCard();
      const newHand = [...playerHand, newCard];
      setPlayerHand(newHand);

      if (calculateHandValue(newHand) > 21) {
        setGameStatus("Player Busted! Dealer Wins!");
      } else if (handTimer) {
        setTimer(timerDuration);
      }
    }
  };


  const playerSplit = () => {
    if (!isTimeUp && playerHand.length === 2 && canSplit(playerHand)) {
      const bestMove = get_best_action(playerHand, dealerHand[0], deckNum, surrender, soft17);
      console.log(`Best move before split: ${bestMove}`);

      if (bestMove === 'Split') {
        console.log("Correct move: Split");
        setGameStatus("Split, Correct Move!!!");
        updateStreakCounter(true);
      } else {
        console.log(`Incorrect move. Best move was: ${bestMove}`);
        setGameStatus(`Incorrect - Should have: ${bestMove} instead of Split`);
        updateStreakCounter(false);
      }

    }
  };


  const playerStand = () => {
    if (!isTimeUp) {

      const bestMove = get_best_action(playerHand, dealerHand[0], deckNum, surrender, soft17);
      console.log(`Best move before standing: ${bestMove}`);


      if (bestMove === 'Stand') {
        console.log("Correct move: Stand");
        updateStreakCounter(true);
      } else {
        console.log(`Incorrect move. Best move was: ${bestMove}`);
        updateStreakCounter(false);
      }
    }

    setGameStatus("Dealer's Turn");
    dealerTurn();
  };


  const dealerTurn = () => {
    let currentDealerHand = [...dealerHand];
    let dealerPoints = calculateHandValue(currentDealerHand);

    while (dealerPoints < 17) {
      const newCard = dealCard();
      currentDealerHand.push(newCard);
      dealerPoints = calculateHandValue(currentDealerHand);
    }

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

  const handleSurrender = () => {
    if (!isTimeUp) {
      const bestMove = get_best_action(playerHand, dealerHand[0], deckNum, surrender, soft17);
      console.log(`Best move before surrendering: ${bestMove}`);

      if (bestMove === 'Surrender') {
        console.log("Correct move: Surrender");
        setGameStatus("Player Chose to Surrender - Correct Move!");
        updateStreakCounter(true);
      } else {
        console.log(`Incorrect move. Best move was: ${bestMove}`);
        setGameStatus(`Incorrect Move - Should Have ${bestMove}`);
        updateStreakCounter(false);
      }

    }
  };


  const resetGame = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus("Deal Cards to Start");
    if (handTimer) {
      setTimer(timerDuration);
    }
    setIsTimeUp(false); 
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

        <div className="streak-counter">
          <h3>Current Streak:</h3>
          <h3>{correctMoves}</h3>
        </div>


        <div className="play-card-sections">
          <section className="play-dealer-card-section">
            <h2>Dealer's Hand</h2>
            {dealerHand.map((card, index) => (
              <img src={`/resources/cards/${card}.png`} alt={`${card} card`} className="play-card-image" key={index} />
            ))}
          </section>
          <center>Hand Value: {calculateHandValue(dealerHand)}</center>
          <div className="play-middle-display">
            {gameState === "Deal Cards to Start" ? (
              <>
                <button className="play-button" onClick={dealCards}>
                  Deal Cards
                </button>
                <label>
                  Timer:
                  <select
                    value={handTimer ? timerDuration.toString() : 'off'}
                    onChange={(e) => {
                      const newTimerDuration = e.target.value;
                      if (newTimerDuration === 'off') {
                        setTimerEnabled(false);
                        setSettings(prevSettings => ({ ...prevSettings, handTimer: false }));
                      } else {
                        setTimerEnabled(true);
                        setTimer(parseInt(newTimerDuration, 10));
                        setSettings(prevSettings => ({
                          ...prevSettings,
                          handTimer: true,
                          timerDuration: parseInt(newTimerDuration, 10)
                        }));
                      }
                    }}
                  >
                    <option value="off">Off</option>
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                    <option value="30">30 seconds</option>
                  </select>
                </label>
              </>
            ) : gameState === "Player's Turn" ? (
              <>

                <div className="play-action-buttons">
                  <button className="play-button" onClick={playerHit} disabled={isTimeUp}>
                    Hit
                  </button>
                  <button className="play-button" onClick={playerStand} disabled={isTimeUp}>
                    Stand
                  </button>
                  {canSplit(playerHand) && (
                    <button className="play-button" onClick={playerSplit}>
                      Split
                    </button>
                    )}
                    {surrender && (
                      <button className="play-button" onClick={handleSurrender}>
                        Surrender
                      </button>
                    )}
                  
                </div>
                {!isTimeUp && timerEnabled && handTimer && (
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
              <button className="play-reset-button" onClick={dealCards}>
                Redeal
              </button>
            )}
          </div>


          <section className="play-player-card-section">
            <h2>Player Hand</h2>
            {playerHand.map((card, index) => (
              <img src={`/resources/cards/${card}.png`} alt={`${card} card`} className="play-card-image" key={index} />
            ))}
          </section>
          <center>Hand Value: {calculateHandValue(playerHand)}</center>
        </div>
      </div>
    </div>
  );
}


export default Play;

