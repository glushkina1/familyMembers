import {SAVE_MEMBER, DELETE_MEMBER, UPDATE_MEMBER} from './types';

const initialState = {
    members: [],
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_MEMBER":
                return {
                    members: [...state.members, {
                        name: action.payload.name,
                        relationship: action.payload.relationship,
                        sex: action.payload.sex,
                        image: action.payload.image,
                        phoneNumber: action.payload.phoneNumber,
                    }
                    ]
            }
        case "UPDATE_MEMBER":
            return {


            }
        case "DELETE_MEMBER":
                let updatedMemberList = state.members.filter(function(el) {
                    return el.phoneNumber !== action.payload;
                })
            return {
                    members: updatedMemberList,
            };

        default:
            return state;
    }
}

export default memberReducer;
