import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { get_best_action, useDeckNum } from './Algorithm';
import { useSettings } from './Settings';
import { useAuth } from './Auth';
import './Calculator.css';
import './App.css';



function Calculator() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);
  const [bestPlay, setBestPlay] = useState("");
  const { isAuthenticated, logout } = useAuth();
  const { settings } = useSettings();
  let deckNum = settings.numDecks;
  let surrender = settings.surrender;
  let soft17 = settings.soft17;
  // Button logic here. Just swaps between if the tag is from
  // the player or dealer section of the buttons.
  // React uses a 'useState' function, it takes two elements, the value and the
  // function to be applied to update the value. Here we are using a spread operator
  // [...prevHand, card] that bascially copies the previous array (prevHand) and then
  // appends 'card' to the new array.

  const handleCardClick = (cardValue, type) => {
    const suits = ['C', 'H', 'D', 'S'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const card = `${cardValue}-${randomSuit}`;

    if (type === 'player') {
      setPlayerHand(prevHand => {
        const newHand = [...prevHand, card];
        if (newHand.length >= 2 && dealerCard) {
          setBestPlay(get_best_action(newHand, dealerCard, deckNum, surrender, soft17));
        }
        return newHand;
      });
    } else if (type === 'dealer') {
      setDealerCard(card);
      if (playerHand.length >= 2) {
        setBestPlay(get_best_action(playerHand, card, deckNum, surrender, soft17));
      }
    }
  };


  // Clears the cards from both dealer and player containers.
  const resetHands = () => {
    setPlayerHand([]);
    setDealerCard(null);
    setBestPlay("");
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

      <div className="Calculator">

        <h1>Optimal Play Calculator</h1>
        <div>
          Surrender: {settings.surrender ? 'True' : 'False'}
        </div>
        <div>
          Soft17: {settings.soft17 ? 'True' : 'False'}
        </div>
        <div>
          Decks: {settings.numDecks}
        </div>

        <div className="card-sections">
          <section className="dealer-card-section">
            <h2>Dealer's Card</h2>
            <div className="card-selection">
              {['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].map(card => (
                <button key={card} onClick={() => handleCardClick(card, 'dealer')}>
                  {card}
                </button>
              ))}
            </div>
          </section>

          <section className="player-card-section">
            <h2>Player's Cards</h2>
            <div className="card-selection">
              {['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].map(card => (
                <button key={card} onClick={() => handleCardClick(card, 'player')}>
                  {card}
                </button>
              ))}
            </div>
            <button className="reset-button" onClick={resetHands}>Redeal</button>
          </section>

        </div>

        <div className="middle-display">

          <section>
            <div className="dealer-display">
              {dealerCard && <img src={`/resources/cards/${dealerCard}.png`} alt={`${dealerCard} card`} className="card-image" />}
              <div className="dealer-text">Dealer</div>
            </div>
          </section>

          <section>
            <div className="best-play-display">
              Best Play: <span className="best-play-action">{bestPlay}</span>
            </div>
          </section>


          <section className="player-hand-section">
            <div className="player-hand-container">
              {playerHand.map((card, index) => {
                const totalCards = playerHand.length;
                const middleIndex = (totalCards - 1) / 2;
                const offset = index - middleIndex;
                const rotationDegree = offset * 10;

                return (
                  <img
                    src={`/resources/cards/${card}.png`}
                    alt={`${card} card`}
                    className="card-in-hand"
                    key={index}
                    style={{
                      transform: `translateX(${index * 30 - (totalCards * 15)}px) rotate(${rotationDegree}deg)`
                    }}
                  />
                );
              })}
            </div>
            <div className="hand-area-text">Player Area</div>
          </section>
        </div>
      </div>
    </div>
  );
}


// When adding cards you the player area, we keep track of the middle of the hand,
// we then move the card slightly left and then rotate 10 degrees for each card added
// so it creates a 'splay effect' with the cards.
// TODO? Maybe limit the hand to a theoretical max of 11 cards.
export default Calculator;





