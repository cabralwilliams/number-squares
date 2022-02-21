import { UPDATE_BOARD, RESET_BOARD, CHANGE_LEVEL, UPDATE_ADDRESSES, REGISTER_CLICK } from "./actions";
export const generateBoard = () => {
    let output = [[],[],[],[]];
    for(let i = 0 ; i < 4; i++) {
        for(let j = 0; j < 4; j++) {
            let nextColor = (i + j)%2 === 0 ? "even" : "odd";
            output[i].push({ squareValue: Math.floor(Math.random()*10), isClicked: false, squareColor: nextColor });
        }
    }
    return output;
}

export const reducer = (state, action) => {
    switch(action.type) {
        case UPDATE_BOARD:
            return { ...state, board: action.board };
        case RESET_BOARD:
            return { ...state, board: generateBoard() };
        case CHANGE_LEVEL:
            return { ...state, board: action.board, gameLevel: action.gameLevel };
        case UPDATE_ADDRESSES:
            //Create a copy of the board with all squares labeled isClicked = false after successful submission
            const copiedBoard = [];
            for(let i = 0; i < 4; i++) {
                let nextRow = [];
                for(let j = 0; j < 4; j++) {
                    nextRow.push({ squareValue: state.board[i][j].squareValue, isClicked: false, squareColor: state.board[i][j].squareColor });
                }
            }
            //Loop through the selectedAddresses to make the proper replacements to the squares
            for(let i = 0; i < action.selectedAddresses.length; i++) {
                let row = action.selectedAddresses[i][0];
                let column = action.selectedAddresses[i][1];
                switch(row) {
                    case 1: {
                        //Copy the value and color from the top row cell into the second row cell
                        copiedBoard[1][column].squareValue = copiedBoard[0][column].squareValue;
                        copiedBoard[1][column].squareColor = copiedBoard[0][column].squareColor;
                        //Create the new value and determine the square color
                        let nextColor = copiedBoard[1][column].squareColor === "even" ? "odd" : "even";
                        copiedBoard[0][column].squareValue = Math.floor(Math.random()*10);
                        copiedBoard[0][column].squareColor = nextColor;
                        break;
                    }
                    case 2: {
                        //Copy the value and color from the second row cell into the third row cell
                        copiedBoard[2][column].squareValue = copiedBoard[1][column].squareValue;
                        copiedBoard[2][column].squareColor = copiedBoard[1][column].squareColor;
                        //Copy the value and color from the top row cell into the second row cell
                        copiedBoard[1][column].squareValue = copiedBoard[0][column].squareValue;
                        copiedBoard[1][column].squareColor = copiedBoard[0][column].squareColor;
                        //Create the new value and determine the square color
                        let nextColor = copiedBoard[1][column].squareColor === "even" ? "odd" : "even";
                        copiedBoard[0][column].squareValue = Math.floor(Math.random()*10);
                        copiedBoard[0][column].squareColor = nextColor;
                        break;
                    }
                    case 3: {
                        //Copy the value and color from the third row cell into the bottom row cell
                        copiedBoard[3][column].squareValue = copiedBoard[2][column].squareValue;
                        copiedBoard[3][column].squareColor = copiedBoard[2][column].squareColor;
                        //Copy the value and color from the second row cell into the third row cell
                        copiedBoard[2][column].squareValue = copiedBoard[1][column].squareValue;
                        copiedBoard[2][column].squareColor = copiedBoard[1][column].squareColor;
                        //Copy the value and color from the top row cell into the second row cell
                        copiedBoard[1][column].squareValue = copiedBoard[0][column].squareValue;
                        copiedBoard[1][column].squareColor = copiedBoard[0][column].squareColor;
                        //Create the new value and determine the square color
                        let nextColor = copiedBoard[1][column].squareColor === "even" ? "odd" : "even";
                        copiedBoard[0][column].squareValue = Math.floor(Math.random()*10);
                        copiedBoard[0][column].squareColor = nextColor;
                        break;
                    }
                    default: {
                        //The next color will be the opposite color as the color in the square below
                        let nextColor = copiedBoard[1][column].squareColor === "even" ? "odd" : "even";
                        copiedBoard[0][column].squareValue = Math.floor(Math.random()*10);
                        copiedBoard[0][column].squareColor = nextColor;
                        break;
                    }
                }
            }
            return { ...state, board: copiedBoard };
        case REGISTER_CLICK:
            let newBoard = [...state.board];
            for(let i = 0; i < 4; i++) {
                if(i === action.address[0]) {
                    newBoard[i][action.address[1]].isClicked = !newBoard[i][action.address[1]].isClicked;
                } else {
                    newBoard[i][action.address[1]].isClicked = false;
                }
            }
            return { ...state, board: newBoard };
        default:
            return { ...state };
    }
}