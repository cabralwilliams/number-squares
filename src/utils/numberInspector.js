
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
        let intValue = Number(testNumbers.join(''));
        function isEven(inputNumber) {
            if(inputNumber === 0 || inputNumber === 2 || inputNumber === 4 || inputNumber === 6 || inputNumber === 8) {
                return true;
            }
            return false;
        }
        switch(factor) {
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
                if(testNumbers[0]%factor === 0) {
                    isMultiple = true;
                }
                break;
        }
        return isMultiple;
    }
}

export default inspector;