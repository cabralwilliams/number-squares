import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { REGISTER_CLICK } from '../../utils/actions';

function NumberSquare({ squareValue, squareAddress }) {
    // squareAddress = [0,0] -> indicates the row and column of the square
    const state = useSelector(state => {
        return { board: state.board };
    })
    
    const dispatch = useDispatch();

    function toggleButton() {
        dispatch({
            type: REGISTER_CLICK,
            address: squareAddress
        });
        //console.log(state.board);
    }
    return (
       <button className={`game-button bgColor_${state.board[squareAddress[0]][squareAddress[1]].isClicked ? 'selected': state.board[squareAddress[0]][squareAddress[1]].squareColor}`} onClick={toggleButton}>{squareValue}</button>
    )
}

export default NumberSquare