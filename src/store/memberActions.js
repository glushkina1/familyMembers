import {SAVE_MEMBER, DELETE_MEMBER, UPDATE_MEMBER} from './types';

export const saveMember = (newMember) => {
    return {
        type:'SAVE_MEMBER',
        payload: newMember,
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


