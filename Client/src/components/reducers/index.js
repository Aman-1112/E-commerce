import { combineReducers } from "redux";

const fetchProductReducer = (state = [], action) => {
    //! must be pure function
    if (action.type === "FETCH_PRODUCTS") {
        return [...action.payload];
    } else if (action.type === "FETCH_SEARCHED_PRODUCTS") {
        //! please try find solution in less than O(N*N)
        let newState = [...state];
        for (let i = 0; i < action.payload.length; i++) {
            let j = 0;
            for (; j < newState.length; j++) {
                if (action.payload[i]._id === newState[j]._id) {
                    break;
                }
            }
            if (j === newState.length) {
                newState.push(action.payload[i]);
            }
        }
        return newState;
    } else if (action.type === "FETCH_PRODUCT") {
        let newState = [...state];
        for (let i = 0; i < newState.length; i++) {
            if (newState[i]._id === action.payload._id) {
                return newState;
            }
        }
        newState.push(action.payload);
        return newState;
    } else return state;
};

export const rootReducers = combineReducers({
    fetchProductReducer: fetchProductReducer,
});
