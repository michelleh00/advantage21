import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth";
import "./Rules.css"

function Rules() {
    const { isAuthenticated, logout } = useAuth();
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/calculator">Play Calculator</Link>
                    </li>
                    <li>
                        <Link to="/play">Simulator</Link>
                    </li>
                    <li>
                        <Link to="/rules">Rules</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/account">Account</Link>
                            </li>
                            <li onClick={logout}>Logout</li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            <div style={{ textAlign: 'center' }}>
                <h1>BlackJack Rules</h1>
                <p>
                    Objective: To have a hand value closer to 21 than the dealer without exceeding 21.
                </p>
                <p className="card-values">
                    Card Values:
                    <br />
                    - Number cards (2-10) are worth their face value.
                    <br />
                    - Face cards (Jack, Queen, King) are each worth 10 points.
                    <br />
                    - Aces can be worth 1 or 11 points, depending on which value benefits your hand more.
                </p>
                <p className="game-play">
                    Game Play:
                    <br />
                    - Initial Deal: Players and the dealer each get two cards. One of the dealer's cards is face-up (the "up card"), and one is face-down (the "hole card").
                    <br />
                    - Player's Turn: Players decide whether to Hit, Stand, Double Down (optional), or Split (if applicable).
                    <br />
                    - Dealer's Turn: The dealer reveals their hole card and must hit until they reach 17 or higher. Some variations require hitting on a "soft 17."
                </p>
                <p className="winning-payouts">
                    Winning and Payouts:
                    <br />
                    - If a player's hand exceeds 21, they lose.
                    <br />
                    - If a player's hand is closer to 21 than the dealer's without exceeding 21, they win (usually paid 1:1).
                    <br />
                    - A "blackjack" (Ace and 10-value card) wins at 3:2 odds.
                </p>
            </div>

        </div>

    );
}

export default Rules;
