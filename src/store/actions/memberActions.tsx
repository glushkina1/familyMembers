import AsyncStorage from "@react-native-async-storage/async-storage";
import {SET_MEMBERS} from "../types";
import {RootState, store} from "../index";
import {STORAGE_KEYS} from "../../constans";


// Get Members
export const getMembers = (onSuccess = () => {
}, onError = () => {
}) => {
    return async dispatch => {
        try {
            const membersRes = await AsyncStorage.getItem(STORAGE_KEYS.members);
            const members = membersRes ? JSON.parse(membersRes) : [];

            dispatch({
                type: SET_MEMBERS,
                payload: members,
            });
            onSuccess();
        } catch (err) {
            console.log(err);
            onError();
        }
    };
};

// Create new member
export const createMember = (name, relationship, sex, image, onSuccess = () => {
}, onError = () => {
}) => {
    return async dispatch => {
        try {
            const newMember = {
                name: name,
                relationship: relationship,
                sex: sex,
                id: `member-${new Date().getTime()}`,
                image: image,
            };
            const {members} = store.getState().member;
            const membersCopy = [...members];
            membersCopy.push(newMember);


            await AsyncStorage.setItem(STORAGE_KEYS.members, JSON.stringify(membersCopy));
            dispatch({
                type: SET_MEMBERS,
                payload: membersCopy,
            });
            onSuccess();
        } catch (err) {
            console.log(err);
            onError();
        }
    }
};
// Update member
export const updateMember = (member, onSuccess = () => {
}, onError = () => {
}) => {
    return async dispatch => {
        try {
            const {members} = store.getState().member;


            const updatedMembers = [...members].map(mem => mem.id === member.id ? member : mem);
            await AsyncStorage.setItem(STORAGE_KEYS.members, JSON.stringify(updatedMembers));

            dispatch({
                type: SET_MEMBERS,
                payload: updatedMembers,
            });
            onSuccess();
        } catch (err) {
            console.log(err);
            onError();
        }
    };
}

// Delete member
export const deleteMember = (id, onSuccess = () => {
}, onError = () => {
}) => {
    return async dispatch => {
        try {
            const {members} = store.getState().member;
            const updatedMembers = [...members].filter(mem => mem.id !== id);
            await AsyncStorage.setItem(STORAGE_KEYS.members, JSON.stringify(updatedMembers));

            dispatch({
                type: SET_MEMBERS,
                payload: updatedMembers,
            });
            onSuccess();
        } catch (err) {
            console.log(err);
            onError();
        }
    };
};

// export const state: RootState;
