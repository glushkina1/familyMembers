import {SAVE_MEMBER, DELETE_MEMBER, UPDATE_MEMBER, UPDATE_MEMBER_LOCATION, RESET_EVERYTHING} from './types';

export const saveMember = (newMember) => {
    return {
        type:'SAVE_MEMBER',
        payload: newMember,
    }
}
export const updateMemberLocation = (phoneNumber, latitude, longitude) => {
    console.log(3333, latitude, longitude)
    return {
        type:'UPDATE_MEMBER_LOCATION',
        payload: {phoneNumber: phoneNumber, latitude: latitude, longitude: longitude},
    }
}

export const updateMember = (member) => {
    return {
        type: "UPDATE_MEMBER",
        payload: member,
    }
}

export const deleteMember = (phoneNumber) => {
    return {
        type: "DELETE_MEMBER",
        payload: phoneNumber,
    }
}

export const resetEverything = () => {
    return {
        type: "RESET_EVERYTHING",
    }
}


