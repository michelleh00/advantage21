import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Calculator.css';
import './App.css';

function Calculator() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);

  const handleCardClick = (card, type) => {
    if (type === 'player') {
      setPlayerHand(prevHand => [...prevHand, card]);
    } else if (type === 'dealer') {
      console.log("Setting dealer card to:", card); // Add this
      setDealerCard(card);
    }
  };


  return (
    <div>
      {/* Navbar */}
      <nav className="calculator-nav">
        <ul>
          <li><Link to="/">Back to Home</Link></li>
        </ul>
      </nav>

      <div className="Calculator">
        <h1>Optimal Play Calculator</h1>

        {/* Card Selection */}
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
                <button key={card} onClick={() => handleCardClick(card)}>
                  {card}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Middle Display Section */}
        <div className="middle-display">
          <section>
            <div className="dealer-display">
              {dealerCard && <img src={`/resources/${dealerCard}.png`} alt={`${dealerCard} card`} className="card-image" />}
              <div className="dealer-text">Dealer</div>
            </div>
          </section>




          <section>
            <h2>Best Play</h2>
            <div className="best-play"></div>
          </section>

          <section>
            <h2>Player's Hand</h2>
            <div className="hand-display"></div>
          </section>


        </div>
      </div>
    </div>
  );
}

export default Calculator;
