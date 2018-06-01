$(document).ready(function() {

/* Initial variables */
    let xPlayer = 'X';                  // Player X
    let oPlayer = 'O';                  // Player O
    let currentPlayer = '';             // Current active player.
    let xPlayerSquares = [];            // Array of player X's currently occupied squares.
    let oPlayerSquares = [];            // Array of player O's currently occupied squares.
    let computerSquares = [];           // Array of computer player's currently occupied squares.
    let humanSquares = [];              // Array of human player's currently occupied squares.
    let currentPlayerSquares = [];      // Array of active player's currently occupied squares.
    let xScore = 0;                     // Cumulative score for player x.
    let oScore = 0;                     // Cumulative score for player o.
    let playerOneScore = 0;             // Player / Human player's score.
    let playerTwoScore = 0;             // Player 2 / Computer player's score.
    const winningCombo = [[0, 1, 2],    // All winning combination of squares.
                          [3, 4, 5], 
                          [6, 7, 8], 
                          [0, 3, 6], 
                          [1, 4, 7], 
                          [2, 5, 8], 
                          [0, 4, 8], 
                          [2, 4, 6]];
    let inPlay = false;                 // Track if game is currently in play.
    let victoryCondition = false;       // Test if victory condition has been met.
    let currentIcon = "";               // Current active icon.
    let numHumanPlayers = 0;            // Number of human player selected.

    // Icons from web for the game.
    const iconOne = "https://cdn.iconscout.com/public/images/icon/free/png-512/ironman-marvel-super-hero-earth-saver-avenger-3ad45b4222080445-512x512.png";
    const iconTwo = "https://cdn.iconscout.com/public/images/icon/free/png-512/captain-america-marvel-superhero-earth-saver-avenger-3d11084006f3a960-512x512.png";
    const playerIcon = "http://clipartmag.com/images/avengers-clipart-32.png";
    const computerIcon = "https://cdn4.iconfinder.com/data/icons/famous-characters-add-on-vol-1-flat/48/Famous_Character_-_Add_On_1-27-512.png";

/* Icon select area */

    // Start two player game.
    $(".twoPlayer").click(function() {
        $(".choice").show("slide", {direction: "up"}, 500);
        $(".versus").hide("slide", {direction: "down"}, 500);
        $(".buttonX").html("<img src='" + iconOne + "' alt='PlayerOneIcon'>");
        $(".buttonO").html("<img src='" + iconTwo + "' alt='PlayerOneIcon'>");
        numHumanPlayers = 2;
    });

    // Start One player game.
    $(".onePlayer").click(function() {
        $(".versus").hide("slide", {direction: "down"}, 500);
        $(".gameTable").show("slide", {direction: "down"}, 1000);
        $(".scores").show();
        $(".playerOneIcon").html("<img src='" + playerIcon + "' alt='PlayerOneIcon'>");
        $(".playerTwoIcon").html("<img src='" + computerIcon + "' alt='PlayerOneIcon'>");
        numHumanPlayers = 1;
        currentPlayer = xPlayer;
        humanSquares = xPlayerSquares
        computerSquares = oPlayerSquares;
        currentIcon = playerIcon;
        inPlay = true;
        $(".activePlayer").html('<img src ="' + playerIcon + '"> Turn');
        $(".status").hide();
        $(".playerXScore").html(xScore);
        $(".playerOScore").html(oScore);
    });

    // Hide player's choice, show game table, set current player and icon, activate in play and set up status.
    $(".buttonX").click(function() {
        $(".choice").hide("slide", {direction: "up"}, 500);
        $(".gameTable").show("slide", {direction: "down"}, 1000);
        currentPlayer = xPlayer;
        currentIcon = iconOne;
        inPlay = true;
        $(".activePlayer").html('<img src ="' + iconOne + '"> Turn');
        $(".status").html('Player 1: <img src ="' + iconOne + '"> Player 2: <img src ="' + iconTwo + '">');
        $(".playerXScore").html(xScore);
        $(".playerOScore").html(oScore);
        $(".scores").show();
        $(".playerOneIcon").html("<img src='" + iconOne + "' alt='PlayerOneIcon'>");
        $(".playerTwoIcon").html("<img src='" + iconTwo + "' alt='PlayerOneIcon'>");
    });
    $(".buttonO").click(function() {
        $(".choice").hide("slide", {direction: "up"}, 500);
        $(".gameTable").show("slide", {direction: "down"}, 1000);
        currentPlayer = oPlayer;
        currentIcon = iconTwo;
        inPlay = true;
        $(".activePlayer").html('<img src ="' + iconTwo + '"> Turn');
        $(".status").html('Player 1: <img src ="' + iconTwo + '"> Player 2: <img src ="' + iconOne + '">');
        $(".playerXScore").html(xScore);
        $(".playerOScore").html(oScore);
        $(".scores").show();
        $(".playerOneIcon").html("<img src='" + iconOne + "' alt='PlayerOneIcon'>");
        $(".playerTwoIcon").html("<img src='" + iconTwo + "' alt='PlayerOneIcon'>");
    });

/* Game play area */

    let cell = -1;                                      // Hold the value of the current cell's value attribute.
    let playableSquares = Array.from(Array(9).keys());  // Generic array from 0-8 for active/available squares tracking which corresponse with each cell's value in the table.
    
    $("td").click(function() {

        // Grab the value attribute of the cell that was clicked.
        cellValue = parseInt($(this).attr("value"));    

        // Proceed with game only if the square that was clicked is still in play.
        if(inPlay && playableSquares.includes(cellValue)) {
            
            if(numHumanPlayers == 1 && inPlay) {

                checkMove(cellValue); 
                computerMove();   
                
            } else {
                checkMove(cellValue);
            }
        }
    });

    /*  -----  Human Player Only  -----
        Process player's move and then check state of game. */
    function checkMove(clickedSquareVal) {

        processMove(clickedSquareVal);

        if(victoryCondition) {
            inPlay = false;
            $(".winningPlayer").html('<img src ="' + currentIcon + '">');
            $(".winner").show();
            if(currentPlayer == xPlayer) {
                xScore++;
                playerOneScore++;
                $(".playerXScore").html(xScore);
            } else {
                oScore++;
                playerTwoScore
                $(".playerOScore").html(oScore);
            }
        } 
        
        // Tied game conditions and notification.
        else if (playableSquares.length === 0 && !victoryCondition) {
            $(".tiedGame").show();
        }

        /* Two Player Game - Switch active player and icon if no one has met the victory condition and there are still squares available for play. 
           One Player Game - Turn move over to computer after player has played a square. */
        else {
            if(numHumanPlayers == 2) {
                if(currentPlayer == xPlayer) {
                    currentIcon = iconTwo;
                    currentPlayer = oPlayer;
                    $(".activePlayer").html('<img src ="' + currentIcon + '"> Turn');
                } else {
                    currentIcon = iconOne;
                    currentPlayer = xPlayer;
                    $(".activePlayer").html('<img src ="' + currentIcon + '"> Turn');
                }
            }
            else {
                currentIcon = computerIcon;
                currentPlayer = oPlayer;
                $(".activePlayer").html('<img src ="' + currentIcon + '"> Turn');
            }
        }
    }

    let squareToWin = 0;        // The square of the winning move.
    let bestComputerMove = '';  // The square of computer's best move.
    let bestHumanMove = -1;     // The square of human player's best move. Used to determine computer's best move.



    /*  -----  Computer Player Only  -----
        Process computer's move and then check state of game. */
    function computerMove() {

        squareToWin = checkForWinningSquare(computerSquares);  // Check if computer has a winning square and play it if computer can win.
        
        if(squareToWin > -1) {

            processMove(squareToWin); // Play the winning move if it exists.

        } else {
            
            squareToWin = checkForWinningSquare(humanSquares);   // Check if human is about to win.

            if(squareToWin > -1) {

                processMove(squareToWin);   // Prevent player from winning.

            } else {
                
                bestHumanMove = BestMove(computerSquares, humanSquares); // Check human player's best move.

                if(bestHumanMove >= 0 && playableSquares.length < 8) {
                    bestComputerMove = bestHumanMove; // Play the human player's best move only after at least one square is played by computer.
                } else {
                    bestComputerMove = BestMove(humanSquares, computerSquares); // Only used on computer's very first move.
                }

                processMove(bestComputerMove);
            }
        }

        // Check if computer met victory condition or if game is tied. Else, turn move back to player.
        if(victoryCondition) {
            inPlay = false;
            $(".winningPlayer").html('<img src ="' + currentIcon + '">');
            $(".winner").show();
            oScore++;
            playerTwoScore++;
            $(".playerOScore").html(oScore);
        } 
        else if (playableSquares.length === 0 && !victoryCondition) {
            $(".tiedGame").show();
            inPlay = false;
        }
        else {
            currentIcon = playerIcon;
            currentPlayer = xPlayer;
            $(".activePlayer").html('<img src ="' + currentIcon + '"> Turn');
        }
    }

/* Validation and Processing Area */

    // Get random number between 0 - (max - 1);
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    // Add the current square to the active player's occupied array.
    function addSquares(currentPlayer, currentSquare) {
        if (currentPlayer == xPlayer) {
            xPlayerSquares.push(parseInt(currentSquare));
            return xPlayerSquares;
        } else {
            oPlayerSquares.push(parseInt(currentSquare));
            return oPlayerSquares;
        }
    }

    // Process current player's move based on cell that was passed.
    function processMove(squareToProcess) {

        // Remove the cell from the active cell array and making it inactive.
        playableSquares.splice(playableSquares.indexOf(squareToProcess), 1); 
        $('td[value=' + squareToProcess + ']').css('background-image', 'url(' + currentIcon + ')');

        // Call function to add current cell to active player's occupied cells array then check if player's array matches victory condition.
        currentPlayerSquares = addSquares(currentPlayer, squareToProcess.toString());
        victoryCondition = checkWin(currentPlayerSquares);
    }

    let comboCount;             // Track number times player's squares match each winning combination's numbers. Match all 3 number to win.
    let winningCount;           // True if player's currently occupied squares has all 3 numbers in a winning combination.
    let winningLine;            // Track which winning squares matches the winning combination and highlight these squares in a line.

    function checkWin(squaresArr) {

        comboCount = 0;  
        winningCount = false;  
        winningLine = [];
        // Map through each winning 3 number combination (combo) and check if player's occupied squares matches.
        winningCombo.map(function(combo) {
            combo.map(function(square) {

                // toString as the numbers in the array that was passed (squaresArr) are strings.
                if(squaresArr.includes(square) && comboCount < 3) {
                    comboCount++;
                    winningLine.push(square);
                }
            })
            // If player's squares (squaresArr) matches all numbers in current combination (combo), then set winning state.
            if(comboCount >= 3) {
                winningCount = true;
                winningLine.map(function(winSquare) {
                    $('td[value=' + winSquare +']').css("background-color", "red");
                });
            }

            // Reset counters if full match was not found.
            else {
                comboCount = 0;
                winningLine = [];
            }
        });

        return winningCount;
    }

    let winningNumber;

    function checkForWinningSquare(squaresArr) {

        winningLine = [];
        winningNumber = -1;
        
        /* Map through each winning 3 number combination (combo) and check if the current player's/computer's 
        occupied square (squaresArr) is lined up for a winning move (has 2/3 squares to win) */
        winningCombo.map(function(combo) {
            combo.map(function(square) {
                
                if(squaresArr.includes(square) && comboCount < 2) {
                    comboCount++;
                    winningLine.push(square);
                }
                
            })
            
            // If player's squares (squaresArr) matches all numbers in current combination (combo), then set winning state.
            if(comboCount == 2 && combo.every(square => (playableSquares.concat(squaresArr)).indexOf(square) > -1)) {
                winningNumber = combo.filter(function(num) {
                    return !winningLine.includes(num);
                })
                comboCount = 0;
                winningLine = [];
            }

            // Reset counters if full match was not found.
            else {
                comboCount = 0;
                winningLine = [];
            }
        });
        
        return parseInt(winningNumber);
    }

    let availableCombos; // Winning combos that are available after removing player's squares.
    let bestCombos;      // Best set of combinations based on current player's occupied squares.

    function BestMove(opponentSquares, playerSquares) {

        availableCombos = [];
        bestCombos = [];

        // Always play center if possible. As this square has the most combination for winning and will remove it from calcuation.
        if(playableSquares.includes(4)) {
            return 4;
        } else {
            // Find all available winning combos based on opponent's occupied squares.
            winningCombo.forEach(function(combos) {
                if(opponentSquares.every(num => combos.indexOf(num) == -1)) {
                    availableCombos.push(combos);
                }
            });

            // Find the best combo from available combo.
            availableCombos.forEach(function(combo) {
                playerSquares.forEach(function(square) {

                    // If player already occupied a square that is part of an available winning combo, then add that combo to best combo.
                    if(!bestCombos.includes(combo) && combo.includes(square)) {
                        bestCombos.push(combo);
                    }
                });
            });
            
            // If there are no more winning combos left, then play on any free square.
            if (bestCombos.length == 0 && availableCombos.length == 0) {
                return playableSquares[getRandomInt(playableSquares.length)];
            } 
            else if(bestCombos.length > 0) {
                
                // Flatten combos to 1D array.
                bestCombos = bestCombos.reduce(function(total, next) {
                    return total.concat(next);
                });
        
                // Remove all squares that are already occupied by player.
                bestCombos = bestCombos.filter(function(num) {
                    return playerSquares.indexOf(num) == -1;
                });

                return findBestMove(bestCombos, playerSquares);
            }

            // If player does not have any occupied squares (bestCombos was not populated), then find best moves from available winning combo.
            else {

                // Flatten 2D array.
                availableCombos = availableCombos.reduce(function(total, next) {
                    return total.concat(next);
                });

                return findBestMove(availableCombos, playerSquares);
            }
        }
    }

    let occurenceMap;                   // Key : Value map for counting number of occurence of each number.
    let maxNum;                         // Array of numbers that occured the most in set of combination.
    let maxOccurence;                   // The number of occurences of the number that occured the most.
    let index;                          // Index generated randomly that will determine which of the maxNum to return if there is more than one best move. This is to add randomness of computer opponent.
    const sides = ['1', '3', '5', '7']; // Value of side squares that will be removed for specific calucation below.

    function findBestMove(bestMoveSets, player) {
        
        occurenceMap = {};
        maxNum = [];
        maxOccurence = -1; 
        
        // Count each square and the number of occurence in the best move set. ie. {square1: #occurence, square3: #occurence, ...}
        bestMoveSets.forEach(function(square) {
            
            if(occurenceMap[square]) {
                occurenceMap[square]++;
            } else {
                occurenceMap[square] = 1;
            }
        });

        // Count all square or squares that occurs the most in best move set.
        for(let square in occurenceMap) {

            // Add first square to max occurence number (maxNum) and use it's occurence (maxOccurence) as reference for all key/value in collection (occurenceMap) comparison.
            if(occurenceMap[square] > maxOccurence && maxNum.length == 0) {
                maxNum.push(square);
                maxOccurence = occurenceMap[square];
            }

            /* If the occurence (occurenceMap[square]) of current (square) is higher than the stored occurence, then remove the previous number (maxNum = [])
               and add the current (square) as the max occurence number. Then track the new maxOccurence. */
            else if(occurenceMap[square] > maxOccurence) {
                maxNum = [];
                maxNum.push(square);
                maxOccurence = occurenceMap[square];
            }

            // If the square's max occurence is same as the max occurence, then add that number to max occurence number array.
            else if(occurenceMap[square] == maxOccurence) {
                maxNum.push(square);
            }
        }

        /* ----- For computer's calculation of human player's best move set -----
           If computer is trying to find human player's best move set in variable (bestHumanMove), then process human's best move differently. */

        // Only process when computer occupy the center, and human has two squares that will allow a winning move if played by human on next move.
        // Specific situation such as when human play occupy two opposite corners. This will force computer to play a move on a side square (1, 3, 5, 7) to prevent losing.
        if(player == humanSquares && maxNum.length > 1 && maxOccurence > 1 && computerSquares.includes(4)) {

            maxNum = [];
            maxOccurence = -1; 

            for(let square in occurenceMap) {

                // Add first square to max occurence number (maxNum) and use it's occurence (maxOccurence) as reference for all key/value in collection (occurenceMap) comparison.
                if(occurenceMap[square] > maxOccurence && maxNum.length == 0) {
                    maxNum.push(square);
                    maxOccurence = occurenceMap[square];
                }
    
                /* Same as above loop except, this will add all the squares with the LOWEST number of occurence to allow computer to play a side. */
                else if(occurenceMap[square] < maxOccurence) {
                    maxNum = [];
                    maxNum.push(square);
                    maxOccurence = occurenceMap[square];
                }
    
                // If the square's max occurence is same as the max occurence, then add that number to max occurence number array.
                else if(occurenceMap[square] == maxOccurence) {
                    maxNum.push(square);
                }
            }
        } 
        
        /* ----- Specific situation -----
           When player has center and a corner that is opposite of computer's square (human - 4, 6 and computer - 2).
           This will force computer to play a corner to prevent a possible winning move by player on their next move. */
        else if (player == humanSquares) {
            maxNum = maxNum.filter(function(remove){
                return !sides.includes(remove);
            });
        }

        index = getRandomInt(maxNum.length);
        return parseInt(maxNum[index]);
    }

    
/* Game reset */

    // Reset to starting condition.
    $(".reset").click(function() {
        xPlayerSquares = [];
        oPlayerSquares = [];
        currentPlayerSquares = [];
        comboCount = 0;
        winningCount = false;
        inPlay = false;
        $(".winner").hide();
        $(".tiedGame").hide();
        $("td").css("background-image", "");
        $("td").css("background-color", "rgb(248, 248, 124)");
        $(".activePlayer").html("");
        playableSquares = Array.from(Array(9).keys());

        if (numHumanPlayers == 2) {
            $(".choice").show("slide", {direction: "up"}, 1000);
            $(".gameTable").hide("slide", {direction: "down"}, 1000);
            $(".status").html("");
            currentIcon = "";
        }
        else {
            currentIcon = playerIcon;
            currentPlayer = xPlayer;
            inPlay = true;
            computerSquares = oPlayerSquares; 
            humanSquares = xPlayerSquares;
        }
    }); 
});