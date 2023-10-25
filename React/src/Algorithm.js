export function get_best_action(playerHand, dealerCard) {
    const cardTotal = card => {
        if (['J', 'Q', 'K'].includes(card)) return 10;
        if (card === 'A') return 11; 
        return parseInt(card);
    };

    const is_pair = playerHand.length === 2 && playerHand[0] === playerHand[1];

    let playerTotal;
    // Check for two Aces
    if (playerHand[0] === 'A' && playerHand[1] === 'A') {
        playerTotal = 2;
    } else {
        // Calculate the player's total for other hands
        playerTotal = playerHand.reduce((sum, card) => sum + cardTotal(card), 0);

        // Adjust for Ace (if treating Ace as 11 causes total to exceed 21, treat it as 1)
        if (playerHand.includes('A') && playerTotal > 21) {
            playerTotal -= 10;
        }
    }

  const basic_chart = {
        
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
            '3': 'Double',
            '4': 'Double',
            '5': 'Double',
            '6': 'Double', 
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
            '3': 'Double',
            '4': 'Double',
            '5': 'Double',
            '6': 'Double', 
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

    if (is_pair) {
        return pair_chart[playerTotal]?.[dealerCard];
    } else if (playerHand.includes('A')) {
        return ace_chart[playerTotal]?.[dealerCard];
    } else {
        return basic_chart[playerTotal]?.[dealerCard];
    }
}