import React from 'react';
import NumberSquare from '../NumberSquare';
import { useSelector, useDispatch } from 'react-redux';

function NumberBoard() {
    const state = useSelector(state => {
        return { board: state.board, gameLevel: state.gameLevel, gameScore: state.gameScore };
    });
    const dispatch = useDispatch();

    return (
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
    )
}

export default NumberBoard