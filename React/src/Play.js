import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Auth';
import { useSettings } from './Settings';
import './Play.css';
import { get_best_action} from './Algorithm';


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


const cardValues = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


function Play({ timerDuration }) {
  const { isAuthenticated, logout } = useAuth();
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [gameState, setGameStatus] = useState("Deal Cards to Start");
  const [timer, setTimer] = useState(timerDuration); // Initial timer value in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(true); // Initial state for the timer toggle
  const [correctMoves,  setCorrectMoves] = useState(0);
  let [bestMove, setBestMove] = useState("");
  const { settings } = useSettings();
  let deckNum = settings.numDecks;
  let surrender = settings.surrender;
  let soft17 = settings.soft17;


  useEffect(() => {
    let countdown;
 
    const handleTimeout = () => {
      setTimer(timerDuration);
      setIsTimeUp(true);
    };
 
    if (timer > 0 && timerEnabled) {
      countdown = setTimeout(() => setTimer((prevTimer) => prevTimer - 1), 1000);
    } else if (timer === 0) {
      handleTimeout();
    }
 
    return () => {
      clearTimeout(countdown);
    };
  }, [timer, timerDuration, timerEnabled]);


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

      bestMove = get_best_action(newHand, dealerHand[0], deckNum, surrender, soft17);
      setBestMove(bestMove);

      console.log('Best Move:', bestMove);
     
      if (calculateHandValue(newHand) > 21) {
        setGameStatus("Player Busted! Dealer Wins!");
      }


      // determine optimal move from alrogithm



      if (bestMove == 'Hit') {
        console.log("player made correct hit");
        setCorrectMoves(correctMoves + 1); // increment streak counter (correctMoves)
      } else { //this may be the culprit
        console.log("player made incorrect hit");
        setCorrectMoves(0); // reset streak counter (correctMoves) to 0
      }


      setTimer(10); // Reset the timer
    }
  };


  const playerStand = () => {
    if (!isTimeUp) {
      setGameStatus("Dealer's Turn");
      dealerTurn();
    }
   
   
    if (bestMove == 'Stand') {
      console.log("player made correct stand");
      setCorrectMoves(correctMoves + 1); // increment streak counter (correctMoves)
    } else {
        console.log("player made incorrect stand");
        setCorrectMoves(0); // reset streak counter (correctMoves) to 0
      }
  };


  const dealerTurn = () => {
    let currentDealerHand = [...dealerHand];
    let dealerPoints = calculateHandValue(currentDealerHand);


    while (dealerPoints < 17) {
      const newCard = cardValues[Math.floor(Math.random() * 13)];
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
       
        <div className="streak-counter">
        <h3>Current Streak:</h3>
         <h3>{correctMoves}</h3>
        </div>


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
              <>
                <button className="play-button" onClick={dealCards}>
                  Deal Cards
                </button>
                <label>
  Timer:
  <select
    value={timerDuration}
    onChange={(e) => {
      const newTimerDuration = e.target.value;
      setTimerEnabled(newTimerDuration !== 'off');
      setTimer(newTimerDuration !== 'off' ? parseInt(newTimerDuration, 10) : 0);
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
                <button className="play-button" onClick={playerHit} disabled={isTimeUp}>
                  Hit
                </button>
                <button className="play-button" onClick={playerStand} disabled={isTimeUp}>
                  Stand
                </button>
                {!isTimeUp && timerEnabled && (
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

