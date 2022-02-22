import { createStore } from "redux";
import { generateBoard, reducer } from "./reducers";

// Holds the initial state of the application
const initialState = {
    board: generateBoard(),
    gameLevel: 1,
    gameScore: 0,
    gameMode: 'multiples'
}

const store = createStore(reducer, initialState);

export { store };
