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
            let updatedMemberList = state.members.map(function(member) {
                if (member.phoneNumber === action.payload.phoneNumber) {
                    return action.payload;
                } else {
                    return member;
                }
            })
            return {
                members: updatedMemberList,
            }
        case "DELETE_MEMBER":
                let remainedMemberList = state.members.filter(function(member) {
                    return member.phoneNumber !== action.payload;
                })
            return {
                    members: remainedMemberList,
            };

        default:
            return state;
    }
}

export default memberReducer;
