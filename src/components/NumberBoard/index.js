import React, { useState, useEffect } from 'react';
import NumberSquare from '../NumberSquare';
import { useSelector, useDispatch } from 'react-redux';
import inspector from '../../utils/numberInspector';
import { UPDATE_ADDRESSES, UPDATE_SCORE } from '../../utils/actions';
//Holds the target arrays based on level
const targetArrays = [
    [2,3,5],
    [2,3,4,5],
    [2,3,4,5,6,9],
    [2,3,4,5,6,8,9]
]

function NumberBoard() {
    const state = useSelector(state => {
        return { board: state.board, gameLevel: state.gameLevel, gameScore: state.gameScore, gameMode: state.gameMode };
    });

    const [targetMultiple, setTargetMultiple] = useState(targetArrays[0][Math.floor(Math.random()*3)]);
    const [mappedNumbers, setMappedNumbers] = useState(inspector.mapAllNumbers(state.board));
    const [gameNotes, setGameNotes] = useState('');
    const [answerSubmitted, setAnswerSubmitted] = useState(false);
    // Reselect a number if current mappedNumbers arrays don't contain any numbers that are multiples of targeMultiple
    useEffect(() => {
        //This will only be relevant if player is asked to find multiples of a number
        async function updateTargetMultiple() {
            const targetArrNo = state.gameLevel >= 4 ? 3 : state.gameLevel - 1;
            return await  setTargetMultiple(targetArrays[targetArrNo][Math.floor(Math.random()*targetArrays[targetArrNo].length)]);
        }
        if(state.gameMode === 'multiples') {
            if(answerSubmitted) {
                setMappedNumbers(inspector.mapAllNumbers(state.board));
                console.log("Answer was submitted - beginning")
                let newTarget = 0;
                do {
                    const targetArrNo = state.gameLevel >= 4 ? 3 : state.gameLevel - 1;
                    newTarget = targetArrays[targetArrNo][Math.floor(Math.random()*targetArrays[targetArrNo].length)];
                    setTargetMultiple(newTarget);
                } while(mappedNumbers[`${newTarget}`].length === 0);
                setAnswerSubmitted(false);
                console.log("Answer was submitted - end");
            } else if(mappedNumbers[`${targetMultiple}`].length === 0) {
                //If there are no matching values for that particular factor
                console.log("No match - beginning");
                let newTarget = 0;
                do {
                    const targetArrNo = state.gameLevel >= 4 ? 3 : state.gameLevel - 1;
                    newTarget = targetArrays[targetArrNo][Math.floor(Math.random()*targetArrays[targetArrNo].length)];
                    setTargetMultiple(newTarget);
                    console.log(targetMultiple);
                } while(mappedNumbers[`${newTarget}`].length === 0);
                console.log("No match - end");
            }
        }
    }, [state.gameMode,mappedNumbers,state.gameLevel,targetMultiple,state.board,answerSubmitted]);

    useEffect(() => {
        if(gameNotes !== '') {
            setTimeout(() => {
                setGameNotes('');
            }, 2500);
        }
    }, [gameNotes]);

    const dispatch = useDispatch();
    
    function checkSubmission() {
        const joinedOb = inspector.areJoined(state.board);
        console.log(joinedOb);
        if(joinedOb.isValid) {
            const numberArray = [];
            const selectedAddresses = [];
            for(let i = 0; i < 4; i++) {
                for(let j = 0; j < 4; j++) {
                    if(state.board[j][i].isClicked) {
                        numberArray.push(state.board[j][i].squareValue);
                        selectedAddresses.push([j,i]);
                        break;
                    }
                }
            }
            const answerStatus = inspector.isMultiple(targetMultiple,numberArray);
            console.log(answerStatus);
            if(answerStatus) {
                dispatch({
                    type: UPDATE_SCORE,
                    score: numberArray.length*state.gameLevel
                });
                dispatch({
                    type: UPDATE_ADDRESSES,
                    selectedAddresses: selectedAddresses
                });
                setGameNotes(`Correct!`);
                setAnswerSubmitted(true);
            } else {
                dispatch({
                    type: UPDATE_SCORE,
                    score: -numberArray.length
                });
                const enteredVal = parseInt(numberArray.join(''));
                setGameNotes(`${enteredVal} is not a multiple of ${targetMultiple}!`);
            }
        }
    }

    return (
        <div>
            <div>
                <h2>Game Level: {state.gameLevel}</h2>
            </div>
            <div>
                <h2>Game Score: {state.gameScore}</h2>
            </div>
            <div>
                {state.gameMode === 'multiples' ? <h2>Find a multiple of {targetMultiple}!</h2> : <h2>Find a prime number!</h2>}
            </div>
            <div>
                <button onClick={checkSubmission} className="submit-button">Submit Number</button>
            </div>
            <div className='flex-column'>
                <div className='flex-row'>
                    {state.board[0].map((square, i) => <NumberSquare key={i} squareValue={square.squareValue} squareAddress={[0,i]} />)}
                </div>
                <div className='flex-row'>
                    {state.board[1].map((square, i) => <NumberSquare key={i} squareValue={square.squareValue} squareAddress={[1,i]} />)}
                </div>
                <div className='flex-row'>
                    {state.board[2].map((square, i) => <NumberSquare key={i} squareValue={square.squareValue} squareAddress={[2,i]} />)}
                </div>
                <div className='flex-row'>
                    {state.board[3].map((square, i) => <NumberSquare key={i} squareValue={square.squareValue} squareAddress={[3,i]} />)}
                </div>
            </div>
            <div>
                <h3>{gameNotes}</h3>
            </div>
        </div>
    )
}

export default NumberBoard