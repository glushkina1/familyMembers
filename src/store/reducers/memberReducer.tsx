import {SET_MEMBERS} from "../types";

const initialState = {
    members: [],
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_MEMBERS':
            return {
                members: action.payload,
            }
        default:
            return state;
    }
}

export default memberReducer;
