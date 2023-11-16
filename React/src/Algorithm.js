




export function get_best_action(playerHand, dealerCard, deckCount) {

    console.log(deckCount);

    const extractCardValue = card => card.split('-')[0];
    const containsAce = playerHand.some(card => extractCardValue(card) === 'A');
    const cardTotal = card => {
        let value = extractCardValue(card); // Extract card value
        if (['J', 'Q', 'K'].includes(value)) return 10;
        if (value === 'A') return 11; 
        return parseInt(value);
    };

    // This just checks the initial cards dealt and checks to see if they are the same.
    // If they are the same they will have different logic applied since you are able to split.
    let is_pair = playerHand.length === 2 && extractCardValue(playerHand[0]) === extractCardValue(playerHand[1]);
    let is_pair_of_aces = is_pair && containsAce;
    // This is very messy but is working for now.
    // So this counts all the Aces in the hand, if our hand total is over 21
    // we subtract 10 points until we are below 21. This should keep our total for instance
    // if we have 3 Aces as 13, 11 for one ace, and 2 points for the combined other two.   
    const check_aces = (hand) => {
        let total = hand.reduce((sum, card) => sum + cardTotal(card), 0);
        let num_aces = hand.filter(card => extractCardValue(card) === 'A').length;
        
        while (total > 21 && num_aces) {
            total -= 10;
            num_aces -= 1;
        }
        return total;
    };


    const playerTotal = check_aces(playerHand);
    console.log("Player Total:", playerTotal);

    if (playerTotal > 21) {
        return "BUST";
    }


  const basic_chart = {
    
        21: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand',
        },

        20: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand',
        },

        19: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand',
        },

        18: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand',
        },
    
        17: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand',
        },

        16: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        15: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        14: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },
        
        13: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        12: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        11: {
            '2': 'Double Down / Hit',
            '3': 'Double Down / Hit',
            '4': 'Double Down / Hit',
            '5': 'Double Down / Hit',
            '6': 'Double Down / Hit',
            '7': 'Double Down / Hit',
            '8': 'Double Down / Hit',
            '9': 'Double Down / Hit',
            '10': 'Double Down / Hit',
            'A': 'Hit',
            'J': 'Double Down / Hit',
            'Q': 'Double Down / Hit',
            'K': 'Double Down / Hit',
        },

        10: {
            '2': 'Double Down / Hit',
            '3': 'Double Down / Hit',
            '4': 'Double Down / Hit',
            '5': 'Double Down / Hit',
            '6': 'Double Down / Hit',
            '7': 'Double Down / Hit',
            '8': 'Double Down / Hit',
            '9': 'Double Down / Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        9: {
            '2': 'Hit',
            '3': 'Double Down / Hit',
            '4': 'Double Down / Hit',
            '5': 'Double Down / Hit',
            '6': 'Double Down / Hit',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        8: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Hit',
            '5': 'Hit',
            '6': 'Hit',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        7: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Hit',
            '5': 'Hit',
            '6': 'Hit',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        6: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Hit',
            '5': 'Hit',
            '6': 'Hit',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },

        5: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Hit',
            '5': 'Hit',
            '6': 'Hit',
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit',
        },
    };

    const pair_chart = {

        20: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand', 
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand'
        },

        18: {
            '2': 'Split',
            '3': 'Split',
            '4': 'Split',
            '5': 'Split',
            '6': 'Split', 
            '7': 'Stand',
            '8': 'Split',
            '9': 'Split',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand'
        },

        16: {
            '2': 'Split',
            '3': 'Split',
            '4': 'Split',
            '5': 'Split',
            '6': 'Split', 
            '7': 'Split',
            '8': 'Split',
            '9': 'Split',
            '10': 'Split',
            'A': 'Split',
            'J': 'Split',
            'Q': 'Split',
            'K': 'Split'
        },

        14: {
            '2': 'Split',
            '3': 'Split',
            '4': 'Split',
            '5': 'Split',
            '6': 'Split', 
            '7': 'Split',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        12: {
            '2': 'Split',
            '3': 'Split',
            '4': 'Split',
            '5': 'Split',
            '6': 'Split', 
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },
        
        10: {
            '2': 'Double Down / Hit',
            '3': 'Double Down / Hit',
            '4': 'Double Down / Hit',
            '5': 'Double Down / Hit',
            '6': 'Double Down / Hit', 
            '7': 'Double Down / Hit',
            '8': 'Double Down / Hit',
            '9': 'Double Down / Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },
        
        8: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Hit',
            '5': 'Split',
            '6': 'Split', 
            '7': 'Split',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        6: {
            '2': 'Split',
            '3': 'Split',
            '4': 'Split',
            '5': 'Split',
            '6': 'Split', 
            '7': 'Split',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        4: {
            '2': 'Split',
            '3': 'Split',
            '4': 'Split',
            '5': 'Split',
            '6': 'Split', 
            '7': 'Split',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        2: {
            '2': 'Split',
            '3': 'Split',
            '4': 'Split',
            '5': 'Split',
            '6': 'Split', 
            '7': 'Split',
            '8': 'Split',
            '9': 'Split',
            '10': 'Split',
            'A': 'Split',
            'J': 'Split',
            'Q': 'Split',
            'K': 'Split'
        },

    };
    
   const ace_chart = {
        
        21: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand', 
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand'
        },

        20: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand', 
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand'
        },

        19: {
            '2': 'Stand',
            '3': 'Stand',
            '4': 'Stand',
            '5': 'Stand',
            '6': 'Stand', 
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Stand',
            '10': 'Stand',
            'A': 'Stand',
            'J': 'Stand',
            'Q': 'Stand',
            'K': 'Stand'
        },

        18: {
            '2': 'Stand',
            '3': 'Double-Down / Hit',
            '4': 'Double-Down / Hit',
            '5': 'Double-Down / Hit',
            '6': 'Double-Down / Hit', 
            '7': 'Stand',
            '8': 'Stand',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        17: {
            '2': 'Hit',
            '3': 'Double-Down / Hit',
            '4': 'Double-Down / Hit',
            '5': 'Double-Down / Hit',
            '6': 'Double-Down / Hit', 
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        16: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Double Down / Hit',
            '5': 'Double Down / Hit',
            '6': 'Double Down / Hit', 
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        15: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Double Down / Hit',
            '5': 'Double Down / Hit',
            '6': 'Double Down / Hit', 
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        14: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Hit',
            '5': 'Double Down / Hit',
            '6': 'Double Down / Hit', 
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },

        13: {
            '2': 'Hit',
            '3': 'Hit',
            '4': 'Hit',
            '5': 'Double Down / Hit',
            '6': 'Double Down / Hit', 
            '7': 'Hit',
            '8': 'Hit',
            '9': 'Hit',
            '10': 'Hit',
            'A': 'Hit',
            'J': 'Hit',
            'Q': 'Hit',
            'K': 'Hit'
        },
    };


    if (deckCount >= 4) {
    if (is_pair) {
        if (is_pair_of_aces) {
            return pair_chart[12]?.[extractCardValue(dealerCard)];
        }
        return pair_chart[playerTotal]?.[extractCardValue(dealerCard)];
    }

    if (containsAce && playerHand.length === 2) {
        return ace_chart[playerTotal]?.[extractCardValue(dealerCard)];
    }

    return basic_chart[playerTotal]?.[extractCardValue(dealerCard)];
}




const two_basic_chart = {

};

const two_pair_chart = {

};

const two_ace_chart = {

};



if (deckCount == 2) {
    if (is_pair) {
        if (is_pair_of_aces) {
            return two_pair_chart[12]?.[extractCardValue(dealerCard)];
        }
        return two_pair_chart[playerTotal]?.[extractCardValue(dealerCard)];
    }

    if (containsAce && playerHand.length === 2) {
        return two_ace_chart[playerTotal]?.[extractCardValue(dealerCard)];
    }

    return two_basic_chart[playerTotal]?.[extractCardValue(dealerCard)];
}



const single_basic_chart = {

};

const single_pair_chart = {

};

const single_ace_chart = {

};


if (deckCount == 1) {
    if (is_pair) {
        if (is_pair_of_aces) {
            return single_pair_chart[12]?.[extractCardValue(dealerCard)];
        }
        return single_pair_chart[playerTotal]?.[extractCardValue(dealerCard)];
    }

    if (containsAce && playerHand.length === 2) {
        return single_ace_chart[playerTotal]?.[extractCardValue(dealerCard)];
    }

    return single_basic_chart[playerTotal]?.[extractCardValue(dealerCard)];
}


}
