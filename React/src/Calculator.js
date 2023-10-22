import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Calculator.css';
import './App.css';


function Calculator() {




  const [playerHand, setPlayerHand] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);

  const handleCardClick = (card, type) => {
    if (type === 'player') {
      // Logic to add card to player's hand
      setPlayerHand(prevHand => [...prevHand, card]);
    } else if (type === 'dealer') {
      // Logic to set dealer's card
      setDealerCard(card);
    }
  };

  return (

<div>
      {/* Navigation for Calculator */}
      <nav className="calculator-nav">
        <ul>
          <li><Link to="/">Back to Home</Link></li>
        </ul>
      </nav>



    <div className="Calculator">
      <header className="Calc-header">
        <h1>Optimal Play Calculator</h1>

        <div className="card-sections">
          <section className="dealer-card-section">
            <h2>Dealer's Card</h2>
            <div className="card-selection">
              {['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].map(card => (
                <button key={card} onClick={() => handleCardClick(card)}>
                  {card}
                </button>
              ))
              }
            </div>
          </section>

          <section className="player-card-section">
            <h2>Player's Cards</h2>
            <div className="card-selection">
              {['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'].map(card => (
                <button key={card} onClick={() => handleCardClick(card)}>
                  {card}
                </button>
              ))
              }
            </div>
          </section>
        </div>



        <div className="middle-display">
          <section>
            <h2>Dealer's Card</h2>
            <div className="dealer-display">
              {/* Display dealer's selected card */}
            </div>
          </section>

          <section>
            <h2>Player's Hand</h2>
            <div className="hand-display">
              {/* Display player's selected cards */}
            </div>
          </section>

          <section>
            <h2>Best Play</h2>
            <div className="best-play">
              {/* Display the best play based on player's hand and dealer's card */}
            </div>
          </section>
        </div>

      </header>
    </div>
    </div>
  );
}

export default Calculator;
