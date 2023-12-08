import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth";
import "./Rules.css";

function Rules() {
  const { isAuthenticated, logout } = useAuth();
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
      <div className="rules-content">
        <h1>BlackJack Rules</h1>
        Objective: To have a hand value closer to 21 than the dealer without exceeding 21.

        <p className="rules">        
          <h2>Card Values:</h2>
          &#9642; Number cards (2-10) are worth their face value.
          <br />
          &#9642; Face cards (Jack, Queen, King) are each worth 10 points.
          <br />
          &#9642; Aces can be worth 1 or 11 points, depending on which value benefits your hand more.
        </p>
        <p className="rules">
          <h2>Game Play:</h2>
          &#9642; <strong>Initial Deal:</strong> Players and the dealer each get two cards. One of the dealer's cards is face-up (the "up card"), and one is face-down (the "hole card").
          <br />
          &#9642; <strong>Player's Turn:</strong> Players decide whether to Hit, Stand, Double Down (optional), or Split (if applicable).
          <br />
          &#9642; <strong>Dealer's Turn:</strong> The dealer reveals their hole card and must hit until they reach 17 or higher. Some variations require hitting on a "soft 17."
        </p>
        <p className="rules">
          <h2>Winning and Payouts:</h2>
          &#9642; If a player's hand exceeds 21, they lose.
          <br />
          &#9642; If a player's hand is closer to 21 than the dealer's without exceeding 21, they win (usually paid 1:1).
          <br />
          &#9642; A "blackjack" (Ace and 10-value card) wins at 3:2 odds.
        </p>
        <p className="rules terms">
          <h2>Terminology:</h2>
          &#9642; <strong>Blackjack:</strong> An Ace and any 10-value card.
          <br />
          &#9642; <strong>Bust:</strong> When a player's or dealer's hand exceeds 21.
          <br />
          &#9642; <strong>Double:</strong> This playing decision will require the player to increase their bet on the hand to double its original value. It then requires the dealer to deal only one more card to the player's Blackjack hand.
          <br />
          &#9642; <strong>Hit:</strong> This playing decision will require the dealer to deal another card onto the player's Blackjack hand.
          <br />
          &#9642; <strong>Soft 17:</strong> A soft hand is any hand that contains an ace that is counted as 11. Soft 17 would be an Ace and a 6.
          <br />
          &#9642; <strong>Split:</strong> This playing decision is available to the player only when the first two cards dealt to any hand are of equal value. Ex. 8,8, A,A, K,10. The player can split the cards into two separate hands, then receiving an additional card for each hand from the dealer. Play then proceeds as normal.
          <br />
          &#9642; <strong>Stand:</strong> This playing decision will refuse the dealer from dealing another card onto the player's Blackjack hand.
          <br />
          &#9642; <strong>Surrender:</strong> This playing decision, when available, allows the player to give up half of the bet, in order to not be required to continue playing the hand, potentially losing the entire original bet.
          <br />
        </p>
      </div>
    </div>
  );
}

export default Rules;