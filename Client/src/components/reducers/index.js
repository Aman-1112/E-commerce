import { combineReducers } from "redux";

const fetchProductReducer = (state = [], action) => {
    //! must be pure function
    if (action.type === "FETCH_PRODUCTS") {
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
    }
    else if (action.type === "FETCH_SEARCHED_PRODUCTS") {
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
    }
    else if (action.type === "FETCH_PRODUCT") {
        let newState = [...state];
        for (let i = 0; i < newState.length; i++) {
            if (newState[i]._id === action.payload._id) {
                return newState;
            }
        }
        newState.push(action.payload);
        return newState;
    }
    else return state;
};


const userDetailReducer = (state = { isSignedIn: false, profile: {}, cartItems: [] }, action) => {
    if (action.type === 'VERIFY_TOKEN') {
        if (action.payload) {
            return ({ isSignedIn: true, profile: { id: action.payload.data._id, name: action.payload.data.name, email: action.payload.data.email }, cartItems: action.payload.data.myCart })
        } else {
            return ({ isSignedIn: false, profile: {}, cartItems: [] });
        }
    } else if (action.type === 'UPDATE_CART') {
        let exist = false;
        for (let i = 0; i < state.cartItems.length; i++) {
            if (state.cartItems[i].product._id === action.payload.product._id) {
                exist = true;
                state.cartItems[i].quantity = parseInt(state.cartItems[i].quantity) + parseInt(action.payload.quantity)
            }
        }
        if (!exist) {
            state.cartItems.push({ product: action.payload.product, quantity: action.payload.quantity })
        }
        return ({ ...state })
    } else if (action.type === 'DELETE_ITEM') {
        state.cartItems = state.cartItems.filter(item => item.product._id !== action.payload.productId)
        return ({ ...state })
    }
    else
        return state;//MUST NEEDED FOR INTIAL RENDER AND MUST NOT BE UNDEFINED
}

export const rootReducers = combineReducers({
    fetchProductReducer: fetchProductReducer,
    userDetailReducer: userDetailReducer
});
