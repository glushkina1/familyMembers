import {SAVE_MEMBER, DELETE_MEMBER, UPDATE_MEMBER, UPDATE_MEMBER_LOCATION, RESET_EVERYTHING} from './types';

export const saveMember = (newMember) => {
    return {
        type:'SAVE_MEMBER',
        payload: newMember,
    }
}
export const updateMemberLocation = (phoneNumber, latitude, longitude, timestamp) => {
    return {
        type:'UPDATE_MEMBER_LOCATION',
        payload: {phoneNumber: phoneNumber, latitude: latitude, longitude: longitude, timestamp:timestamp},
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

export const updateMainUser = (latitude, longitude, timestamp) => {
    return {
        type: "UPDATE_MAIN_USER",
        payload: {latitude: latitude, longitude: longitude, timestamp: timestamp}
    }
}


