import {SAVE_MEMBER, DELETE_MEMBER, UPDATE_MEMBER, UPDATE_MEMBER_LOCATION, UPDATE_MAIN_USER} from './types';


const initialState = {
    members: [
        {
            name: 'Lydia',
            relationship: 'twin sister',
            sex: 'non-binary',
            image: '',
            phoneNumber: '79955981630',
            latitude: 22,
            longitude: 22,
            timestamp: 1639763603,
        },
    ],
    myLocation: {
        latitude: null,
        longitude: null,
        timestamp: null,
    }
};

const memberReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_MEMBER":
            return {
                ...state,
                members: [...state.members, {
                    name: action.payload.name,
                    relationship: action.payload.relationship,
                    sex: action.payload.sex,
                    image: action.payload.image,
                    phoneNumber: action.payload.phoneNumber,
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    timestamp: action.payload.timestamp
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
                ...state,
                members: updatedMemberList,
            }

        case "UPDATE_MEMBER_LOCATION":
        let updatedMembersLocation = state.members.map(function (member) {
            if (member.phoneNumber === action.payload.phoneNumber ) {
                member.latitude = action.payload.latitude
                member.longitude = action.payload.longitude
                member.timestamp = action.payload.timestamp
            }
            return member
        });
        return {
            ...state,
            members: updatedMembersLocation? updatedMembersLocation : state,
        }

        case "DELETE_MEMBER":
            let remainedMemberList = state.members.filter(function (member) {
                return member.phoneNumber !== action.payload;
            })
            return {
                ...state,
                members: remainedMemberList,
            };
        case "RESET_EVERYTHING":
            return initialState;

        case "UPDATE_MAIN_USER":
            return {
                ...state,
                myLocation: {
                    latitude: action.payload.latitude,
                    longitude: action.payload.longitude,
                    timestamp: action.payload.timestamp,
                }
            }

        default:
            return state;
    }
}

export default memberReducer;
