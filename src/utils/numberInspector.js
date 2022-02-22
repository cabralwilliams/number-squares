function checkConnectedness(address1,address2) {
    if(address1[1] === address2[1] || Math.abs(address1[1] - address2[1]) > 1) {
        return false;
    } else if(Math.abs(address1[0] - address2[0]) > 1) {
        return false;
    }
    return true;
}

const connections2 = [
    {
        column1: 0,
        rows: {
            0: [0,1],
            1: [0,1,2],
            2: [1,2,3],
            3: [2,3]
        }
    },
    {
        column1: 1,
        rows: {
            0: [0,1],
            1: [0,1,2],
            2: [1,2,3],
            3: [2,3]
        }
    },
    {
        column1: 2,
        rows: {
            0: [0,1],
            1: [0,1,2],
            2: [1,2,3],
            3: [2,3]
        }
    }
];

const connections3 = [
    {
        column1: 0,
        rows: {
            0: [[0,0],[0,1],[1,0],[1,1],[1,2]],
            1: [[0,0],[0,1],[1,0],[1,1],[1,2],[2,1],[2,2],[2,3]],
            2: [[1,0],[1,1],[1,2],[2,1],[2,2],[2,3],[3,2],[3,3]],
            3: [[2,1],[2,2],[2,3],[3,2],[3,3]]
        }
    },
    {
        column1: 1,
        rows: {
            0: [[0,0],[0,1],[1,0],[1,1],[1,2]],
            1: [[0,0],[0,1],[1,0],[1,1],[1,2],[2,1],[2,2],[2,3]],
            2: [[1,0],[1,1],[1,2],[2,1],[2,2],[2,3],[3,2],[3,3]],
            3: [[2,1],[2,2],[2,3],[3,2],[3,3]]
        }
    }
];

const connections4 = [
    {
        row1: 0,
        rows: {
            0: [[0,0],[0,1],[1,0],[1,1],[1,2]],
            1: [[0,0],[0,1],[1,0],[1,1],[1,2],[2,1],[2,2],[2,3]]
        }
    },
    {
        row1: 1,
        rows: {
            0: [[0,0],[0,1],[1,0],[1,1],[1,2]],
            1: [[0,0],[0,1],[1,0],[1,1],[1,2],[2,1],[2,2],[2,3]],
            2: [[1,0],[1,1],[1,2],[2,1],[2,2],[2,3],[3,2],[3,3]]
        }
    },
    {
        row1: 2,
        rows: {
            1: [[0,0],[0,1],[1,0],[1,1],[1,2],[2,1],[2,2],[2,3]],
            2: [[1,0],[1,1],[1,2],[2,1],[2,2],[2,3],[3,2],[3,3]],
            3: [[2,1],[2,2],[2,3],[3,2],[3,3]]
        }
    },
    {
        row1: 3,
        rows: {
            2: [[1,0],[1,1],[1,2],[2,1],[2,2],[2,3],[3,2],[3,3]],
            3: [[2,1],[2,2],[2,3],[3,2],[3,3]]
        }
    }
];

const inspector = {
    //Checks to see whether the selected numbers are actually joined together
    areJoined: (boardState) => {
        let isValid = true;
        let message = "";

        // Determines the row index of a specific column that has been pressed or null
        const col0 = { index: null };
        const col1 = { index: null };
        const col2 = { index: null };
        const col3 = { index: null };

        //board is of type [[{ squareValue: number, isClicked: boolean }]]

        for(let i = 0; i < 4; i++) {
            if(boardState[i][0].isClicked) {
                col0.index = i;
            }
            if(boardState[i][1].isClicked) {
                col1.index = i;
            }
            if(boardState[i][2].isClicked) {
                col2.index = i;
            }
            if(boardState[i][3].isClicked) {
                col3.index = i;
            }
        }
        
        //Check for column connectedness
        const indices = [col0.index,col1.index,col2.index,col3.index];
        if(indices[0] !== null) {
            //If the first column has a number selected, the second column does not, and at least one of the third or fourth columns is seleted
            if(indices[1] === null && (indices[2] !== null || indices[3] !== null)) {
                isValid = false;
                message = "Numbers must be in adjacent columns.";
            } else if(indices[2] === null && indices[3] !== null) {
                //This case should only be triggered if the first and second columns are both selected, the third is not, and the fourth is
                isValid = false;
                message = "Numbers must be in adjacent columns.";
            }
        }
        //Check the remaining instances only if isValid is still true
        if(indices[1] !== null && isValid) {
            if(indices[2] === null && indices[3] !== null) {
                isValid = false;
                message = "Numbers must be in adjacent columns.";
            }
        }
        //Check for row connectedness only if isValid is true
        if(isValid) {
            const clickedCells = indices.filter(indexVal => indexVal !== null);
            if(clickedCells.length === 0) {
                isValid = false;
                message = "At least one square must be clicked.";
            } else if(clickedCells.length > 1) {
                for(let i = 1; i < clickedCells.length; i++) {
                    if(Math.abs(clickedCells[i - 1] - clickedCells[i]) > 1) {
                        isValid = false;
                        message = "Numbers must be in adjacent rows.";
                    }
                }
            }
        }
        if(isValid) {
            message = "Numbers are connected.";
        }
        return { isValid, message }
    },
    //Expects the factor to be divided by (2,3,4,5,6,8,9) as well as the array of numbers corresponding to the values of the buttons pressed
    isMultiple: (factor, testNumbers) => {
        //Baseline has it false that it is a multiple
        let isMultiple = false;
        //Sum up the numbers from the beginning
        let testNumberSum = 0;
        for(let i = 0; i < testNumbers.length; i++) {
            testNumberSum += testNumbers[i];
        }
        //Joined number value
        let intValue = parseInt(testNumbers.join(''));
        function isEven(inputNumber) {
            if(inputNumber === 0 || inputNumber === 2 || inputNumber === 4 || inputNumber === 6 || inputNumber === 8) {
                return true;
            }
            return false;
        }
        switch(factor) {
            case 2:
                isMultiple = isEven(testNumbers[testNumbers.length - 1]);
                break;
            case 3:
                if(testNumberSum%3 === 0) {
                    isMultiple = true;
                }
                break;
            case 4:
                if(testNumbers[testNumbers.length - 1]%2 === 0) {
                    if(testNumbers.length === 1) {
                        isMultiple = testNumbers[0]%4 === 0;
                    } else {
                        isMultiple = (testNumbers[testNumbers.length - 2]*10 + testNumbers[testNumbers.length - 1])%4 === 0;
                    }
                }
                break;
            case 5:
                if(testNumbers[testNumbers.length - 1] === 5 || testNumbers[testNumbers.length - 1] === 0) {
                    isMultiple = true;
                }
                break;
            case 6:
                if(isEven(testNumbers[testNumbers.length - 1])) {
                    if(testNumberSum%3 === 0) {
                        isMultiple = true;
                    }
                }
                break;
            case 8:
                if(isEven(testNumbers[testNumbers.length - 1])) {
                    if(testNumbers.length < 3) {
                        isMultiple = intValue%8 === 0;
                    }
                }
                break;
            case 9:
                isMultiple = testNumberSum%9 === 0;
                break;
            default:
                if(testNumberSum%factor === 0) {
                    isMultiple = true;
                }
                break;
        }
        return isMultiple;
    },
    mapAllNumbers: (board) => {
        let mults = [2,3,4,5,6,8,9];
        const usedSingle = {};
        const usedDouble = {};
        const usedTriple = {};
        const usedQuad = {};
        const multOb = {
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            8: [],
            9: []
        };
        // Check individual squares
        for(let i = 0; i < 4; i++) {
            for(let j = 0; j < 4; j++) {
                if(!usedSingle.hasOwnProperty(`${board[i][j].squareValue}`)) {
                    usedSingle[`${board[i][j].squareValue}`] = 1;
                } else {
                    usedSingle[`${board[i][j].squareValue}`]++;
                }
            }
        }
        // Check for double squares
        for(let i = 0; i < connections2.length; i++) {
            let column1 = connections2[i].column1;
            const rows1 = Object.keys(connections2[i].rows);
            for(let j = 0; j < rows1.length; j++) {
                let basenumber = board[parseInt(rows1[j])][column1].squareValue*10;
                for(let k = 0; k < connections2[i].rows[rows1[j]].length; k++) {
                    let nextVal = basenumber + board[parseInt(connections2[i].rows[rows1[j]][k])][column1 + 1].squareValue;
                    // Only create property if it doesn't exist - otherwise, just increment up
                    if(!usedDouble.hasOwnProperty(`${nextVal}`)) {
                        usedDouble[`${nextVal}`] = 1;
                    } else {
                        usedDouble[`${nextVal}`]++;
                    }
                }
            }
        }
        // Check for triple squares
        for(let i = 0; i < connections3.length; i++) {
            //First Column
            let column1 = connections3[i].column1;
            //List of all row numbers
            const rows1 = Object.keys(connections3[i].rows);
            for(let j = 0; j < rows1.length; j++) {
                //First number multiplied by 100
                let basenumber = board[parseInt(rows1[j])][column1].squareValue*100;
                for(let k = 0; k < connections3[i].rows[rows1[j]].length; k++) {
                    //Second and third rows branching from first row | first row is rows1[j]
                    let row2 = connections3[i].rows[rows1[j]][k][0];
                    let row3 = connections3[i].rows[rows1[j]][k][1];
                    let nextVal = basenumber + 10*board[row2][column1 + 1].squareValue + board[row3][column1 + 2].squareValue;
                    // Only create property if it doesn't exist - otherwise, just increment up
                    if(!usedTriple.hasOwnProperty(`${nextVal}`)) {
                        usedTriple[`${nextVal}`] = 1;
                    } else {
                        usedTriple[`${nextVal}`]++;
                    }
                }
            }
        }
        // Check for quadruple squares
        for(let i = 0; i < connections4.length; i++) {
            //First row
            let row1 = connections4[i].row1;
            const rows2 = Object.keys(connections4[i].rows);
            for(let j = 0; j < rows2.length; j++) {
                let basenumber = board[row1][0].squareValue*1000 + board[parseInt(rows2[j])][1].squareValue*100;
                
                //Cycle through the array of [third,fourth] values
                for(let k = 0; k < connections4[i].rows[rows2[j]].length; k++) {
                    let row3 = connections4[i].rows[rows2[j]][k][0];
                    let row4 = connections4[i].rows[rows2[j]][k][1];
                    let nextVal = basenumber + board[row3][2].squareValue*10 + board[row4][3].squareValue;
                    // Only create property if it doesn't exist - otherwise, just increment up
                    if(!usedQuad.hasOwnProperty(`${nextVal}`)) {
                        usedQuad[`${nextVal}`] = 1;
                    } else {
                        usedQuad[`${nextVal}`]++;
                    }
                }
            }
        }
        // console.log(usedQuad);

        const oneDigit = Object.keys(usedSingle).map(digit => parseInt(digit));
        const twoDigit = Object.keys(usedDouble).map(digit => parseInt(digit));
        const threeDigit = Object.keys(usedTriple).map(digit => parseInt(digit));
        const fourDigit = Object.keys(usedQuad).map(digit => parseInt(digit));
        //Cycle through multiples array and determine which 1-digit, 2-digit, 3-digit, 4-digit are multiples of which numbers
        for(let i = 0; i < mults.length; i++) {
            for(let j = 0; j < oneDigit.length; j++) {
                if(oneDigit[j]%mults[i] === 0) {
                    multOb[`${mults[i]}`].push(oneDigit[j]);
                }
            }
            for(let j = 0; j < twoDigit.length; j++) {
                if(twoDigit[j]%mults[i] === 0) {
                    multOb[`${mults[i]}`].push(twoDigit[j]);
                }
            }
            for(let j = 0; j < threeDigit.length; j++) {
                if(threeDigit[j]%mults[i] === 0) {
                    multOb[`${mults[i]}`].push(threeDigit[j]);
                }
            }
            for(let j = 0; j < fourDigit.length; j++) {
                if(fourDigit[j]%mults[i] === 0) {
                    multOb[`${mults[i]}`].push(fourDigit[j]);
                }
            }
        }
        return multOb;
    }
}

export default inspector;