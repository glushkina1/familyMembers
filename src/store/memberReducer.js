import {SAVE_MEMBER, DELETE_MEMBER, UPDATE_MEMBER, UPDATE_MEMBER_LOCATION} from './types';

const initialState = {
    members: [
        {
            name: 'Pipa',
            relationship: 'pipa',
            sex: 'male',
            image: '',
            phoneNumber: '9999999999',
            latitude: 99.99,
            longitude: 99.99,
            distance:44,
        }
    ],
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
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    distance: action.payload.distance
                }
                ]
            }
        case "UPDATE_MEMBER":
            let updatedMemberList = state.members.map(function (member) {
                if (member.phoneNumber === action.payload.phoneNumber) {
                    return action.payload;
                } else {
                    return member;
                }
            })
            return {
                members: updatedMemberList,
            }



        case "UPDATE_MEMBER_LOCATION":
        let updatedMembersLocation = state.members.map(function (member) {
            if (member.phoneNumber === action.payload.phoneNumber ) {
                member.latitude = action.payload.latitude
                member.longitude = action.payload.longitude
            }
            return member
        });
        return {
            members: updatedMembersLocation? updatedMembersLocation : state,
        }

        case "DELETE_MEMBER":
            let remainedMemberList = state.members.filter(function (member) {
                return member.phoneNumber !== action.payload;
            })
            return {
                members: remainedMemberList,
            };
        case "RESET_EVERYTHING":
            return initialState;

        default:
            return state;
    }
}

export default memberReducer;
